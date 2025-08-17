"use server";

import { ProductList, Hero, AllProducts } from "@organisms";
import { Logo } from "@atoms";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/products?limit=12", {
    cache: "no-store",
  });
  const { data: products } = await response.json();

  const latestResponse = await fetch("http://localhost:3000/api/products/latest", {
    cache: "no-store",
  });

  const { data: latestProducts } = await latestResponse.json();

  return (
    <main className="min-h-screen">
        <Hero />
        <div className="my-25 rounded-md shadow-[0px_0px_3px_2px_rgba(0,_0,_0,_0.1)] p-8">
          <div className="mb-10 space-y-1">
            <h2 className="text-center text-4xl font-bold">Produk Terbaru</h2>
            <Logo />
          </div>
          <ProductList products={latestProducts} />
        </div>
        <AllProducts products={products} />
    </main>
  );
}
