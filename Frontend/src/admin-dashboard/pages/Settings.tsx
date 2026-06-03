import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function Settings() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your store preferences.
                </p>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Store Details</CardTitle>
                            <CardDescription>
                                Basic information about your store visible to your customers.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="storeName">Store Name</Label>
                                <Input id="storeName" defaultValue="Silk Serenity" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="storeEmail">Contact Email</Label>
                                <Input id="storeEmail" defaultValue="support@silkserenity.com" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="returnPolicy">Return Policy Text</Label>
                                <Textarea id="returnPolicy" className="min-h-[100px]" defaultValue="We offer a 7-day return policy for all unused items..." />
                            </div>
                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="payment">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Methods</CardTitle>
                            <CardDescription>Configure how you accept payments.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between border p-4 rounded-md">
                                <div>
                                    <p className="font-medium">Cash on Delivery (COD)</p>
                                    <p className="text-sm text-muted-foreground">Enable COD for local orders</p>
                                </div>
                                <Button variant="outline">Enabled</Button>
                            </div>
                            <div className="flex items-center justify-between border p-4 rounded-md">
                                <div>
                                    <p className="font-medium">Razorpay / Stripe</p>
                                    <p className="text-sm text-muted-foreground">Accept cards and UPI</p>
                                </div>
                                <Button variant="outline">Configure</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="shipping">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Zones</CardTitle>
                            <CardDescription>Manage shipping rates and zones.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between border p-4 rounded-md">
                                <div>
                                    <p className="font-medium">Domestic (India)</p>
                                    <p className="text-sm text-muted-foreground">Flat rate: ₹100</p>
                                </div>
                                <Button variant="outline">Edit</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
