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

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const idParam = searchParams.get("id");

        if (!idParam) {
            return NextResponse.json(
                { error: "Product ID is required" },
                { status: 400 },
            );
        }

        const id = Number(idParam);
        if (isNaN(id)) {
            return NextResponse.json(
                { error: "Not a Product ID" },
                { status: 400 },
            );
        }

        const deletedProduct = await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: "Product deleted successfully", data: deletedProduct },
            { status: 200 },
        );
    } catch (error) {
        console.error("DELETE product error:", error);
        return NextResponse.json(
            { error: "Failed to delete product" },
            { status: 400 },
        );
    }
}

export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const idParam = searchParams.get("id");

        if (!idParam) {
            return NextResponse.json(
                { error: "Products ID is required" },
                { status: 400 },
            );
        }
        
        const id = Number(idParam);
        if (isNaN(id)) {
            return NextResponse.json(
                { error: "Not a Products ID" },
                { status: 400 },
            );
        }

        const body = await request.json();
        const { name, description, image, price } = body;
        
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                ...(name &&{ name }),
                ...(description &&{ description }),
                ...(price &&{ price: parseFloat(price) }),
                ...(image &&{ image }),
            }
        });

        return NextResponse.json(
            { message: "Successfully update product", data: updatedProduct },
            { status: 200 },
        );
    } catch (error) {
        console.error("UPDATE product error:", error);
        return NextResponse.json(
            { error: "Failed to update product" },
            { status: 400 },
        );
    }
}

