import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, LogIn, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/ui/logo";
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
    { name: t("Data Map", "데이터 맵"), href: "/data-map" },
    { name: t("Platforms", "플랫폼"), href: "/platforms" },
    { name: t("Blog", "블로그"), href: "/blog" },
    { name: t("Advertise", "광고"), href: "/advertise" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950">
      {/* Top Navbar */}
      <nav className="w-full border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto flex h-18 items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Logo />
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => {
              // Check if the link is active, handling sub-routes
              const isActive = location === link.href || 
                               (location.startsWith(link.href) && link.href !== '/') ||
                               (link.href === '/platforms' && location.startsWith('/resource/'));
                               
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
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
            
            {/* Mock Logged In State - Link to My Page */}
            <Link href="/my-page">
              <Button variant="ghost" size="sm" className="gap-2 h-9 px-2 rounded-full border border-slate-200 dark:border-slate-800">
                <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                  KM
                </div>
                <span className="text-sm font-medium hidden sm:inline">Min-su</span>
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b bg-background md:hidden absolute top-16 left-0 w-full z-40">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
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
