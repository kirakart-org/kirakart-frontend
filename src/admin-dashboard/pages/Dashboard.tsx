import { Package, ShoppingCart, TrendingUp, Truck } from "lucide-react"
import { StatsCard } from "../components/StatsCard"
import { RecentOrders } from "../components/RecentOrders"
import { LowStockAlerts } from "../components/LowStockAlerts"

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Overview of your store's performance today.
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Revenue"
                    value="₹45,231"
                    description="+20.1% from last month"
                    icon={TrendingUp}
                />
                <StatsCard
                    title="Orders Today"
                    value="+12"
                    description="4 pending processing"
                    icon={ShoppingCart}
                />
                <StatsCard
                    title="Pending Shipments"
                    value="8"
                    description="Orders ready to ship"
                    icon={Truck}
                />
                <StatsCard
                    title="Low Stock"
                    value="3"
                    description="Items need restocking"
                    icon={Package}
                    alert={true}
                />
            </div>

            {/* Main Content Area */}
            <div className="grid gap-6 md:grid-cols-7">
                <div className="md:col-span-4 lg:col-span-5">
                    <RecentOrders />
                </div>
                <div className="md:col-span-3 lg:col-span-2">
                    <LowStockAlerts />
                </div>
            </div>
        </div>
    )
}
