import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

// Mock data
const recentOrders = [
    {
        id: "ORD-001",
        customer: "Priya Sharma",
        amount: "₹12,450",
        status: "Pending",
        date: "Today, 10:23 AM",
    },
    {
        id: "ORD-002",
        customer: "Anjali Gupta",
        amount: "₹8,900",
        status: "Shipped",
        date: "Today, 09:15 AM",
    },
    {
        id: "ORD-003",
        customer: "Rahul Verma",
        amount: "₹24,000",
        status: "Processing",
        date: "Yesterday",
    },
]

export function RecentOrders() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium">Recent Orders</h3>
                <Button variant="link" size="sm" asChild>
                    <Link to="/admin/orders">View All <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
            </div>
            <div className="rounded-md border bg-white overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell className="whitespace-nowrap">{order.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={order.status === "Pending" ? "secondary" : "default"}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
