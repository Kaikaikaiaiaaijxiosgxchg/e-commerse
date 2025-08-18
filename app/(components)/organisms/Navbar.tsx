"use client"

import Link from "next/link";
import { Button, Logo } from "@atoms";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "About", href: "/about" },
    ];

    return (
        <nav className=" bg-white shadow-sm py-2 sticky top-0 z-[999]">
            <div className="container mx-auto flex items-center justify-between px-4">
                <Link href="/">
                    <Logo />
                </Link>

                <div className="flex items-center justify-center gap-10">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`font-medium transition-colors duration-300 ${
                            isActive ? "text-primary border-b-2 border-primary" : "text-black opacity-50 hover:text-primary"
                            }`}
                        >
                            {item.name}
                        </Link>
                        );
                    })}
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/cart">
                        <Button variant="ghost">
                            <ShoppingCart size={20}/>
                        </Button>
                    </Link>
                    <Link href="/products/new">
                    
                        <Button variant="primary" >Login</Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}