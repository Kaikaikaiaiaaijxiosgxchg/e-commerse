import { ProductDetails, RelatedProducts } from "@organisms";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";


export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params; 
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
    });

    if (!product) {
        return notFound();
    }

    const relatedProducts = await prisma.product.findMany({
        where: {
            NOT: { id: Number(id) },
        },
        take: 4,
    });

    return (
        <main className="min-h-screen">
            <div className="container mx-auto py-8 px-4">
                <ProductDetails product={product} />

                <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-8">Produk Lainnya</h2>
                    <RelatedProducts products={relatedProducts} />
                </section>
            </div>
        </main>
    )
}