import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET( request: Request ) {
    try {
        const { searchParams } = new URL(request.url);
        const limitParam = searchParams.get("limit");
        const limit = limitParam ? Number(limitParam) : undefined;

        const products = await prisma.product.findMany({
            take: limit,
        });
        return NextResponse.json({ data: products });
    } catch (error) {
        console.error("GET /products error:", error);
        return NextResponse.json(
            { error: "Failed to fetch products", },
            { status: 500 },
        );
    }
}

export async function POST( request: Request ) {
    try {
        const body = await request.json();
        const { name, description, price, image } = body;
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                image,
            },
        });
        return NextResponse.json( { data: product }, { status: 201 } );
    } catch ( error ) {
        console.error("Failed to create:", error);
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 },
        )
    }
}

