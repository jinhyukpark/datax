import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { 
  Users, 
  Shield, 
  FileText, 
  CreditCard, 
  LogOut, 
  LayoutDashboard,
  Settings,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();

  const sidebarItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Admin Management", href: "/admin/admins", icon: Shield },
    { name: "Submissions", href: "/admin/submissions", icon: FileText },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
  ];

  const handleLogout = () => {
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white">
            <Logo />
            <span className="font-bold text-lg tracking-tight ml-2 bg-slate-800 px-2 py-0.5 rounded text-xs">ADMIN</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <a className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "hover:bg-slate-800 hover:text-white"
                )}>
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <Avatar className="h-8 w-8 border border-slate-600">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Super Admin</span>
              <span className="text-xs text-slate-500">master@data-x.com</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-6">
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
