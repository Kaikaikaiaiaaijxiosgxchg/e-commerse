import { ProductCard } from "@molecules";
import { Product } from "@prisma/client";

interface ProductListProps {
    products: Product[]
}

export const ProductList = ({ products }: ProductListProps) => {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <p className="opacity-50 italic text-xl">Tidak ada produk</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-6 items-center justify-center gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
