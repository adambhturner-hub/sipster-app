import { convertToModelMessages } from 'ai';

const messagesObj = [
  { role: 'user', content: 'mojito' },
  {
    role: 'assistant',
    content: '',
    toolInvocations: [{ state: 'result', toolCallId: '123', toolName: 'suggestClassicCocktail', args: { cocktailName: 'mojito' }, result: { found: true } }]
  },
  { role: 'user', content: 'HOW ABOUT A NEGRONI?' }
];

const badNormalized = messagesObj.map(m => {
  if (!m.parts) return { ...m, parts: [{ type: 'text', text: m.content || '' }] };
  return m;
});

console.log("Original Output:", JSON.stringify(convertToModelMessages(messagesObj), null, 2));
console.log("badNormalized Output:", JSON.stringify(convertToModelMessages(badNormalized), null, 2));
