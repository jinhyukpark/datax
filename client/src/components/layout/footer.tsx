import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="text-sm text-muted-foreground">
              The premier marketplace for industrial data APIs and autonomous agents.
              Connecting enterprises with high-quality data resources.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-foreground">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/data-map" className="hover:text-primary">Data Map</Link></li>
              <li><Link href="/platforms" className="hover:text-primary">AI Agents</Link></li>
              <li><Link href="/submit" className="hover:text-primary">Submit Resource</Link></li>
              <li><Link href="#" className="hover:text-primary">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/admin" className="hover:text-primary font-medium text-indigo-600">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          © 2025 Data-X Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
