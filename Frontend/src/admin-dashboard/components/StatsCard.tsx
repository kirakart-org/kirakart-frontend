import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
    title: string
    value: string
    description?: string
    icon?: React.ElementType
    alert?: boolean
}

export function StatsCard({ title, value, description, icon: Icon, alert }: StatsCardProps) {
    return (
        <div className={cn(
            "rounded-2xl border bg-white p-5 dark:bg-white/[0.03] md:p-6",
            alert ? "border-red-200 bg-red-50 dark:bg-red-900/10" : "border-gray-200 dark:border-gray-800"
        )}>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-4">
                {Icon && <Icon className={`h-6 w-6 text-gray-800 dark:text-white/90 ${alert ? "text-red-500" : ""}`} />}
            </div>

            <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {title}
                </span>
                <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                    {value}
                </h4>
                {description && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}
