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
          {/* Top Diamond */}
          <path 
            d="M20 3L29 12L20 21L11 12L20 3Z" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinejoin="miter"
            fill="none"
          />
          {/* Bottom Left Diamond */}
          <path 
            d="M11 21L20 30L11 39L2 30L11 21Z" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinejoin="miter"
            fill="none"
          />
          {/* Bottom Right Diamond */}
          <path 
            d="M29 21L38 30L29 39L20 30L29 21Z" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinejoin="miter"
            fill="none"
          />
          {/* Central Accent Square */}
          <rect x="18.5" y="19.5" width="3" height="3" fill="#3B82F6" transform="rotate(45 20 21)" /> 
        </svg>
      </div>

      {/* Text Stack */}
      {!collapsed && (
        <div className="flex flex-col justify-center leading-none">
          <span className={cn(
            "text-[10px] font-black uppercase tracking-[0.3em] italic text-slate-400",
            light ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
          )}>
            Industrial
          </span>
          <div className={cn(
            "font-heading text-2xl font-black tracking-tighter flex items-center italic transform -skew-x-6",
            light ? "text-white" : "text-slate-900 dark:text-white"
          )}>
            DATA
            <span className="text-blue-500 dark:text-blue-400 ml-0.5">-X</span>
          </div>
        </div>
      )}
    </div>
  );
}
