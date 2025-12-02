import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("avatar");

    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    // تحويل الصورة إلى Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // تحديد مكان حفظ الصورة داخل public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // حفظ الصورة
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    // حفظ الـ Avatar في DB
    const avatar = await prisma.avatar.create({
      data: {
        url: imageUrl,
        userId: token.id,
      },
    });

    // تحديث User بالـ avatarId
    await prisma.user.update({
      where: { id: token.id },
      data: { avatarId: avatar.id },
    });

    return NextResponse.json({ success: true, url: imageUrl });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
