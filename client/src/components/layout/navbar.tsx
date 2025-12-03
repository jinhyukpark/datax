import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, LogIn, ArrowLeft } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: "Data Map", href: "/data-map" },
    { name: "Platforms", href: "/platforms" },
    { name: "Blog", href: "/blog" },
    { name: "Advertise", href: "/advertise" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950">
      {/* Top Navbar */}
      <nav className="w-full border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <span className="font-bold text-sm">EM</span>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                EM-Data
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground border border-slate-200 dark:border-slate-800 h-9">
                  <Globe className="h-4 w-4" />
                  {language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("English")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("한국어")}>
                  한국어
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/submit">
               <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 h-9 px-4">
                + Submit
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="gap-2 h-9">
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
      </nav>

      {/* Sub Navbar (Secondary Line) */}
      {(location.startsWith('/resource/') || (location.startsWith('/blog/') && location !== '/blog')) && (
        <div className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/50 backdrop-blur-sm dark:bg-slate-950/50">
          <div className="container mx-auto flex h-12 items-center px-4 gap-6 text-sm">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
            
            <Link href="/data-map">
              <a className={`font-medium transition-colors hover:text-primary ${location === '/data-map' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Data Map
              </a>
            </Link>
            <Link href="/platforms">
               <a className={`font-medium transition-colors hover:text-primary ${location === '/platforms' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Platforms
              </a>
            </Link>
            <Link href="/submit">
               <a className="font-medium text-muted-foreground transition-colors hover:text-primary">
                Submit
              </a>
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b bg-background md:hidden absolute top-16 left-0 w-full z-40">
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
              <Button variant="ghost" size="sm" className="justify-start gap-2" onClick={() => setLanguage(language === "English" ? "한국어" : "English")}>
                <Globe className="h-4 w-4" />
                {language}
              </Button>
              <Button className="w-full">+ Submit Resource</Button>
              <Button variant="outline" className="w-full">Login</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
