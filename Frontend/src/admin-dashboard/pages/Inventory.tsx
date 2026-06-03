import { InventoryTable } from "../components/InventoryTable"

export default function Inventory() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
                <p className="text-muted-foreground">
                    Track and manage your product stock levels.
                </p>
            </div>

            <InventoryTable />
        </div>
    )
}
