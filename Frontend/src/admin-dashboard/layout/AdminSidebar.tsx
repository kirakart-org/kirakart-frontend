import {
    Users,
    LayoutDashboard,
    Package,
    ShoppingCart,
    BarChart3,
    Settings,
    Megaphone,
    Archive,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"

const menuItems = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        url: "/admin/products",
        icon: Package,
    },
    {
        title: "Orders",
        url: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        title: "Inventory",
        url: "/admin/inventory",
        icon: Archive,
    },
    {
        title: "Customers",
        url: "/admin/customers",
        icon: Users,
    },
    {
        title: "Marketing",
        url: "/admin/marketing",
        icon: Megaphone,
    },
    {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
    },
]

export function AdminSidebar() {
    const location = useLocation()

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Admin</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={location.pathname === item.url}
                                    >
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            {/* Automation is optional/future, not in initial list but requested. Adding it? 
                  User said: "Marketing Management", "Automation & Follow-ups". 
                  I'll combine or add Automation separately. Let's stick to the list I put in menuItems for now.
                  Actually "Automation" was in the requested Sidebar sections. I should add it.
               */}
                            <SidebarMenuItem key="Automation">
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Automation"
                                    isActive={location.pathname === "/admin/automation"}
                                >
                                    <Link to="/admin/automation">
                                        <BarChart3 className="rotate-90" /> {/* Placeholder icon */}
                                        <span>Automation</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
