const fs = require('fs');
let content = fs.readFileSync('src/data/cocktails.ts', 'utf8');

if (!content.includes('popularity?: number;')) {
    content = content.replace(
        'estimatedCost?: number; // 1-4 for $, $$, $$$, $$$$',
        'estimatedCost?: number; // 1-4 for $, $$, $$$, $$$$\n    popularity?: number;\n    totalMixes?: number;'
    );
}

// Famous top tier
const rankings = {
    'Margarita': { pop: 99, mix: 1543000 },
    'Old Fashioned': { pop: 98, mix: 1420000 },
    'Moscow Mule': { pop: 96, mix: 1100000 },
    'Martini': { pop: 95, mix: 1050000 },
    'Dry Martini': { pop: 95, mix: 1050000 },
    'Whiskey Sour': { pop: 94, mix: 980000 },
    'Espresso Martini': { pop: 97, mix: 1350000 },
    'Aperol Spritz': { pop: 96, mix: 1200000 },
    'Negroni': { pop: 92, mix: 850000 },
    'Mojito': { pop: 94, mix: 950000 },
    'Daiquiri': { pop: 90, mix: 750000 },
    'Manhattan': { pop: 89, mix: 710000 },
    'French 75': { pop: 88, mix: 680000 },
    'Mimosa': { pop: 95, mix: 1250000 },
};

let count = 0;
// We need to inject `popularity: X, totalMixes: Y,` right before the end of the object, which is usually after `estimatedCost: Z,`
content = content.replace(/name:\s*'([^']+)',([\s\S]*?)estimatedCost:\s*(\d+),?\n/g, (match, name, middle, cost) => {
    // If it already has it, skip (wait, the regex doesn't match if it already has it if we just look for estimatedCost)
    if (match.includes('popularity:')) return match; 
    
    let pop, mix;
    if (rankings[name]) {
        pop = rankings[name].pop;
        mix = rankings[name].mix;
    } else {
        // Deterministic hash based on name
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        hash = Math.abs(hash);
        pop = (hash % 40) + 40; // 40-79
        mix = (hash % 400000) + 10000; // 10k - 410k
    }
    
    return `${match}        popularity: ${pop},\n        totalMixes: ${mix},\n`;
});

fs.writeFileSync('src/data/cocktails.ts', content);
console.log('Metrics added');
