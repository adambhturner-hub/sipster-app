'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    Node,
    Edge,
    ReactFlowProvider,
    useReactFlow,
    Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import StarNode from './StarNode';
import CocktailCard from './CocktailCard';
import { Cocktail } from '@/data/cocktails';

const nodeTypes = {
    star: StarNode,
};

const FLAVOR_ANGLES: Record<string, number> = {
    'Sweet': 0,
    'Fruity': Math.PI / 4,
    'Sour': Math.PI / 4,
    'Tart': Math.PI / 4,
    'Citrus': Math.PI / 4,
    'Bitter': Math.PI / 2,
    'Botanical': 3 * Math.PI / 4,
    'Herbal': 3 * Math.PI / 4,
    'Smoky': Math.PI,
    'Spicy': 5 * Math.PI / 4,
    'Rich': 3 * Math.PI / 2,
    'Complex': 3 * Math.PI / 2,
    'Refreshing': 7 * Math.PI / 4,
    'Crisp': 7 * Math.PI / 4,
    'Dry': 7 * Math.PI / 4,
};

const SPIRIT_COLORS: Record<string, string> = {
    'Whiskey & Bourbon': '#fbbf24', // amber-400
    'Agave': '#34d399', // emerald-400
    'Gin': '#60a5fa', // blue-400
    'Vodka': '#e0f2fe', // sky-100
    'Rum': '#f87171', // red-400
    'Liqueur & Other': '#c084fc', // purple-400
};

export interface ConstellationMapProps {
    cocktails: Cocktail[];
}

function ConstellationMapInner({ cocktails }: ConstellationMapProps) {
    const { fitView } = useReactFlow();
    const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);

    const nodes: Node[] = useMemo(() => {
        const generatedNodes: Node[] = [];

        cocktails.forEach((cocktail, index) => {
            let x = 0;
            let y = 0;
            let validFlavors = 0;
            const radius = 800; // Spread factor

            if (cocktail.flavorProfile && cocktail.flavorProfile.length > 0) {
                cocktail.flavorProfile.forEach(flavor => {
                    const angle = FLAVOR_ANGLES[flavor];
                    if (angle !== undefined) {
                        x += Math.cos(angle) * radius;
                        y += Math.sin(angle) * (-radius);
                        validFlavors++;
                    }
                });

                if (validFlavors > 0) {
                    x /= validFlavors;
                    y /= validFlavors;
                }
            }

            // Jitter to prevent overlapping
            x += (Math.random() - 0.5) * 600;
            y += (Math.random() - 0.5) * 600;

            const color = SPIRIT_COLORS[cocktail.primarySpirit] || '#ffffff';

            generatedNodes.push({
                id: `star-${index}`,
                type: 'star',
                position: { x, y },
                data: { cocktail, color },
                style: { width: 16, height: 16 } // Ensure node is visible but small
            });
        });

        // Add Flavor Labels as background text nodes
        const labelsToDisplay = ['Sweet', 'Citrus', 'Bitter', 'Herbal', 'Smoky', 'Spicy', 'Rich', 'Refreshing'];
        labelsToDisplay.forEach((label, i) => {
            const angle = FLAVOR_ANGLES[label];
            if (angle !== undefined) {
                generatedNodes.push({
                    id: `label-${i}`,
                    type: 'default',
                    position: {
                        x: Math.cos(angle) * 1000 - 100, // Offset to center label roughly
                        y: Math.sin(angle) * (-1000) - 50
                    },
                    data: { label },
                    style: {
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'rgba(255,255,255,0.15)',
                        fontSize: '64px',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        textAlign: 'center',
                        pointerEvents: 'none',
                        width: 200,
                        boxShadow: 'none'
                    },
                    selectable: false,
                    draggable: false,
                });
            }
        });

        return generatedNodes;
    }, [cocktails]);

    // Fit view on load
    useEffect(() => {
        const timeout = setTimeout(() => {
            fitView({ duration: 1000, padding: 0.2 });
        }, 100);
        return () => clearTimeout(timeout);
    }, [fitView, nodes]);

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        if (node.type === 'star') {
            setSelectedCocktail(node.data.cocktail as Cocktail);
        }
    }, []);

    const onPaneClick = useCallback(() => {
        setSelectedCocktail(null);
    }, []);

    return (
        <div className="w-full h-[80vh] min-h-[600px] rounded-3xl overflow-hidden border border-white/10 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* Themed background for space vibe */}
            <div className="absolute inset-0 bg-[#020513] z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#020513]/80 to-[#020513]"></div>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={[]}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                minZoom={0.1}
                maxZoom={3}
                proOptions={{ hideAttribution: true }}
                className="z-10"
            >
                <Background color="rgba(255,255,255,0.05)" gap={100} size={1} />
                <Controls className="bg-gray-900/80 backdrop-blur-md border-gray-800 fill-white rounded-xl overflow-hidden" showInteractive={false} />

                {selectedCocktail && (
                    <Panel position="top-right" className="m-4 w-full max-w-md pointer-events-none z-50">
                        <div className="pointer-events-auto h-[70vh] overflow-y-auto no-scrollbar rounded-3xl shadow-2xl animate-fade-in-up">
                            {/* Makeable logic requires either bypassing it or wrapping in Context. 
                                For simplicity in this view, we'll pass generic props, or users can always click into it. */}
                            <CocktailCard
                                cocktail={selectedCocktail}
                                makeable={true}
                                missingCount={0}
                                hasIngredient={() => true}
                            />
                        </div>
                    </Panel>
                )}
            </ReactFlow>
        </div>
    );
}

export default function ConstellationMap(props: ConstellationMapProps) {
    return (
        <ReactFlowProvider>
            <ConstellationMapInner {...props} />
        </ReactFlowProvider>
    );
}
