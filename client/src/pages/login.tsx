import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/ui/logo";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Login() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/");
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Mock Google login delay
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-950">
      {/* Left Column - Form */}
      <div className="flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                {t("Back to Home", "홈으로 돌아가기")}
              </a>
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight">{t("Welcome back", "환영합니다")}</h1>
            <p className="text-muted-foreground">
              {t("Enter your credentials to access your account", "계정에 액세스하려면 자격 증명을 입력하세요")}
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full h-12 font-medium border-slate-200 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-slate-50" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <>
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  {t("Continue with Google", "Google로 계속하기")}
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-50 px-2 text-muted-foreground dark:bg-slate-950">
                  {t("Or continue with email", "또는 이메일로 계속하기")}
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("Email", "이메일")}</Label>
                <Input id="email" type="email" placeholder="name@example.com" required className="h-11" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("Password", "비밀번호")}</Label>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                    {t("Forgot password?", "비밀번호를 잊으셨나요?")}
                  </a>
                </div>
                <Input id="password" type="password" required className="h-11" />
              </div>
              <Button type="submit" className="w-full h-11 bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  t("Sign in", "로그인")
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                {t("Don't have an account?", "계정이 없으신가요?")}{" "}
              </span>
              <Link href="/signup">
                <a className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                  {t("Sign up", "회원가입")}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Visual */}
      <div className="hidden lg:flex relative bg-slate-900 items-center justify-center p-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/50 via-slate-900 to-slate-900" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative z-10 max-w-md text-center space-y-6">
          <div className="mb-8 flex justify-center">
             <Logo light className="scale-150" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {t("Connect with Industrial Intelligence", "산업 지능과 연결하세요")}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            {t(
              "Access premium industrial datasets, AI agents, and APIs from verified providers worldwide.",
              "전 세계 인증된 제공자의 프리미엄 산업 데이터셋, AI 에이전트 및 API에 액세스하세요."
            )}
          </p>
          
          {/* Features List */}
          <ul className="text-left space-y-3 mt-8 inline-block mx-auto">
            <li className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              <span>Enterprise-grade security</span>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              <span>Real-time data streams</span>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              <span>Verified provider network</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
