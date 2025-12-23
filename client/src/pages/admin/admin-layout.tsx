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
  Bell,
  MessageSquare,
  FileUp,
  UserPlus,
  Check,
  Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

// Mock Notifications Data
const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'comment', message: 'New comment on "Smart Factory Report"', time: '2 min ago', read: false },
  { id: 2, type: 'submission', message: 'New data submission: "Logistics API"', time: '1 hour ago', read: false },
  { id: 3, type: 'user', message: 'New user registration: Choi Yu-jin', time: '3 hours ago', read: true },
  { id: 4, type: 'submission', message: 'New data submission: "Energy Stats"', time: '5 hours ago', read: true },
  { id: 5, type: 'comment', message: 'New comment on "AI Model Usage"', time: '1 day ago', read: true },
];

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'comment': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'submission': return <FileUp className="h-4 w-4 text-purple-500" />;
      case 'user': return <UserPlus className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-slate-500" />;
    }
  };

  const sidebarItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Admin Management", href: "/admin/admins", icon: Shield },
    { name: "Submissions", href: "/admin/submissions", icon: FileText },
    { name: "Hosted Services", href: "/admin/hosted-services", icon: Server },
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
          <div className="flex items-center gap-2">
            <Logo light />
            <span className="font-bold tracking-tight bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] ml-1 self-start mt-1">ADMIN</span>
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-500 relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between px-4 py-3 border-b bg-slate-50/50">
                  <div className="font-semibold text-sm">Notifications</div>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto px-2 py-0.5 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={markAllAsRead}
                    >
                      Mark all read
                    </Button>
                  )}
                </div>
                <ScrollArea className="h-[300px]">
                  {notifications.length > 0 ? (
                    <div className="divide-y">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={cn(
                            "flex gap-3 p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50",
                            !notification.read && "bg-blue-50/50 dark:bg-blue-900/10"
                          )}
                        >
                          <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                            "bg-white border shadow-sm dark:bg-slate-900 dark:border-slate-700"
                          )}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className={cn(
                              "text-sm leading-none",
                              !notification.read ? "font-semibold text-slate-900 dark:text-slate-100" : "text-slate-600 dark:text-slate-400"
                            )}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 shrink-0 text-slate-400 hover:text-blue-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              title="Mark as read"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </ScrollArea>
                <div className="p-2 border-t bg-slate-50/50 text-center">
                  <Link href="/admin/notifications">
                    <a className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline block py-1">
                      View all notifications
                    </a>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
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
