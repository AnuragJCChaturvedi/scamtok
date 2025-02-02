import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI,
  dangerouslyAllowBrowser: true
});

export default openai;
