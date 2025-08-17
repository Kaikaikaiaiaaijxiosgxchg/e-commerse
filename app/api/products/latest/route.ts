import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 6,
        });

        return NextResponse.json({ data: products });
    } catch (error) {
        console.error("Failed to fetch latest:", error);
        return NextResponse.json(
            { error: "Failed to fetch latest" },
            { status: 500 },
        );
    }
}