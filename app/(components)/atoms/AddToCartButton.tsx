"use client";

import { Button } from "@atoms";
import { useCart } from "@/lib/context/Cart";

interface AddToCartButtonProps {
  productId: number;
}

export const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
  const { addToCart } = useCart();

  const handleAdd = async () => {
    addToCart(productId)
  } 

  return (
    <Button
      variant="primary"
      className="w-full sm:w-auto"
      onClick={handleAdd}
    >
      Tambah ke Keranjang
    </Button>
  );
};
