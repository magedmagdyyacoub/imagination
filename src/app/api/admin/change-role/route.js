import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id, role } = await req.json();

  await prisma.user.update({
    where: { id },
    data: { role },
  });

  return NextResponse.json({ success: true });
}
