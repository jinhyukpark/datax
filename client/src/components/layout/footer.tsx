import { Database, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Database className="h-5 w-5" />
              </div>
              <span className="font-heading text-xl font-bold text-foreground">
                Data-X
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The premier marketplace for industrial data APIs and autonomous agents.
              Connecting enterprises with high-quality data resources.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-foreground">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Data Map</a></li>
              <li><a href="#" className="hover:text-primary">AI Agents</a></li>
              <li><a href="#" className="hover:text-primary">Submit Resource</a></li>
              <li><a href="#" className="hover:text-primary">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Blog</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
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
