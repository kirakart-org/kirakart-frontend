import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ProductTable } from "../components/ProductTable"

export default function Products() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground">
                        Manage your product catalog.
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>

            <ProductTable />
        </div>
    )
}
