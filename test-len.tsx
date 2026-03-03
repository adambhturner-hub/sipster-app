import { CLASSIC_COCKTAILS } from './src/data/cocktails';
console.log("TS Array Length:", CLASSIC_COCKTAILS.length);
const unique = new Set(CLASSIC_COCKTAILS.map(c => c.name));
console.log("Unique Names:", unique.size);
