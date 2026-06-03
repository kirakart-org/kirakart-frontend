import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function LowStockAlerts() {
    const lowStockItems = [
        { id: 1, name: "Kanjivaram Red Silk", stock: 2 },
        { id: 2, name: "Banarasi Blue", stock: 1 },
        { id: 3, name: "Cotton Print Green", stock: 0 },
    ]

    if (lowStockItems.length === 0) return null

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium">Attention Needed</h3>
                <Button variant="link" size="sm" asChild>
                    <Link to="/admin/inventory">View Inventory <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
            </div>
            {lowStockItems.map((item) => (
                <Alert key={item.id} variant="destructive" className="bg-red-50 border-red-200 text-red-800 [&>svg]:text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="font-semibold">{item.name}</AlertTitle>
                    <AlertDescription>
                        Only {item.stock} left in stock.
                    </AlertDescription>
                </Alert>
            ))}
        </div>
    )
}
