import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/FireBaseConfig";
export async function POST(req) {
    try {
        const body = await req.text();
        console.log("Request body:", body); 
        let data;
        try {
            data = JSON.parse(body);
        } catch (error) {
            console.error("Invalid JSON format:", error.message);
            return NextResponse.json(
                { error: "Invalid JSON format: " + error.message },
                { status: 400 }
            );
        }
        const { userName, userEmail } = data;
        if (!userName || !userEmail) {
            return NextResponse.json(
                { error: "Invalid input: userName and userEmail are required" },
                { status: 400 }
            );
        }
        const docRef = doc(db, "users", userEmail);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return NextResponse.json(docSnap.data(), { status: 200 });
        } else {
            const userData = {
                name: userName,
                email: userEmail,
                credits: 5,
            };
            await setDoc(docRef, userData);
            return NextResponse.json(userData, { status: 201 });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Internal server error: " + error.message },
            { status: 500 }
        );
    }
}