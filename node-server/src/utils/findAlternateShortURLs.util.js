import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

const findAlternateShortURLs = async (customUrl) => {
  let responseText = "";

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `A user would like to shorten a long URL and has provided ${customUrl} as their choice of short URL, but unfortunately, it is already taken. 
          Can you suggest six (6) catchy alternative short URLs that are ONLY (FOUR) 4 to (SEVEN) 7 characters long that are also similar in style to ${customUrl}? 
          Respond ONLY with the suggestions in a comma-separated list (e.g. url1, url2, url3, ...). No explanations. 
          Again, make sure each alternative URL's maximum length is less than or equal to SEVEN (7)!`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash-preview-04-17",
    config: {
      responseMimeType: "text/plain",
      systemInstruction: [
        {
          text: `You are a virtual assistant for a URL shortening service, and you only return what is requested of you using Suggestive AI to provide recommendations, solutions and guidance.`,
        },
      ],
    },
    contents,
  });

  for await (const chunk of response) {
    responseText += chunk.text;
  }

  return responseText.split(",");
};

export default findAlternateShortURLs;
