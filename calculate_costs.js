const fs = require('fs');

async function main() {
  console.log('Loading cocktails...');
  let content = fs.readFileSync('src/data/cocktails.ts', 'utf8');

  // To prevent wiping out the file or breaking complex Zod objects, we will split the file by classic cocktails
  // We know each cocktail ends with `strength: <number>` and then `}` or `,`

  // So we can find every instance of:
  // name: 'Something',
  // ... everything until ...
  // strength: X

  const cocktailBlockRegex = /name:\s*'([^']+)',[\s\S]*?ingredients:\s*\[([\s\S]*?)\],[\s\S]*?strength:\s*(\d+)(\r?\n)/g;

  let match;
  const updates = [];

  // First collect all the data we need to fetch
  while ((match = cocktailBlockRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const name = match[1];
    const ingredientsBlock = match[2];
    const strengthStr = match[3];
    const trailingNewline = match[4];

    // Check if it already has estimatedCost right after this block (a bit hacky but fast)
    const restOfFile = content.slice(match.index + fullMatch.length);
    if (restOfFile.trimStart().startsWith('estimatedCost:')) {
      console.log(`Skipping ${name}, already has estimatedCost`);
      continue;
    }

    // Extract just the item names for the prompt
    const items = [];
    const itemRegex = /item:\s*'([^']+)'/g;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(ingredientsBlock)) !== null) {
      items.push(itemMatch[1]);
    }

    updates.push({
      name,
      items,
      fullMatch,
      trailingNewline
    });
  }

  console.log(`Found ${updates.length} cocktails to price.`);

  let finalContent = content;

  for (let i = 0; i < updates.length; i++) {
    const update = updates[i];
    console.log(`[${i + 1}/${updates.length}] Calculating cost for: ${update.name}...`);

    try {
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{
            role: 'system',
            content: `You are a bartender. Return ONLY a single digit 1, 2, 3, or 4. 1 = <$2 per drink, 2 = $2-4 per drink, 3 = $4-6 per drink, 4 = $6+ per drink. Calculate based on amortized cost of these ingredients: ${update.items.join(', ')}`
          }]
        })
      });

      const data = await resp.json();
      const score = data.choices[0].message.content.trim();
      const numScore = parseInt(score);

      let finalScore = 2; // Default to 2
      if (numScore >= 1 && numScore <= 4) {
        finalScore = numScore;
      }

      // Replace in the main string. We use string replace specifically targeting the EXACT matched block.
      // We append the new property BEFORE the next line
      const injectedBlock = update.fullMatch + `        estimatedCost: ${finalScore},${update.trailingNewline}`;
      finalContent = finalContent.replace(update.fullMatch, injectedBlock);

      // Sleep briefly to avoid rate limits
      await new Promise(r => setTimeout(r, 100));

    } catch (e) {
      console.error(`Error calculating cost for ${update.name}:`, e.message);
    }
  }

  console.log('Writing back to cocktails.ts...');
  fs.writeFileSync('src/data/cocktails.ts', finalContent);
  console.log('Done!');
}

main();
