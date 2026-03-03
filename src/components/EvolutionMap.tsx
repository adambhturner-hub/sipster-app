'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Node,
    Edge,
    NodeChange,
    EdgeChange,
    Connection,
    ReactFlowProvider,
    useReactFlow,
    Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Cocktail } from '@/data/cocktails';
import CocktailNode from './CocktailNode';
import { getClassicCocktails } from '@/lib/dataFetchers';
import toast from 'react-hot-toast';

const nodeTypes = {
    cocktail: CocktailNode,
};

interface EvolutionMapInnerProps {
    initialCocktailId?: string;
}

function EvolutionMapInner({ initialCocktailId }: EvolutionMapInnerProps) {
    const { setCenter } = useReactFlow();
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );
    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: 'var(--primary)', strokeWidth: 2 } }, eds)),
        []
    );

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        if (node.data.isGenerating) return;
        setSelectedNode(node);
        setCenter(node.position.x + 112, node.position.y + 56, { zoom: 1, duration: 800 });
    }, [setCenter]);

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, []);

    // Load initial node
    useEffect(() => {
        async function loadInitialNode() {
            if (!initialCocktailId) return;
            const classics = await getClassicCocktails();
            const startCocktail = classics.find(c => c.name.toLowerCase().replace(/ /g, '-') === initialCocktailId);

            if (startCocktail) {
                const startNode: Node = {
                    id: 'node-1',
                    type: 'cocktail',
                    position: { x: window.innerWidth / 2 - 112, y: window.innerHeight / 2 - 100 },
                    data: { cocktail: startCocktail, depth: 0 },
                };
                setNodes([startNode]);
                setTimeout(() => {
                    setCenter(startNode.position.x + 112, startNode.position.y + 56, { zoom: 1, duration: 800 });
                }, 100);
            }
        }
        loadInitialNode();
    }, [initialCocktailId, setCenter]);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedNode || !prompt.trim() || isGenerating) return;

        const parentCocktail = selectedNode.data.cocktail as Cocktail;
        const parentDepth = (selectedNode.data.depth as number) || 0;
        const newNodeId = `node-${nodes.length + 1}`;

        // Calculate a position below the parent node (adding some random X spread)
        const newX = selectedNode.position.x + (Math.random() * 200 - 100);
        const newY = selectedNode.position.y + 250;

        // Add a "Generating" placeholder node
        const placeholderNode: Node = {
            id: newNodeId,
            type: 'cocktail',
            position: { x: newX, y: newY },
            data: { isGenerating: true },
        };

        const newEdge: Edge = {
            id: `edge-${selectedNode.id}-${newNodeId}`,
            source: selectedNode.id,
            target: newNodeId,
            animated: true,
            style: { stroke: 'var(--primary)', strokeWidth: 2, strokeDasharray: '5,5' },
        };

        setNodes(nds => [...nds, placeholderNode]);
        setEdges(eds => [...eds, newEdge]);
        setSelectedNode(null); // Close panel
        setIsGenerating(true);
        setPrompt("");

        // Pan to the new loading node
        setTimeout(() => {
            setCenter(newX + 112, newY + 56, { zoom: 1, duration: 800 });
        }, 100);

        try {
            // Call the AI evolve endpoint
            const res = await fetch('/api/evolve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    parentCocktail,
                    instruction: prompt.trim()
                })
            });

            if (!res.ok) throw new Error("Failed to evolve cocktail");

            const generatedCocktail = await res.json();

            // Replace placeholder with actual cocktail
            setNodes(nds => nds.map(n => {
                if (n.id === newNodeId) {
                    return {
                        ...n,
                        data: { cocktail: generatedCocktail, depth: parentDepth + 1, isGenerating: false }
                    };
                }
                return n;
            }));

            // Solidify the edge
            setEdges(eds => eds.map(e => {
                if (e.id === newEdge.id) {
                    return { ...e, style: { stroke: 'var(--primary)', strokeWidth: 2 } };
                }
                return e;
            }));

            toast.success("Evolution complete! 🧬");

        } catch (error) {
            console.error(error);
            toast.error("The mutation collapsed! Try another instruction.");
            // Remove placeholder and edge on failure
            setNodes(nds => nds.filter(n => n.id !== newNodeId));
            setEdges(eds => eds.filter(e => e.id !== newEdge.id));
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="w-full h-full relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                className="bg-[#0A0A0A]"
                defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                minZoom={0.2}
                maxZoom={2}
            >
                <Background color="#333" gap={32} size={2} />
                <Controls className="bg-gray-900 border-gray-800 fill-white" />
            </ReactFlow>

            {/* Prompt Panel */}
            {selectedNode && !isGenerating && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-50 animate-fade-in-up">
                    <div className="bg-gray-950/80 backdrop-blur-xl border border-[var(--primary)]/30 p-4 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                        <div className="flex items-center gap-3 mb-3 px-2">
                            <span className="text-2xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                {(selectedNode.data.cocktail as Cocktail)?.emoji}
                            </span>
                            <div>
                                <h3 className="text-white font-bold font-serif text-sm">
                                    Evolve {(selectedNode.data.cocktail as Cocktail)?.name}
                                </h3>
                                <p className="text-[10px] text-[var(--primary)] font-mono uppercase tracking-widest">
                                    Genetic Mutation
                                </p>
                            </div>
                        </div>

                        {/* Recipe Build Preview */}
                        <div className="mb-4 bg-black/40 rounded-xl p-3 md:p-4 border border-gray-800/50 max-h-[150px] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-[10px] text-[var(--primary)]/70 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1">
                                        <span>🧬</span> DNA (Ingredients)
                                    </h4>
                                    <ul className="text-xs text-gray-300 space-y-1 font-mono">
                                        {(selectedNode.data.cocktail as Cocktail)?.ingredients.map((ing, i) => (
                                            <li key={i} className="flex gap-2">
                                                <span className="text-gray-500 min-w-[35px]">{ing.amount}</span>
                                                <span className="text-white">{ing.item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-[10px] text-[var(--primary)]/70 uppercase tracking-widest font-bold mb-1.5">
                                        Methodology
                                    </h4>
                                    <div className="text-xs text-gray-400 space-y-1 font-sans leading-relaxed">
                                        {(selectedNode.data.cocktail as Cocktail)?.instructions.map((step, i) => (
                                            <p key={i}><span className="text-gray-600 font-mono">{i + 1}.</span> {step}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleGenerate} className="flex gap-2">
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g. 'Make it smoky with Mezcal', 'Turn it into a spicy highball'"
                                className="flex-1 bg-black/50 border border-gray-700/50 rounded-full px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all font-sans"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!prompt.trim() || isGenerating}
                                className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-6 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider h-auto"
                            >
                                Evolve 🧬
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function EvolutionMap({ initialCocktailId }: { initialCocktailId?: string }) {
    return (
        <ReactFlowProvider>
            <EvolutionMapInner initialCocktailId={initialCocktailId} />
        </ReactFlowProvider>
    );
}
