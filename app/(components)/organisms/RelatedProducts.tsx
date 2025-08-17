import { Product } from "@prisma/client";
import { ProductCard } from "@molecules";

interface RelatedProductsProps {
    products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
    if (products.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}