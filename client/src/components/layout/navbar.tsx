import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Database, Menu, X, Search, Globe, LogIn } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Data Map", href: "/data-map" },
    { name: "Platforms", href: "/platforms" }, // Assuming this is a filtered view or partners
    { name: "Blog", href: "/blog" },
    { name: "Advertise", href: "/advertise" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Database className="h-5 w-5" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-foreground">
              Data-X
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <Globe className="h-4 w-4" />
            English
          </Button>
          <Link href="/submit">
             <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
              + Submit
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b bg-background md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <a
                  className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Button className="w-full">+ Submit Resource</Button>
              <Button variant="outline" className="w-full">Login</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
