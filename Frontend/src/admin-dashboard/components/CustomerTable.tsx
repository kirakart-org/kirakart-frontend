import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, MessageCircle, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data
const customers = [
    {
        id: 1,
        name: "Priya Sharma",
        phone: "+91 98765 43210",
        email: "priya@example.com",
        ordersCount: 5,
        lastOrder: "Jan 09, 2024",
        initials: "PS",
    },
    {
        id: 2,
        name: "Anjali Gupta",
        phone: "+91 98765 55555",
        email: "anjali@example.com",
        ordersCount: 2,
        lastOrder: "Jan 09, 2024",
        initials: "AG",
    },
    {
        id: 3,
        name: "Rahul Verma",
        phone: "+91 91234 56789",
        email: "rahul@example.com",
        ordersCount: 12,
        lastOrder: "Jan 08, 2024",
        initials: "RV",
    },
]

export function CustomerTable() {
    return (
        <div className="rounded-md border bg-white overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Total Orders</TableHead>
                            <TableHead>Last Order</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{customer.initials}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{customer.name}</span>
                                            <span className="text-xs text-muted-foreground">{customer.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.ordersCount}</TableCell>
                                <TableCell>{customer.lastOrder}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                                            <MessageCircle className="h-4 w-4" />
                                            <span className="sr-only">WhatsApp</span>
                                        </Button>
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link to={`/admin/customers/${customer.id}`}>
                                                <Eye className="h-4 w-4" />
                                                <span className="sr-only">View Details</span>
                                            </Link>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
