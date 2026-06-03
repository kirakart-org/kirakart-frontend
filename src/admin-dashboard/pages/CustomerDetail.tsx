import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

export default function CustomerDetail() {
    const { id } = useParams()

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link to="/admin/customers"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Customer Profile
                    </h1>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Customer Info Card */}
                <Card className="md:col-span-1">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarFallback className="text-lg">PS</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>Priya Sharma</CardTitle>
                            <p className="text-sm text-muted-foreground">Member since Jan 2023</p>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Separator />
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">priya@example.com</span>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex gap-2">
                            <Button className="w-full bg-green-600 hover:bg-green-700">
                                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Mail className="mr-2 h-4 w-4" /> Email
                            </Button>
                        </div>
                        <div className="pt-4">
                            <label className="text-sm font-medium mb-2 block">Internal Notes</label>
                            <Textarea placeholder="Add a note about this customer..." className="min-h-[100px]" />
                            <Button size="sm" variant="ghost" className="mt-2 text-xs">Save Note</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Order History */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Order Item 1 */}
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">ORDER #ORD-001</span>
                                        <Badge variant="secondary">Pending</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">Jan 09, 2024 • 1 Item</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">₹12,450</p>
                                    <Button variant="link" size="sm" asChild className="h-auto p-0 text-primary">
                                        <Link to="/admin/orders/ORD-001">View</Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Order Item 2 */}
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">ORDER #ORD-089</span>
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">Delivered</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">Dec 15, 2023 • 2 Items</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">₹4,500</p>
                                    <Button variant="link" size="sm" asChild className="h-auto p-0 text-primary">
                                        <Link to="/admin/orders/ORD-089">View</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
