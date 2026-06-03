import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Save } from "lucide-react"
import { useState } from "react"

// Mock data
const initialInventory = [
    {
        id: 1,
        name: "Kanjivaram Silk Saree",
        sku: "SKU-001",
        stock: 2,
        lowStockThreshold: 5,
        lastUpdated: "2 hours ago",
    },
    {
        id: 2,
        name: "Banarasi Georgette",
        sku: "SKU-002",
        stock: 12,
        lowStockThreshold: 5,
        lastUpdated: "1 day ago",
    },
    {
        id: 3,
        name: "Cotton Daily Wear",
        sku: "SKU-003",
        stock: 0,
        lowStockThreshold: 10,
        lastUpdated: "3 days ago",
    },
    {
        id: 4,
        name: "Mysore Silk",
        sku: "SKU-004",
        stock: 8,
        lowStockThreshold: 5,
        lastUpdated: "5 hours ago",
    },
]

export function InventoryTable() {
    const [inventory, setInventory] = useState(initialInventory)

    const handleStockChange = (id: number, newStock: string) => {
        const stockVal = parseInt(newStock)
        if (isNaN(stockVal)) return

        setInventory(inventory.map(item =>
            item.id === id ? { ...item, stock: stockVal } : item
        ))
    }

    return (
        <div className="rounded-md border bg-white overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Current Stock</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventory.map((item) => {
                            const isLowStock = item.stock <= item.lowStockThreshold && item.stock > 0;
                            const isOutOfStock = item.stock === 0;

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.sku}</TableCell>
                                    <TableCell>
                                        {isOutOfStock ? (
                                            <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Out of Stock</Badge>
                                        ) : isLowStock ? (
                                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
                                                <AlertCircle className="mr-1 h-3 w-3" /> Low Stock
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-green-600 border-green-200">
                                                <CheckCircle className="mr-1 h-3 w-3" /> In Stock
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 max-w-[120px]">
                                            <Input
                                                type="number"
                                                value={item.stock}
                                                onChange={(e) => handleStockChange(item.id, e.target.value)}
                                                className="h-8"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{item.lastUpdated}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90">
                                            <Save className="h-4 w-4 mr-2" /> Update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
