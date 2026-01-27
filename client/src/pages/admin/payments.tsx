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
import { Download, Calendar as CalendarIcon, DollarSign, Percent, Eye, Plus, Check, Search, User, Edit2, Save, X } from "lucide-react";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format, isWithinInterval, parseISO, startOfDay, endOfDay, subDays, addDays, differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

// Mock Users for Selection
const MOCK_USERS = [
  { id: "u1", name: "Kim Min-su", email: "kim@example.com", company: "Tech Corp", avatar: "/avatars/01.png" },
  { id: "u2", name: "Lee Ji-won", email: "lee@example.com", company: "Vision AI", avatar: "/avatars/02.png" },
  { id: "u3", name: "Park Sung-hoon", email: "park@example.com", company: "StartUp Inc", avatar: "/avatars/03.png" },
  { id: "u4", name: "Choi Yu-jin", email: "choi@example.com", company: "Green Eco", avatar: "/avatars/04.png" },
  { id: "u5", name: "Jung Woo-sung", email: "jung@example.com", company: "Data Systems", avatar: "/avatars/05.png" },
];

// Mock Ad Products
const AD_PRODUCTS = [
  { id: "banner", name: "Banner Ad (Main)", price: 79, description: "Top banner on main page" },
  { id: "sidebar", name: "Sidebar Ad", price: 59, description: "Right sidebar on details pages" },
  { id: "listing", name: "Listing Ad", price: 69, description: "Highlighted in search results" },
  { id: "newsletter", name: "Newsletter Feature", price: 150, description: "Mention in weekly newsletter" },
];

// Mock Reserved Dates
const RESERVED_DATES = [
  addDays(new Date(), 2),
  addDays(new Date(), 3),
  addDays(new Date(), 5),
  addDays(new Date(), 6),
  addDays(new Date(), 7),
];

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
    details: "Main page banner advertisement campaign.",
    contactName: "James Wilson",
    email: "james.w@techcorp.com",
    phone: "010-1234-5678",
    notes: "Please ensure the banner is high resolution."
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
    details: "Sidebar placement for recruitment drive.",
    contactName: "Sarah Lee",
    email: "sarah@visionai.io",
    phone: "010-9876-5432",
    notes: "Targeting engineering candidates."
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
    details: "Premium listing placement. Refunded due to cancellation.",
    contactName: "Mike Chen",
    email: "mike@startup.inc",
    phone: "010-5555-4444",
    notes: "Cancellation requested due to strategy change."
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
    details: "Featured spot in the weekly industry newsletter.",
    contactName: "Emma Davis",
    email: "emma@greeneco.org",
    phone: "010-3333-2222",
    notes: "Focus on sustainability initiative."
  },
];

export default function PaymentManagement() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date("2025-12-16"), 30),
    to: new Date("2025-12-16"),
  });
  
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>({});
  const [activeTab, setActiveTab] = useState("data");

  // Reservation State
  const [reservationOpen, setReservationOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userSearchOpen, setUserSearchOpen] = useState(false);
  const [selectedAdProducts, setSelectedAdProducts] = useState<string[]>([]);
  const [reservationDate, setReservationDate] = useState<DateRange | undefined>();
  const [discountRate, setDiscountRate] = useState(0);

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
    setEditForm(payment); // Initialize edit form
    setIsEditing(false); // Reset edit mode
    setDetailOpen(true);
  };

  const handleSave = () => {
    // In a real app, you would make an API call here
    setSelectedPayment(editForm);
    setIsEditing(false);
    // Also update the list in a real app
  };

  const handleStatusChange = (newStatus: string) => {
     setSelectedPayment({...selectedPayment, status: newStatus});
     // In a real app, update the list state too
  };

  // Reservation Calculations
  const selectedProductsData = AD_PRODUCTS.filter(p => selectedAdProducts.includes(p.id));
  const productsTotal = selectedProductsData.reduce((sum, p) => sum + p.price, 0);
  
  const durationDays = reservationDate?.from && reservationDate?.to 
    ? differenceInDays(reservationDate.to, reservationDate.from) + 1 
    : 0;
  
  const weeks = Math.ceil(durationDays / 7) || 1; // Minimum 1 week billing unit for simplicity or use exact days
  // Let's assume price is per week for simplicity as per previous mockups, or just flat price for now based on previous context "79/week"
  
  const baseTotal = productsTotal * weeks;
  const discountAmount = baseTotal * (discountRate / 100);
  const finalTotal = baseTotal - discountAmount;

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
            <div className="flex justify-end mb-4">
               <Dialog open={reservationOpen} onOpenChange={setReservationOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4" />
                    Reserve Ad Space
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] h-fit max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Ad Reservation</DialogTitle>
                    <DialogDescription>
                      Manually reserve advertising space for a client.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-6 py-4">
                    {/* User Selection */}
                    <div className="space-y-2">
                      <Label>Select Client</Label>
                      <Popover open={userSearchOpen} onOpenChange={setUserSearchOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={userSearchOpen}
                            className="w-full justify-between"
                          >
                            {selectedUser ? (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={selectedUser.avatar} />
                                  <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                                </Avatar>
                                <span>{selectedUser.name}</span>
                                <span className="text-muted-foreground text-xs ml-2">({selectedUser.company})</span>
                              </div>
                            ) : (
                              "Search for client..."
                            )}
                            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <Command>
                            <CommandInput placeholder="Search client..." />
                            <CommandList>
                              <CommandEmpty>No client found.</CommandEmpty>
                              <CommandGroup>
                                {MOCK_USERS.map((user) => (
                                  <CommandItem
                                    key={user.id}
                                    value={user.name}
                                    onSelect={() => {
                                      setSelectedUser(user);
                                      setUserSearchOpen(false);
                                    }}
                                  >
                                    <div className="flex items-center gap-2 w-full">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex flex-col">
                                        <span className="font-medium">{user.name}</span>
                                        <span className="text-xs text-muted-foreground">{user.company} • {user.email}</span>
                                      </div>
                                      {selectedUser?.id === user.id && (
                                        <Check className="ml-auto h-4 w-4" />
                                      )}
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left Column: Products & Dates */}
                      <div className="space-y-6">
                         {/* Product Selection */}
                        <div className="space-y-3">
                          <Label>Ad Products</Label>
                          <div className="border rounded-lg p-4 space-y-3 bg-slate-50 dark:bg-slate-900/50">
                            {AD_PRODUCTS.map((product) => (
                              <div key={product.id} className="flex items-start space-x-3">
                                <Checkbox 
                                  id={product.id} 
                                  checked={selectedAdProducts.includes(product.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedAdProducts([...selectedAdProducts, product.id]);
                                    } else {
                                      setSelectedAdProducts(selectedAdProducts.filter(id => id !== product.id));
                                    }
                                  }}
                                />
                                <div className="grid gap-1.5 leading-none w-full">
                                  <label
                                    htmlFor={product.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between"
                                  >
                                    <span>{product.name}</span>
                                    <span className="font-bold">${product.price}/wk</span>
                                  </label>
                                  <p className="text-xs text-muted-foreground">
                                    {product.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Discount */}
                        <div className="space-y-2">
                          <Label>Discount (%)</Label>
                          <div className="relative">
                            <Input 
                              type="number" 
                              min="0" 
                              max="100"
                              value={discountRate}
                              onChange={(e) => setDiscountRate(Number(e.target.value))}
                              className="pl-9"
                            />
                            <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Calendar */}
                      <div className="space-y-2">
                        <Label>Select Duration</Label>
                        <div className="border rounded-md p-3 flex justify-center bg-white dark:bg-slate-950">
                          <Calendar
                            mode="range"
                            selected={reservationDate}
                            onSelect={setReservationDate}
                            numberOfMonths={1}
                            disabled={[
                              { before: new Date() },
                              ...RESERVED_DATES
                            ]}
                            modifiers={{
                              booked: RESERVED_DATES
                            }}
                            modifiersStyles={{
                              booked: { textDecoration: "line-through", color: "#ef4444", opacity: 0.5 }
                            }}
                          />
                        </div>
                        <div className="flex gap-4 text-xs text-muted-foreground justify-center">
                           <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                            <span>Available</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-400 opacity-50"></div>
                            <span>Reserved</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary Section */}
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Selected Products ({selectedAdProducts.length})</span>
                        <span>${productsTotal.toLocaleString()}/week</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration</span>
                        <span>{weeks} week(s) ({durationDays} days)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                         <span className="text-muted-foreground">Subtotal</span>
                         <span>${baseTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600">
                         <span>Discount ({discountRate}%)</span>
                         <span>-${discountAmount.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-2xl text-blue-600">${finalTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setReservationOpen(false)}>Cancel</Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700" 
                      onClick={() => {
                        setReservationOpen(false);
                        // In a real app, handle submission here
                      }}
                      disabled={!selectedUser || selectedAdProducts.length === 0 || !reservationDate?.from || !reservationDate?.to}
                    >
                      Confirm Reservation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
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
          <DialogContent className="sm:max-w-[600px] font-sans">
            <DialogHeader>
              <div className="flex justify-between items-center pr-8">
                <DialogTitle>{activeTab === "ads" ? "Ad Inquiry Details" : "Payment Details"}</DialogTitle>
                {activeTab === "ads" && !isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="h-8">
                    <Edit2 className="h-3.5 w-3.5 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
              <DialogDescription>
                Transaction information for {selectedPayment?.id}
              </DialogDescription>
            </DialogHeader>
            {selectedPayment && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Transaction ID</span>
                    {isEditing ? (
                      <Input 
                        value={editForm.id || ""} 
                        onChange={(e) => setEditForm({...editForm, id: e.target.value})}
                        className="h-10 text-base"
                      />
                    ) : (
                      <p className="text-base font-medium">{selectedPayment.id}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Date</span>
                    {isEditing ? (
                      <Input 
                        type="date"
                        value={editForm.date || ""} 
                        onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                        className="h-10 text-base"
                      />
                    ) : (
                      <p className="text-base font-medium">{selectedPayment.date}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">User/Company</span>
                    {isEditing ? (
                      <Input 
                        value={editForm.user || ""} 
                        onChange={(e) => setEditForm({...editForm, user: e.target.value})}
                        className="h-10 text-base"
                      />
                    ) : (
                      <p className="text-base font-medium">{selectedPayment.user}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground block">Status</span>
                    {isEditing ? (
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={editForm.status}
                        onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      >
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending Inquiry</option>
                        <option value="Refunded">Refunded</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : (
                      <Badge variant={selectedPayment.status === 'Completed' ? 'default' : selectedPayment.status === 'Rejected' ? 'destructive' : 'secondary'} className="text-sm">
                        {selectedPayment.status}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="space-y-1 mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Product</span>
                    {isEditing ? (
                      <Input 
                        value={editForm.product || ""} 
                        onChange={(e) => setEditForm({...editForm, product: e.target.value})}
                        className="h-10 text-base"
                      />
                    ) : (
                      <p className="text-base font-medium">{selectedPayment.product}</p>
                    )}
                    {selectedPayment.duration && !isEditing && (
                      <span className="text-sm text-muted-foreground">Duration: {selectedPayment.duration}</span>
                    )}
                  </div>
                  
                  {/* Contact Info for Ad Inquiries */}
                  {activeTab === "ads" && (
                     <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1">
                          <span className="text-sm font-medium text-muted-foreground">Contact Name</span>
                          {isEditing ? (
                            <Input 
                              value={editForm.contactName || ""} 
                              onChange={(e) => setEditForm({...editForm, contactName: e.target.value})}
                              className="h-10 text-base"
                            />
                          ) : (
                            <p className="text-base">{selectedPayment.contactName || "N/A"}</p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm font-medium text-muted-foreground">Phone</span>
                          {isEditing ? (
                            <Input 
                              value={editForm.phone || ""} 
                              onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                              className="h-10 text-base"
                            />
                          ) : (
                             <p className="text-base">{selectedPayment.phone || "N/A"}</p>
                          )}
                        </div>
                        <div className="col-span-2 space-y-1">
                          <span className="text-sm font-medium text-muted-foreground">Email</span>
                          {isEditing ? (
                            <Input 
                              value={editForm.email || ""} 
                              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                              className="h-10 text-base"
                            />
                          ) : (
                            <p className="text-base">{selectedPayment.email || "N/A"}</p>
                          )}
                        </div>
                     </div>
                  )}

                  <div className="space-y-1 mb-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      {activeTab === "ads" ? "Request Details / Notes" : "Description/Notes"}
                    </span>
                    {isEditing ? (
                      <Textarea 
                        value={activeTab === "ads" ? (editForm.notes || "") : (editForm.details || "")}
                        onChange={(e) => {
                          const key = activeTab === "ads" ? "notes" : "details";
                          setEditForm({...editForm, [key]: e.target.value});
                        }}
                        className="min-h-[150px] text-base resize-y"
                      />
                    ) : (
                      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-md min-h-[120px] overflow-auto resize-y">
                        <p className="text-base text-slate-600 dark:text-slate-300">
                          {activeTab === "ads" && selectedPayment.notes ? selectedPayment.notes : selectedPayment.details}
                        </p>
                      </div>
                    )}
                  </div>

                  {activeTab !== "ads" && (
                    <div className="space-y-1">
                       <span className="text-sm font-medium text-muted-foreground">Payment Method</span>
                       <p className="text-base">{selectedPayment.paymentMethod}</p>
                    </div>
                  )}
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Subtotal</span>
                    {isEditing ? (
                      <Input 
                        type="number"
                        value={editForm.amountValue + editForm.discountValue} 
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setEditForm({...editForm, amountValue: val - editForm.discountValue});
                        }}
                        className="h-8 w-24 text-right"
                      />
                    ) : (
                      <span>${(selectedPayment.amountValue + selectedPayment.discountValue).toLocaleString()}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-base text-green-600">
                    <span>Discount</span>
                    {isEditing ? (
                      <Input 
                        type="number"
                        value={editForm.discountValue} 
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setEditForm({...editForm, discountValue: val, amountValue: (editForm.amountValue + editForm.discountValue) - val});
                        }}
                        className="h-8 w-24 text-right"
                      />
                    ) : (
                      <span>-${selectedPayment.discountValue.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>{activeTab === "ads" ? "Estimated Cost" : "Total Paid"}</span>
                    {isEditing ? (
                      <div className="flex items-center">
                        <span>$</span>
                        <Input 
                          type="number"
                          value={editForm.amountValue} 
                          readOnly
                          className="h-8 w-24 text-right border-none bg-transparent"
                        />
                      </div>
                    ) : (
                      <span>{selectedPayment.amount}</span>
                    )}
                  </div>
                  {activeTab === "ads" && (
                    <p className="text-[10px] text-muted-foreground mt-1">
                      * Final cost may vary based on duration and additional requirements.
                    </p>
                  )}
                </div>
              </div>
            )}
            <DialogFooter className="flex gap-2 sm:justify-between sm:gap-0">
               {isEditing ? (
                 <div className="flex w-full justify-end gap-2">
                    <Button variant="outline" onClick={() => {
                      setIsEditing(false);
                      setEditForm(selectedPayment);
                    }}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                 </div>
               ) : (
                 <>
                   {activeTab === "ads" ? (
                     <div className="flex w-full justify-between items-center">
                        <div className="flex gap-2">
                          <Button 
                            variant="destructive" 
                            className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                            onClick={() => handleStatusChange("Rejected")}
                          >
                            Reject Request
                          </Button>
                          <Button 
                             className="bg-green-600 hover:bg-green-700 text-white"
                             onClick={() => handleStatusChange("Completed")}
                          >
                            Approve Request
                          </Button>
                        </div>
                        <Button variant="outline" onClick={() => setDetailOpen(false)}>Close</Button>
                     </div>
                   ) : (
                     <Button className="w-full sm:w-auto ml-auto" onClick={() => setDetailOpen(false)}>Close</Button>
                   )}
                 </>
               )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
