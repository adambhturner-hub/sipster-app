const fs = require('fs');
let content = fs.readFileSync('src/data/cocktails.ts', 'utf8');

let startIndex = content.indexOf('export const CLASSIC_COCKTAILS: Cocktail[] = [');
let before = content.slice(0, startIndex);
let arrayContent = content.slice(startIndex);

let regex = /    \{\n        name: '([^']+)',([\s\S]*?)(?=\n    \},|\n        \}\n\];|\n    \}\n\];)/g;

let uniqueNames = new Set();
let newArrayContent = 'export const CLASSIC_COCKTAILS: Cocktail[] = [\n';

let match;
let lastIndex = 0;
while ((match = regex.exec(arrayContent)) !== null) {
    let name = match[1];
    if (!uniqueNames.has(name)) {
        uniqueNames.add(name);
        newArrayContent += match[0] + '\n    },';
    }
}

// Remove the last comma and add the closing bracket
newArrayContent = newArrayContent.slice(0, -1) + '\n];\n';

fs.writeFileSync('src/data/cocktails.ts', before + newArrayContent);
console.log('Deduplicated! Count:', uniqueNames.size);
