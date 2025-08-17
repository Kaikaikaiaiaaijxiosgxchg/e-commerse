import React from 'react'
import { Product } from '@prisma/client'
import { ProductCard} from '@molecules';
import { Button } from "@atoms";

interface AllProductsProps {
    products: Product[]
};

export const AllProducts = ({ products }: AllProductsProps) => {
  return (
     <div className="my-25">
          <h2 className="mb-10 text-xl font-bold relative inline-block text-primary">
            Produk Untukmu
          <div className="h-[2px] w-20 left-1/2 -translate-x-1/2 absolute bg-primary" />
          </h2>

          <div className="grid grid-cols-6 items-center justify-center gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center">
                <Button
                variant="ghost"
                size="lg"
                >Lihat Semua Produk</Button>
          </div>
        </div>
  )
}

