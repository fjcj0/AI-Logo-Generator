import { AiLogoPrompt } from "@/config/AiModel";
import axios from "axios";
import { NextResponse } from "next/server";
import { db } from "@/config/FireBaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
export async function POST(req) {
  try {
    const { prompt, email, title, desc, credit } = await req.json();
    const AiPromptResult = await AiLogoPrompt.sendMessage(prompt);
    const rawResponseText = AiPromptResult.response.text();
    const cleanResponseText = rawResponseText.replace(/```json|```/g, '').trim();
    let AiPrompt;
    try {
      AiPrompt = JSON.parse(cleanResponseText);
    } catch (jsonError) {
      throw new Error("Failed to parse AiPrompt response: " + jsonError.message);
    }
    if (!process.env.HUGGING_FACE_API_KEY) {
      throw new Error("HUGGING_FACE_API_KEY is missing in environment variables.");
    }
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA',
      AiPrompt.prompt,
      {
        headers: {
          Authorization: "Bearer " + process.env.HUGGING_FACE_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: 'arraybuffer',
      }
    );
    const buffer = Buffer.from(response.data, "binary");
    const base64image = buffer.toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${base64image}`;
    try {
      await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
        image: base64ImageWithMime,
        title: title,
        desc: desc,
      });
    } catch (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    const docRef = doc(db, 'users', email);
    await updateDoc(docRef, {
      credits: Number(credit) - 1
    });
    return NextResponse.json({ image: base64ImageWithMime });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}