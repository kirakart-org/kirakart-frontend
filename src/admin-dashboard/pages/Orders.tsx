import { OrderTable } from "../components/OrderTable"

export default function Orders() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                <p className="text-muted-foreground">
                    View and manage customer orders.
                </p>
            </div>

            <OrderTable />
        </div>
    )
}
