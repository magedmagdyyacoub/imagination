import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // مؤقتًا placeholder، استبدل لاحقًا بـ OpenAI أو أي AI Video API
    const videoUrl = "https://sample-videos.com/video123/mp4/480/asdasdas.mp4";

    return NextResponse.json({ videoUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate video" }, { status: 500 });
  }
}
