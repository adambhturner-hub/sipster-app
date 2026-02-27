const fs = require('fs');
let content = fs.readFileSync('src/data/cocktails.ts', 'utf8');

// The replacement script missed a comma after strength!
// It looks like:
// strength: 8
//         estimatedCost: 3,
// We want:
// strength: 8,
//         estimatedCost: 3,

content = content.replace(/strength:\s*(\d+)(\r?\n\s*)estimatedCost:/g, 'strength: $1,$2estimatedCost:');

fs.writeFileSync('src/data/cocktails.ts', content);
console.log('Fixed commas!');
