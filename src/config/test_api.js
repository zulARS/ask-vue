import { GoogleGenAI } from "@google/genai"

//const api_key = 'AIzaSyAfYzw7x93EfVbORr9mZmACRoPW-wk9p0I';

async function runAsk() {
  const ai = new GoogleGenAI({
    //apiKey: process.env.GEMINI_API_KEY
    apiKey: "IzaSyAfYzw7x93EfVbORr9mZmACRoPW-wk9p0I"
  })
  const config = {
    responseMimeType: "text/plain"
  }
  const model = "gemini-2.5-pro-preview-05-06"
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `INSERT_INPUT_HERE`
        }
      ]
    }
  ]

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents
  })
  for await (const chunk of response) {
    console.log(chunk.text)
  }
}

export default runAsk;
