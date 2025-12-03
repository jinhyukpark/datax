import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  collapsed?: boolean;
  light?: boolean;
}

export function Logo({ className, collapsed = false, light = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Geometric Symbol */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={cn("transition-all", light ? "text-white" : "text-slate-900 dark:text-white")}
        >
          {/* Abstract Geometric Shapes based on the screenshot style */}
          <path 
            d="M20 4L28 12L20 20L12 12L20 4Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          <path 
            d="M12 20L4 28L12 36L20 28L12 20Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          <path 
            d="M28 20L36 28L28 36L20 28L28 20Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          {/* Central Accent */}
          <rect x="18" y="18" width="4" height="4" fill="#4F46E5" /> 
        </svg>
      </div>

      {/* Text Stack */}
      {!collapsed && (
        <div className="flex flex-col justify-center leading-none">
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-[0.2em]",
            light ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
          )}>
            Industrial
          </span>
          <div className={cn(
            "font-heading text-xl font-bold tracking-tight flex items-center",
            light ? "text-white" : "text-slate-900 dark:text-white"
          )}>
            DATA
            <span className="text-indigo-600 dark:text-indigo-400">-X</span>
          </div>
        </div>
      )}
    </div>
  );
}
