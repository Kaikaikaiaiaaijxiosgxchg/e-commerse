import { Product } from "@prisma/client";
import Image from "next/image";
import { AddToCartButton } from "@atoms";

interface ProductDetailsProps {
    product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="relative aspect-square w-full">
                    <Image 
                        src={product.image || "https://picsum.photos/id/1/200/300"}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>
            </div>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                </div>

                <p className="text-gray-600">{product.description}</p>
                
                <div className="pt-4">
                    <AddToCartButton productId={product.id} />
                </div>

                <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Detial Produk</h3>
                    <ul className="text-sm space-y-1">
                        <li>Stok: Tersedia</li>
                        <li>Kategori: Elektronik</li>
                        <li>Berat: 500gr</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}