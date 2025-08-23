import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link
        href={`/products/${product.id}`}
        className="bg-white rounded-md shadow-sm overflow-hidden aspect-auto">
            <div className="relative aspect-square">

                <Image 
                    src={product.image || 'https://picsum.photos/200/300'}
                    alt={product.name}
                    priority={false}
                    className="object-cover"
                    fill
                />
            </div>

            <div className="p-4 space-y-1">
                <h3 className="line-clamp-1 uppercase" title={product.name}>
                    {product.name}
                </h3>
        
                <p className="text-gray-600 text-sm line-clamp-1">
                    {product.description}
                </p>
                
                <div className="flex items-center">
                    <span className="text-sm text-primary">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
        </div>
            
        </Link>
    )
}