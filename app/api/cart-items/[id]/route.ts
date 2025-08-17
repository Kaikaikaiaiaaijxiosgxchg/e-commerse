import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const item = await prisma.cartItem.findUnique({
      where: { id: params.id },
      include: { product: true, cart: true },
    });

    if (!item) return NextResponse.json({ error: "CartItem not found" }, { status: 404 });

    return NextResponse.json(item);
  } catch (error) {
     console.error("Failed:", error);
    return NextResponse.json({ error: "Failed to fetch cart item" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { quantity } = await req.json();

    if (typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json({ error: "Quantity harus lebih dari 0" }, { status: 400 });
    }

    const updated = await prisma.cartItem.update({
      where: { id: params.id },
      data: { quantity },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed:", error);
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.cartItem.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Cart item deleted" });
  } catch (error) {
     console.error("Failed:", error);
    return NextResponse.json({ error: "Failed to delete cart item" }, { status: 500 });
  }
}
