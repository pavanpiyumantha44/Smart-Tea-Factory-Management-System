import { GoogleGenAI,createUserContent,createPartFromUri } from "@google/genai";
import path from "path";

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

function extractJson(text) {
  const cleaned = text
    .replace(/^```json\s*/, '')
    .replace(/```$/, '')
    .trim();
  return JSON.parse(cleaned);
}

const getTextOutput = async(req,res)=>{
  const {lang} = req.body;

  try {
    const filePath = path.resolve(req.file.path);
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const image = await ai.files.upload({
      file: filePath,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        createUserContent([
          "Tell me about this image",
          createPartFromUri(image.uri, image.mimeType),
        ]),
      ],
      generationConfig: {
            responseMimeType: "application/json",
      },
      config: {
            systemInstruction: `
              Your response MUST be a valid JSON object.
              Answer should be in ${lang} language.
              The JSON object should have a three keys,"disease",sucess and "solutions", solutions should be an array of objects and sucess should be 'true'.
              In Disease, it should explain the identified disease of the image.
              Each object in the "solutions" array must have two keys: "title" (string) and "description" (string).
              Do not include any other text or formatting outside the JSON object. 
              If this image is not a leaf or plant or any unrelated image to the tea leafs or plants, 
              then send a respond in english language as a JSON object and it should have a three keys,"disease", success and "solutions", 
              disease should have message called 'Not a valid image, Reselect a proper image and try again!', sucess should be 'false' and solutions should be an empty array of objects.
            `,
      }});
    
    const parsed = extractJson(response.text);

    return res.status(200).json({success:true,data:parsed});
  } catch (error) {
    return res.status(500).json({success:false,message:"Falied to get a response"});
  }
}

export {getTextOutput}