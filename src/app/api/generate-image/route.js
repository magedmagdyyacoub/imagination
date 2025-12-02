import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt, count = 1 } = await req.json();

  try {
    const images = [];

    for (let i = 0; i < count; i++) {
    const response = await fetch(
  "https://router.huggingface.co/models/stabilityai/stable-diffusion-2",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  }
);


      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");

      images.push(`data:image/png;base64,${base64}`);
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
