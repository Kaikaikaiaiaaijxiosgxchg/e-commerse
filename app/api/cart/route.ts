import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET cart dengan items
export async function GET() {
  try {
    // sementara kita ambil cart pertama (atau nanti pakai userId kalau ada auth)
    let cart = await prisma.cart.findFirst({
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {},
        include: { items: { include: { product: true } } },
      });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get cart" }, { status: 500 });
  }
}

// POST buat cart baru
export async function POST() {
  try {
    const cart = await prisma.cart.create({
      data: {},
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json(cart, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });
  }
}
