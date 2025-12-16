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
import { Download } from "lucide-react";
import { useState } from "react";

// Mock Payments
const MOCK_DATA_PAYMENTS = [
  { id: "PAY-001", user: "Kim Min-su", product: "Corporate Growth Big Data", amount: "$150.00", date: "2025-11-20", status: "Completed" },
  { id: "PAY-002", user: "Lee Ji-won", product: "Smart Equipment Management", amount: "$50.00", date: "2025-10-05", status: "Completed" },
  { id: "PAY-003", user: "Global Systems", product: "Logistics API Standard", amount: "$200.00", date: "2025-12-16", status: "Pending" },
];

const MOCK_AD_PAYMENTS = [
  { id: "AD-001", user: "Tech Corp", product: "Banner Ad (Main)", duration: "7 Days", amount: "$79.00", date: "2025-12-01", status: "Completed" },
  { id: "AD-002", user: "Vision AI", product: "Sidebar Ad", duration: "14 Days", amount: "$118.00", date: "2025-12-10", status: "Completed" },
  { id: "AD-003", user: "StartUp Inc", product: "Listing Ad", duration: "30 Days", amount: "$250.00", date: "2025-12-15", status: "Refunded" },
];

export default function PaymentManagement() {
  return (
    <AdminLayout title="Payment Management">
      <Tabs defaultValue="data" className="w-full space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="data">Data Purchases</TabsTrigger>
            <TabsTrigger value="ads">Advertising</TabsTrigger>
          </TabsList>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_DATA_PAYMENTS.map((payment) => (
                  <TableRow key={payment.id}>
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
                  </TableRow>
                ))}
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_AD_PAYMENTS.map((payment) => (
                  <TableRow key={payment.id}>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
