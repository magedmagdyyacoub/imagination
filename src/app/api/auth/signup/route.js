// src/app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req) {
   console.log("DATABASE_URL =", process.env.DATABASE_URL);
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // التحقق من وجود المستخدم مسبقًا
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "User exists" },
        { status: 400 }
      );
    }

    // تشفير الباسورد
    const hashed = await bcrypt.hash(password, 10);

    // إنشاء المستخدم
    const user = await prisma.user.create({
      data: { email, password: hashed }, // <-- removed 'name'
    });

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
