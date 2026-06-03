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
import { Eye } from "lucide-react"
import { Link } from "react-router-dom"

// Mock data
const orders = [
    {
        id: "ORD-001",
        customer: "Priya Sharma",
        amount: "₹12,450",
        payment: "UPI",
        status: "Pending",
        date: "Jan 09, 2024",
    },
    {
        id: "ORD-002",
        customer: "Anjali Gupta",
        amount: "₹8,900",
        payment: "Card",
        status: "Shipped",
        date: "Jan 09, 2024",
    },
    {
        id: "ORD-003",
        customer: "Rahul Verma",
        amount: "₹24,000",
        payment: "COD",
        status: "Delivered",
        date: "Jan 08, 2024",
    },
    {
        id: "ORD-004",
        customer: "Sneha Reddy",
        amount: "₹4,500",
        payment: "UPI",
        status: "Cancelled",
        date: "Jan 07, 2024",
    },
]

export function OrderTable() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
            case "Shipped": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
            case "Delivered": return "bg-green-100 text-green-800 hover:bg-green-100";
            case "Cancelled": return "bg-red-100 text-red-800 hover:bg-red-100";
            default: return "";
        }
    }

    return (
        <div className="rounded-md border bg-white overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.amount}</TableCell>
                                <TableCell>{order.payment}</TableCell>
                                <TableCell>
                                    <Badge className={getStatusColor(order.status)} variant="outline">
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link to={`/admin/orders/${order.id}`}>
                                            <Eye className="h-4 w-4" />
                                            <span className="sr-only">View Order</span>
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
