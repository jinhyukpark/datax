import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  collapsed?: boolean;
  light?: boolean;
}

export function Logo({ className, collapsed = false, light = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* AI Symbol */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full" />
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={cn("relative z-10 transition-all", light ? "text-white" : "text-slate-900 dark:text-white")}
        >
          <defs>
            <linearGradient id="ai-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>
          
          {/* Neural Nodes / Connections */}
          <path 
            d="M20 10C20 10 12 14 12 22C12 30 20 34 20 34" 
            stroke="url(#ai-gradient)" 
            strokeWidth="2.5" 
            strokeLinecap="round"
            className="opacity-80"
          />
          <path 
            d="M20 10C20 10 28 14 28 22C28 30 20 34 20 34" 
            stroke="url(#ai-gradient)" 
            strokeWidth="2.5" 
            strokeLinecap="round"
            className="opacity-80"
          />
          
          {/* Central Core */}
          <circle cx="20" cy="22" r="4" fill="url(#ai-gradient)" />
          
          {/* Orbiting Electron/Spark */}
          <circle cx="20" cy="6" r="2" fill="#60A5FA" className="animate-pulse" />
          
          {/* Data Lines */}
          <path d="M12 22L20 22" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M28 22L20 22" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
        </svg>
      </div>

      {/* Text Stack */}
      {!collapsed && (
        <div className="flex flex-col justify-center leading-none">
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500",
            light ? "text-blue-300" : "text-blue-600 dark:text-blue-400"
          )}>
            Industrial AI
          </span>
          <div className={cn(
            "font-heading text-2xl font-black tracking-tighter flex items-center",
            light ? "text-white" : "text-slate-900 dark:text-white"
          )}>
            DATA
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-600 ml-0.5">-X</span>
          </div>
        </div>
      )}
    </div>
  );
}
