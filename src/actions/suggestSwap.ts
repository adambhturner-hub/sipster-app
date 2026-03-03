'use server';

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function suggestSwap(ingredientToSwap: string, cocktailName: string, myBar: string[]) {
    try {
        const { text } = await generateText({
            model: openai('gpt-4o-mini'),
            system: `You are an expert mixologist API. The user is trying to make a "${cocktailName}" but is missing "${ingredientToSwap}".
Their current inventory is: ${myBar.length > 0 ? myBar.join(', ') : 'Empty (assume they have nothing)'}.

Your Task:
Suggest the single best substitute for "${ingredientToSwap}" from their inventory if possible, or the most common/accessible substitute if they don't have a good match.
Keep your response extremely concise, under 2 sentences (e.g. "Use Dark Rum instead. It provides the same molasses sweetness needed.").
Do NOT use markdown formatting like asterisks or bold text.`,
            prompt: `What should I use instead of ${ingredientToSwap}?`
        });

        return { success: true, suggestion: text };
    } catch (error: any) {
        console.error("Swap AI error:", error);
        return { success: false, error: "Failed to query AI." };
    }
}
