import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Eraser, Pause, Play, Search, Terminal } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  source: string;
}

interface HostedServiceLogsProps {
  serviceName: string;
}

export function HostedServiceLogs({ serviceName }: HostedServiceLogsProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [filter, setFilter] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial mock logs
  useEffect(() => {
    const initialLogs: LogEntry[] = Array.from({ length: 20 }, (_, i) => generateLogEntry(i));
    setLogs(initialLogs);
  }, []);

  // Simulate incoming logs
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setLogs(prev => {
        const newLog = generateLogEntry(prev.length);
        const newLogs = [...prev, newLog].slice(-1000); // Keep last 1000 logs
        return newLogs;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (!isPaused && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isPaused]);

  const generateLogEntry = (index: number): LogEntry => {
    const levels: ('INFO' | 'WARN' | 'ERROR' | 'DEBUG')[] = ['INFO', 'INFO', 'INFO', 'DEBUG', 'WARN', 'ERROR'];
    const level = levels[Math.floor(Math.random() * levels.length)];
    const sources = ['api-server', 'worker-1', 'worker-2', 'db-pool'];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const messages = [
      "Processing request 10239...",
      "Database connection established",
      "Cache hit for key 'user:123'",
      "Slow query detected: SELECT * FROM users",
      "Payment gateway timeout",
      "Health check passed",
      "Rate limit exceeded for IP 192.168.1.5",
      "User authentication successful",
      "Updating search index...",
      "Background job completed successfully"
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];

    return {
      id: `log-${Date.now()}-${index}`,
      timestamp: new Date().toISOString(),
      level,
      message,
      source
    };
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'text-blue-400';
      case 'WARN': return 'text-yellow-400';
      case 'ERROR': return 'text-red-400';
      case 'DEBUG': return 'text-slate-400';
      default: return 'text-slate-200';
    }
  };

  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(filter.toLowerCase()) || 
    log.source.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[80vh] bg-slate-950 text-slate-200 font-mono text-sm rounded-lg overflow-hidden border border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-slate-400" />
          <span className="font-semibold">{serviceName} Logs</span>
          <Badge variant="outline" className="text-green-400 border-green-400/30 bg-green-400/10 text-xs">Live</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            onClick={() => setLogs([])}
          >
            <Eraser className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-slate-800 bg-slate-900/50">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <Input 
            placeholder="Filter logs..." 
            className="h-8 pl-8 bg-slate-950 border-slate-800 text-slate-200 focus:ring-slate-700" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[100px] h-8 bg-slate-950 border-slate-800 text-slate-200">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="info">INFO</SelectItem>
            <SelectItem value="warn">WARN</SelectItem>
            <SelectItem value="error">ERROR</SelectItem>
            <SelectItem value="debug">DEBUG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Logs Area */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-1 scroll-smooth">
        {filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2">
            <Search className="h-8 w-8 opacity-50" />
            <p>No logs found matching your filter</p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="flex gap-3 hover:bg-white/5 p-0.5 rounded px-2 group">
              <span className="text-slate-500 w-[160px] shrink-0 select-none text-xs pt-0.5">{log.timestamp.split('T')[1].replace('Z', '')}</span>
              <span className={`w-[50px] shrink-0 font-bold text-xs pt-0.5 ${getLevelColor(log.level)}`}>{log.level}</span>
              <span className="text-purple-400 w-[100px] shrink-0 text-xs pt-0.5 hidden sm:block">[{log.source}]</span>
              <span className="text-slate-300 break-all">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}