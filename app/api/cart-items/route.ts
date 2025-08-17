import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.cartItem.findMany({
      include: { product: true, cart: true },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch cart items", error);
    return NextResponse.json({ error: "Failed to fetch cart items" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { cartId, productId, quantity } = await req.json();

    if (!cartId || !productId) {
      return NextResponse.json({ error: "cartId dan productId wajib diisi" }, { status: 400 });
    }

    const existing = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId, productId } },
    });

    let newItem;
    if (existing) {
      newItem = await prisma.cartItem.update({
        where: { cartId_productId: { cartId, productId } },
        data: { quantity: existing.quantity + (quantity || 1) },
      });
    } else {
      newItem = await prisma.cartItem.create({
        data: {
          cartId,
          productId,
          quantity: quantity || 1,
        },
      });
    }

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create cart item" }, { status: 500 });
  }
}
