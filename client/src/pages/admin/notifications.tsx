import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MessageSquare, 
  FileUp, 
  UserPlus, 
  Bell, 
  Check, 
  MoreHorizontal, 
  Trash2,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock Notifications Data (Extended)
const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'comment', message: 'New comment on "Smart Factory Report"', time: '2 min ago', read: false },
  { id: 2, type: 'submission', message: 'New data submission: "Logistics API"', time: '1 hour ago', read: false },
  { id: 3, type: 'user', message: 'New user registration: Choi Yu-jin', time: '3 hours ago', read: true },
  { id: 4, type: 'submission', message: 'New data submission: "Energy Stats"', time: '5 hours ago', read: true },
  { id: 5, type: 'comment', message: 'New comment on "AI Model Usage"', time: '1 day ago', read: true },
  { id: 6, type: 'user', message: 'New user registration: Lee Ji-won', time: '1 day ago', read: true },
  { id: 7, type: 'submission', message: 'New data submission: "Weather Data 2024"', time: '2 days ago', read: true },
  { id: 8, type: 'comment', message: 'New comment on "Logistics API"', time: '2 days ago', read: true },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast.success("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success("Notification deleted");
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'comment': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'submission': return <FileUp className="h-4 w-4 text-purple-500" />;
      case 'user': return <UserPlus className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-slate-500" />;
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    switch(type) {
      case 'comment': return 'Comment';
      case 'submission': return 'Submission';
      case 'user': return 'User';
      default: return 'System';
    }
  };

  return (
    <AdminLayout title="Notifications">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              onClick={() => setFilter('all')}
              className="h-8"
            >
              All
            </Button>
            <Button 
              variant={filter === 'unread' ? 'default' : 'outline'} 
              onClick={() => setFilter('unread')}
              className="h-8"
            >
              Unread
            </Button>
            <Button 
              variant={filter === 'read' ? 'default' : 'outline'} 
              onClick={() => setFilter('read')}
              className="h-8"
            >
              Read
            </Button>
          </div>
          <Button variant="outline" onClick={markAllAsRead} className="h-8 gap-2">
            <CheckCircle className="h-4 w-4" />
            Mark all as read
          </Button>
        </div>

        {/* Notifications List */}
        <div className="rounded-md border bg-white dark:bg-slate-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="w-[150px]">Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="w-[150px]">Time</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <TableRow key={notification.id} className={cn(!notification.read && "bg-blue-50/30 dark:bg-blue-900/10")}>
                    <TableCell>
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center border shadow-sm",
                        "bg-white dark:bg-slate-900 dark:border-slate-700"
                      )}>
                        {getNotificationIcon(notification.type)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal capitalize">
                        {getNotificationTypeLabel(notification.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "block",
                        !notification.read ? "font-semibold text-slate-900 dark:text-slate-100" : "text-slate-600 dark:text-slate-400"
                      )}>
                        {notification.message}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {notification.time}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {!notification.read && (
                            <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                              <Check className="mr-2 h-4 w-4" /> Mark as read
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600" onClick={() => deleteNotification(notification.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No notifications found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}