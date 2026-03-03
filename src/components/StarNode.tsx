import { Handle, Position } from '@xyflow/react';

export default function StarNode({ data, selected }: { data: any, selected?: boolean }) {
    const { cocktail, color } = data;

    return (
        <div className={`relative group cursor-pointer transition-transform duration-300 ${selected ? 'scale-150 z-50' : 'hover:scale-125 z-10'}`}>
            <div
                className="w-4 h-4 rounded-full relative"
                style={{
                    backgroundColor: color || '#ffffff',
                    boxShadow: `0 0 ${selected ? '30px' : '10px'} ${color || '#ffffff'}`,
                    opacity: selected ? 1 : 0.8
                }}
            >
                {/* Glow effect */}
                <div
                    className="absolute inset-0 rounded-full animate-pulse"
                    style={{
                        backgroundColor: color || '#ffffff',
                        boxShadow: `0 0 20px ${color || '#ffffff'}`,
                        opacity: 0.5,
                        filter: 'blur(4px)'
                    }}
                ></div>
            </div>

            {/* Tooltip on Hover or Select */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-black/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg pointer-events-none transition-opacity duration-300 ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <div className="flex items-center gap-2">
                    <span className="text-lg">{cocktail.emoji}</span>
                    <span className="text-xs font-bold text-white font-sans">{cocktail.name}</span>
                </div>
            </div>

            {/* Hidden handles if we ever want to draw lines, though not needed now */}
            <Handle type="target" position={Position.Top} className="opacity-0" />
            <Handle type="source" position={Position.Bottom} className="opacity-0" />
        </div>
    );
}
