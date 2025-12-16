import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { Lock, User } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({ id: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    if (credentials.id && credentials.password) {
      toast.success("Welcome back, Admin");
      setLocation("/admin/users");
    } else {
      toast.error("Please enter ID and Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200 dark:border-slate-800">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center transform scale-125 mb-2">
            <Logo />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
            <CardDescription>
              Enter your credentials to access the management dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">Admin ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="id" 
                  placeholder="admin" 
                  className="pl-9"
                  value={credentials.id}
                  onChange={(e) => setCredentials({...credentials, id: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-9"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
