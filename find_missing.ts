import { CLASSIC_COCKTAILS } from './src/data/cocktails';

const allNames = new Set(CLASSIC_COCKTAILS.map(c => c.name));
const missing = new Set<string>();

CLASSIC_COCKTAILS.forEach(c => {
    if (c.relationship) {
        c.relationship.forEach(rel => {
            if (!allNames.has(rel)) {
                missing.add(rel);
            }
        });
    }
});

console.log("Coming Soon Drinks:", Array.from(missing).sort());
