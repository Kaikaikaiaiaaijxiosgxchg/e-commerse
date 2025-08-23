import { Suspense } from 'react';
import { Product } from '@prisma/client'
import { ProductCard, ProductCardSkeleton } from '@molecules';
import { Button } from "@atoms";


interface AllProductsProps {
    products: Product[]
};

export const AllProducts = ({ products }: AllProductsProps) => {
  return (
     <div className="my-25 relative container">
        <div className='sticky top-13 mb-10 bg-white w-full pt-4 pb-1 px-5 z-[998]'>
            <h3 className=' text-xl font-bold inline-block text-primary relative'>
                Produk Untukmu
            <div className="h-[2px] w-20 left-1/2 -translate-x-1/2 bottom-0 absolute bg-primary" /> 
            </h3>
        </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 items-center justify-center gap-4 px-5">
            {products.map(product => (
              <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
                <ProductCard product={product} />
              </Suspense>
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

