const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
  export const AiLogoPrompt = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a text prompt to create a logo for logo title/brand name: india, with description: flag, with a color combination of Earthy Browns and include Black And White Line Logos design idea referring to this logo prompt: Create minimilist and elegent logos. Provide the result in a JSON format with a prompt field only."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"prompt\": \"Create a minimalist and elegant logo for the brand \\\"India\\\". The logo should incorporate elements of the Indian flag, using a color palette of earthy browns. Additionally, provide a black and white line logo design option, maintaining the minimalist and elegant aesthetic.\"\n}\n```\n"},
        ],
      },
    ],
  });