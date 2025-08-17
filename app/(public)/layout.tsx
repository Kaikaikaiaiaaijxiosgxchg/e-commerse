import { CartProvider } from "@/lib/context/Cart";
import { Navbar } from "@organisms";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <CartProvider>
          <Navbar />
          <div className="py-25 mx-30">
            {children}
          </div>
        </CartProvider>
    </>
  );
}
