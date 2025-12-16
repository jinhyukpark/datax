import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar as CalendarIcon, DollarSign, Percent, Eye } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format, isWithinInterval, parseISO, startOfDay, endOfDay, subDays } from "date-fns";
import { DateRange } from "react-day-picker";

// Mock Payments
const MOCK_DATA_PAYMENTS = [
  { 
    id: "PAY-001", 
    user: "Kim Min-su", 
    product: "Corporate Growth Big Data", 
    amount: "$150.00", 
    amountValue: 150,
    discount: "$15.00",
    discountValue: 15,
    date: "2025-11-20", 
    status: "Completed",
    paymentMethod: "Credit Card",
    details: "Annual subscription renewal with early bird discount."
  },
  { 
    id: "PAY-002", 
    user: "Lee Ji-won", 
    product: "Smart Equipment Management", 
    amount: "$50.00", 
    amountValue: 50,
    discount: "$0.00",
    discountValue: 0,
    date: "2025-10-05", 
    status: "Completed",
    paymentMethod: "PayPal",
    details: "Monthly basic plan."
  },
  { 
    id: "PAY-003", 
    user: "Global Systems", 
    product: "Logistics API Standard", 
    amount: "$200.00", 
    amountValue: 200,
    discount: "$20.00",
    discountValue: 20,
    date: "2025-12-16", 
    status: "Pending",
    paymentMethod: "Bank Transfer",
    details: "Enterprise license for logistics API."
  },
  { 
    id: "PAY-004", 
    user: "Park Sung-hoon", 
    product: "Energy Consumption Dataset", 
    amount: "$300.00", 
    amountValue: 300,
    discount: "$30.00",
    discountValue: 30,
    date: "2025-12-15", 
    status: "Completed",
    paymentMethod: "Credit Card",
    details: "Bulk purchase of historical datasets."
  },
];

const MOCK_AD_PAYMENTS = [
  { 
    id: "AD-001", 
    user: "Tech Corp", 
    product: "Banner Ad (Main)", 
    duration: "7 Days", 
    amount: "$79.00", 
    amountValue: 79,
    discount: "$7.90",
    discountValue: 7.9,
    date: "2025-12-01", 
    status: "Completed",
    paymentMethod: "Credit Card",
    details: "Main page banner advertisement campaign."
  },
  { 
    id: "AD-002", 
    user: "Vision AI", 
    product: "Sidebar Ad", 
    duration: "14 Days", 
    amount: "$118.00", 
    amountValue: 118,
    discount: "$11.80",
    discountValue: 11.8,
    date: "2025-12-10", 
    status: "Completed",
    paymentMethod: "PayPal",
    details: "Sidebar placement for recruitment drive."
  },
  { 
    id: "AD-003", 
    user: "StartUp Inc", 
    product: "Listing Ad", 
    duration: "30 Days", 
    amount: "$250.00", 
    amountValue: 250,
    discount: "$50.00",
    discountValue: 50,
    date: "2025-12-15", 
    status: "Refunded",
    paymentMethod: "Credit Card",
    details: "Premium listing placement. Refunded due to cancellation."
  },
  { 
    id: "AD-004", 
    user: "Green Eco", 
    product: "Newsletter Feature", 
    duration: "1 Issue", 
    amount: "$150.00", 
    amountValue: 150,
    discount: "$0.00",
    discountValue: 0,
    date: "2025-12-14", 
    status: "Completed",
    paymentMethod: "Credit Card",
    details: "Featured spot in the weekly industry newsletter."
  },
];

export default function PaymentManagement() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date("2025-12-16"), 30),
    to: new Date("2025-12-16"),
  });
  
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("data");

  const filterPayments = (payments: any[]) => {
    if (!date?.from) return payments;
    
    const start = startOfDay(date.from);
    const end = date.to ? endOfDay(date.to) : endOfDay(date.from);

    return payments.filter(payment => {
      const paymentDate = parseISO(payment.date);
      return isWithinInterval(paymentDate, { start, end });
    });
  };

  const currentPayments = activeTab === "data" ? MOCK_DATA_PAYMENTS : MOCK_AD_PAYMENTS;
  const filteredPayments = filterPayments(currentPayments);

  // Calculate Metrics
  const totalRevenue = filteredPayments
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + p.amountValue, 0);

  const totalDiscount = filteredPayments
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + p.discountValue, 0);

  const avgDiscountRate = totalRevenue > 0 
    ? ((totalDiscount / (totalRevenue + totalDiscount)) * 100).toFixed(1) 
    : "0.0";

  const handleViewDetails = (payment: any) => {
    setSelectedPayment(payment);
    setDetailOpen(true);
  };

  return (
    <AdminLayout title="Payment Management">
      <div className="space-y-6">
        {/* Date Filter & Metrics Header */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">in selected period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Discount</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalDiscount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">total savings given</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Discount Rate</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgDiscountRate}%</div>
              <p className="text-xs text-muted-foreground">average per transaction</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredPayments.length}</div>
              <p className="text-xs text-muted-foreground">total records found</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="data" className="w-full space-y-4" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="data">Data Purchases</TabsTrigger>
              <TabsTrigger value="ads">Advertising</TabsTrigger>
            </TabsList>
          </div>

          {/* Data Purchases Tab */}
          <TabsContent value="data" className="mt-0">
            <div className="rounded-md border bg-white dark:bg-slate-900">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id} className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50" onClick={() => handleViewDetails(payment)}>
                      <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                      <TableCell>{payment.user}</TableCell>
                      <TableCell>{payment.product}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell className="font-medium">{payment.amount}</TableCell>
                      <TableCell>
                        <Badge variant={payment.status === 'Completed' ? 'default' : 'secondary'}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPayments.length === 0 && (
                     <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No results found for the selected date range.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Advertising Payments Tab */}
          <TabsContent value="ads" className="mt-0">
            <div className="rounded-md border bg-white dark:bg-slate-900">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Advertiser</TableHead>
                    <TableHead>Ad Product</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id} className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50" onClick={() => handleViewDetails(payment)}>
                      <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                      <TableCell>{payment.user}</TableCell>
                      <TableCell>{payment.product}</TableCell>
                      <TableCell>{payment.duration}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell className="font-medium">{payment.amount}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            payment.status === 'Refunded' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }
                          variant="outline"
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                   {filteredPayments.length === 0 && (
                     <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No results found for the selected date range.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        {/* Detail Dialog */}
        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>
                Transaction information for {selectedPayment?.id}
              </DialogDescription>
            </DialogHeader>
            {selectedPayment && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">Transaction ID</span>
                    <p className="text-sm font-medium">{selectedPayment.id}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">Date</span>
                    <p className="text-sm font-medium">{selectedPayment.date}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground">User/Company</span>
                    <p className="text-sm font-medium">{selectedPayment.user}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground block">Status</span>
                    <Badge variant="outline">{selectedPayment.status}</Badge>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="space-y-1 mb-4">
                    <span className="text-xs font-medium text-muted-foreground">Product</span>
                    <p className="text-sm font-medium">{selectedPayment.product}</p>
                    {selectedPayment.duration && (
                      <span className="text-xs text-muted-foreground">Duration: {selectedPayment.duration}</span>
                    )}
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    <span className="text-xs font-medium text-muted-foreground">Description/Notes</span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                      {selectedPayment.details}
                    </p>
                  </div>

                  <div className="space-y-1">
                     <span className="text-xs font-medium text-muted-foreground">Payment Method</span>
                     <p className="text-sm">{selectedPayment.paymentMethod}</p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${(selectedPayment.amountValue + selectedPayment.discountValue).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-${selectedPayment.discountValue.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total Paid</span>
                    <span>{selectedPayment.amount}</span>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setDetailOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
