import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Server, 
  Eye, 
  Activity,
  Terminal,
  Settings
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HostedServiceManage } from "@/components/hosted-service-manage";
import { HostedServiceLogs } from "@/components/hosted-service-logs";

// Mock Approved Hosted Services with Owner info
const HOSTED_SERVICES_MOCK = [
  {
    id: "ha1",
    title: "Global Weather Historical Data",
    description: "Complete historical weather data from major global stations (1980-2024).",
    status: "Active",
    endpoint: "https://api.platform.com/v1/weather",
    region: "US-East (N. Virginia)",
    tier: "Pro Plan",
    uptime: "99.99%",
    nextBilling: "2026-01-20",
    type: "DATA",
    owner: "Climate Data Org",
    ownerEmail: "data@climate.example.org"
  },
  {
    id: "ha2",
    title: "Bio-Medical Research Corpus",
    description: "Annotated corpus for biomedical NLP research and training.",
    status: "Active",
    endpoint: "https://api.platform.com/v1/biomed",
    region: "Asia-Pacific (Seoul)",
    tier: "Enterprise",
    uptime: "99.95%",
    nextBilling: "2026-01-15",
    type: "AGENT",
    owner: "MedAI Systems",
    ownerEmail: "contact@medai.example.com"
  },
  {
    id: "ha3",
    title: "Stock Market Tick Stream",
    description: "Real-time stock market data stream via WebSocket.",
    status: "Active",
    endpoint: "wss://api.platform.com/v1/stream",
    region: "US-West (Oregon)",
    tier: "Enterprise",
    uptime: "99.99%",
    nextBilling: "2026-01-25",
    type: "MCP",
    owner: "FinTech Global",
    ownerEmail: "tech@fintech.example.com"
  },
  {
    id: "ha4",
    title: "Smart Factory Sensor Grid",
    description: "IoT sensor data aggregation from manufacturing plants.",
    status: "Active",
    endpoint: "https://api.platform.com/v1/sensors",
    region: "Europe (Frankfurt)",
    tier: "Pro Plan",
    uptime: "99.90%",
    nextBilling: "2026-02-01",
    type: "DATA",
    owner: "Tech Manufacturing",
    ownerEmail: "ops@techmfg.example.com"
  }
];

export default function HostedServicesManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState(HOSTED_SERVICES_MOCK);

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'Suspended': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>;
      case 'Maintenance': return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Maintenance</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'MCP': return <Badge className="bg-purple-100 text-purple-800 border-purple-200">MCP</Badge>;
      case 'DATA': return <Badge className="bg-blue-100 text-blue-800 border-blue-200">DATA</Badge>;
      case 'AGENT': return <Badge className="bg-amber-100 text-amber-800 border-amber-200">AGENT</Badge>;
      default: return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <AdminLayout title="Hosted Service Management">
      <div className="space-y-6">
        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services or owners..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {/* Additional filters can be added here */}
            </div>
          </CardContent>
        </Card>

        {/* Services List */}
        <div className="space-y-4">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
              <Server className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <h3 className="text-lg font-medium text-muted-foreground">No services found</h3>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your search terms.</p>
            </div>
          ) : (
            filteredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold">{service.title}</h3>
                        {getTypeBadge(service.type)}
                        {getStatusBadge(service.status)}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-muted-foreground text-sm mb-2">{service.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Owner:</span>
                        <span className="text-slate-600 dark:text-slate-400">{service.owner}</span>
                        <span className="text-slate-400 text-xs">({service.ownerEmail})</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Endpoint</p>
                        <div className="flex items-center gap-1 font-mono text-xs max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                          {service.endpoint}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Region</p>
                        <p className="font-medium">{service.region}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Plan Tier</p>
                        <p className="font-medium">{service.tier}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Uptime (30d)</p>
                        <p className="font-medium text-green-600 flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          {service.uptime}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-900 p-6 flex flex-row md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l min-w-[180px]">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full gap-2">
                          <Settings className="h-4 w-4" />
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl h-[90vh] p-6">
                        <HostedServiceManage data={service} />
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full gap-2">
                          <Terminal className="h-4 w-4" />
                          View Logs
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl p-0 border-none bg-transparent shadow-none">
                        <HostedServiceLogs serviceName={service.title} />
                      </DialogContent>
                    </Dialog>
                    
                    <p className="text-[10px] text-muted-foreground text-center mt-auto">
                      Next bill: {service.nextBilling}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
