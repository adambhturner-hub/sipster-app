'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBottle from './AnimatedBottle';

interface BottleData {
    id: string;
    baseIngredient: string;
    brandName?: string;
}

interface VirtualShelfProps {
    myBar: string[];
    bottleBrands: Record<string, string[]>;
    onBottleClick: (baseIngredient: string, brandName?: string) => void;
}

export default function VirtualShelf({ myBar, bottleBrands, onBottleClick }: VirtualShelfProps) {
    const [itemsPerRow, setItemsPerRow] = useState(4);

    useEffect(() => {
        const calculateItemsPerRow = () => {
            if (typeof window !== 'undefined') {
                if (window.innerWidth < 480) return 3;
                if (window.innerWidth < 768) return 4;
                if (window.innerWidth < 1024) return 6;
                return 8;
            }
            return 4;
        };

        setItemsPerRow(calculateItemsPerRow());
        const handleResize = () => setItemsPerRow(calculateItemsPerRow());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Flatten myBar and bottleBrands into an array of bottles
    const bottles = useMemo(() => {
        const result: BottleData[] = [];
        
        myBar.forEach(baseItem => {
            const brands = bottleBrands[baseItem] || [];
            if (brands.length === 0) {
                // Just the generic bottle
                result.push({ id: `${baseItem}-generic`, baseIngredient: baseItem });
            } else {
                // Add a bottle for each specific brand
                brands.forEach((brand, idx) => {
                    result.push({ id: `${baseItem}-${brand}-${idx}`, baseIngredient: baseItem, brandName: brand });
                });
            }
        });
        
        // Let's sort alphabetically by base ingredient so types group together
        result.sort((a, b) => a.baseIngredient.localeCompare(b.baseIngredient));
        
        return result;
    }, [myBar, bottleBrands]);

    // Chunk bottles into shelves
    const shelves = useMemo(() => {
        const result: BottleData[][] = [];
        for (let i = 0; i < bottles.length; i += itemsPerRow) {
            result.push(bottles.slice(i, i + itemsPerRow));
        }
        return result;
    }, [bottles, itemsPerRow]);

    if (bottles.length === 0) {
        return (
            <div className="w-full text-center py-16 text-gray-400 font-serif italic border border-dashed border-gray-800 rounded-3xl mt-8">
                Your virtual shelf is currently empty.<br/> Add ingredients below to start your collection.
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center mt-8 space-y-0.5">
            {shelves.map((shelf, rowIndex) => (
                <div key={rowIndex} className="w-full relative py-6">
                    {/* The Wooden Shelf */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#4a2e15] border-t border-[#654321] border-b-2 border-black drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] z-0 rounded-sm">
                        {/* Shelf Grain Details */}
                        <div className="absolute inset-0 opacity-20 flex" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)' }} />
                    </div>
                    {/* Depth Wall Shadow */}
                    <div className="absolute bottom-4 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent z-0 pointer-events-none" />
                    
                    {/* The Bottles */}
                    <div className="relative z-10 flex items-end justify-center gap-2 sm:gap-6 px-4 md:px-8 min-h-[170px]">
                        <AnimatePresence>
                            {shelf.map((bottle, idx) => (
                                <motion.div
                                    key={bottle.id}
                                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5, y: 30 }}
                                    transition={{ type: 'spring', delay: idx * 0.05 }}
                                >
                                    <AnimatedBottle
                                        baseIngredient={bottle.baseIngredient}
                                        brandName={bottle.brandName}
                                        onClick={() => onBottleClick(bottle.baseIngredient, bottle.brandName)}
                                        className="mb-1" // ensure it sits flat on the shelf
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            ))}
        </div>
    );
}
