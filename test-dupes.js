const fs = require('fs');
const content = fs.readFileSync('./src/data/cocktails.ts', 'utf8');

// Use a better regex to extract the name property
const regex = /name:\s*'([^']+)'|name:\s*"([^"]+)"|name:\s*`([^`]+)`/g;
const names = [];
let match;
while ((match = regex.exec(content)) !== null) {
    names.push(match[1] || match[2] || match[3]);
}

const seen = new Set();
const duplicates = [];
for (const name of names) {
    if (seen.has(name)) {
        duplicates.push(name);
    }
    seen.add(name);
}

console.log("Total names found:", names.length);
console.log("Exact duplicates array:", duplicates);
if(duplicates.length > 0) {
    console.log("FIRST DUPLICATE:", duplicates[0]);
}
