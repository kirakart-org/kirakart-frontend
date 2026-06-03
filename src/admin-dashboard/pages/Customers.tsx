import { CustomerTable } from "../components/CustomerTable"

export default function Customers() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                <p className="text-muted-foreground">
                    Manage your customer base and view their history.
                </p>
            </div>

            <CustomerTable />
        </div>
    )
}
