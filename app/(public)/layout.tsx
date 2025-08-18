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
          <div className="container py-10 px-10 mx-auto">
            {children}
          </div>
        </CartProvider>
    </>
  );
}
