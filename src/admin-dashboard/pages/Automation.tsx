import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { PlayCircle } from "lucide-react"

export default function Automation() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Automation</h1>
                <p className="text-muted-foreground">
                    Configure automated messages and follow-ups.
                </p>
            </div>

            <div className="grid gap-4">
                <AutomationCard
                    title="Order Confirmation"
                    description="Send a WhatsApp message immediately after an order is placed."
                    defaultActive={true}
                />
                <AutomationCard
                    title="Shipping Update"
                    description="Notify customer when order is marked as shipped."
                    defaultActive={true}
                />
                <AutomationCard
                    title="Delivery Confirmation"
                    description="Send a thank you message upon delivery."
                    defaultActive={true}
                />
                <AutomationCard
                    title="Review Request"
                    description="Ask for a review 3 days after delivery."
                    defaultActive={false}
                />
            </div>
        </div>
    )
}

function AutomationCard({ title, description, defaultActive }: { title: string, description: string, defaultActive: boolean }) {
    return (
        <Card>
            <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                    <h4 className="font-semibold text-base">{title}</h4>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                        <PlayCircle className="mr-2 h-4 w-4" /> Preview Message
                    </Button>
                    <Switch defaultChecked={defaultActive} />
                </div>
            </CardContent>
        </Card>
    )
}
