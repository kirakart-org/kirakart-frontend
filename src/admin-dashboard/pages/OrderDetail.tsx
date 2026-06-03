import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle2, Clock, Package, Truck } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

export default function OrderDetail() {
    const { id } = useParams()

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link to="/admin/orders"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Order #{id}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Placed on Jan 09, 2024 at 10:23 AM
                    </p>
                </div>
                <div className="ml-auto">
                    <Select defaultValue="pending">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="packed">Packed</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Order Details Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex flex-col items-center gap-2 text-center z-10">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-medium">Confirmed</span>
                                    <span className="text-xs text-muted-foreground">10:23 AM</span>
                                </div>
                                {/* Connector Line (Hidden on mobile) */}
                                <div className="hidden md:block absolute top-5 left-0 w-full h-0.5 bg-muted -z-0" />

                                <div className="flex flex-col items-center gap-2 text-center z-10">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                        <Package className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-medium">Packed</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-center z-10">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                        <Truck className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-medium">Shipped</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-center z-10">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-medium">Delivered</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Products */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Items Ordered</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded bg-muted" />
                                    <div className="flex-1">
                                        <h4 className="font-medium">Kanjivaram Silk Saree</h4>
                                        <p className="text-sm text-muted-foreground">Red / Gold Border</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">₹12,450</p>
                                        <p className="text-sm text-muted-foreground">Qty: 1</p>
                                    </div>
                                </div>
                                {/* More items... */}
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>₹12,450</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Customer & Info Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Name</p>
                                <p>Priya Sharma</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <p>priya.sharma@example.com</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                <p>+91 98765 43210</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm leading-6">
                                Flat 402, Sunshine Apartments,<br />
                                Koramangala 4th Block,<br />
                                Bangalore, Karnataka - 560034
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Method</span>
                                <span className="font-medium">UPI</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Paid</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
