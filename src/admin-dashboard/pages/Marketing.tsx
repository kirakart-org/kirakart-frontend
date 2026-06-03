import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2 } from "lucide-react"

export default function Marketing() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Marketing</h1>
                <p className="text-muted-foreground">
                    Manage coupons and store banners.
                </p>
            </div>

            <Tabs defaultValue="coupons" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="coupons">Coupons</TabsTrigger>
                    <TabsTrigger value="banners">Banners</TabsTrigger>
                </TabsList>

                <TabsContent value="coupons" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Active Coupons</CardTitle>
                                <CardDescription>Manage discount codes for your customers.</CardDescription>
                            </div>
                            <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Create Coupon</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Coupon Item */}
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <h4 className="font-bold">WELCOME20</h4>
                                        <p className="text-sm text-muted-foreground">20% off on first order</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Active</span>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                {/* Coupon Item */}
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <h4 className="font-bold">FESTIVE10</h4>
                                        <p className="text-sm text-muted-foreground">Flat ₹500 off on orders above ₹5000</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-muted-foreground bg-gray-100 px-2 py-1 rounded">Expired</span>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="banners" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Homepage Banners</CardTitle>
                            <CardDescription>Update the main banners on your store.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="border rounded-lg p-4 space-y-4">
                                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                                        <p className="text-muted-foreground">Banner Preview 1</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Hero Banner Information</Label>
                                        <Input defaultValue="New Collection 2024" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="banner-1" defaultChecked />
                                        <Label htmlFor="banner-1">Visible</Label>
                                    </div>
                                </div>
                                <div className="border rounded-lg p-4 space-y-4">
                                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                                        <p className="text-muted-foreground">Banner Preview 2</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Secondary Banner Information</Label>
                                        <Input defaultValue="Wedding Season Sale" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="banner-2" />
                                        <Label htmlFor="banner-2">Visible</Label>
                                    </div>
                                </div>
                            </div>
                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
