import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import {
    GridIcon,
    ProductsIcon,
    OrdersIcon,
    InventoryIcon,
    CustomersIcon,
    MarketingIcon,
    SettingsIcon,
    AutomationIcon,
    ChevronDownIcon
} from "../icons";

type NavItem = {
    name: string;
    icon: React.ElementType; // Changed from ReactNode to ElementType for Lucide icons
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
    {
        icon: GridIcon,
        name: "Dashboard",
        path: "/admin",
    },
    {
        icon: ProductsIcon,
        name: "Products",
        subItems: [
            { name: "All Products", path: "/admin/products" },
            { name: "Add Product", path: "/admin/products/new" },
        ]
    },
    {
        icon: OrdersIcon,
        name: "Orders",
        path: "/admin/orders",
    },
    {
        icon: InventoryIcon,
        name: "Inventory",
        path: "/admin/inventory",
    },
    {
        icon: CustomersIcon,
        name: "Customers",
        path: "/admin/customers",
    },
    {
        icon: MarketingIcon,
        name: "Marketing",
        path: "/admin/marketing",
    },
    {
        icon: AutomationIcon,
        name: "Automation",
        path: "/admin/automation",
    },
    {
        icon: SettingsIcon,
        name: "Settings",
        path: "/admin/settings",
    },
];

const AppSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();

    const [openSubmenu, setOpenSubmenu] = useState<{
        index: number;
    } | null>(null);

    // Simple active check
    const isActive = (path: string) => {
        if (path === "/admin") return location.pathname === "/admin";
        return location.pathname.startsWith(path);
    };

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenu((prev) => {
            if (prev && prev.index === index) {
                return null;
            }
            return { index };
        });
    };

    useEffect(() => {
        // Auto open submenu if child is active
        navItems.forEach((nav, index) => {
            if (nav.subItems) {
                nav.subItems.forEach(sub => {
                    if (isActive(sub.path)) {
                        setOpenSubmenu({ index });
                    }
                })
            }
        })
    }, [location.pathname]);

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
                    ? "w-[290px]"
                    : isHovered
                        ? "w-[290px]"
                        : "w-[90px]"
                }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                    }`}
            >
                <Link to="/admin">
                    {isExpanded || isHovered || isMobileOpen ? (
                        <h1 className="text-2xl font-bold text-brand-500 whitespace-nowrap px-4">Kira Cart</h1>
                    ) : (
                        <h1 className="text-2xl font-bold text-brand-500">KC</h1>
                    )}
                </Link>
            </div>

            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <ul className="flex flex-col gap-4">
                            {navItems.map((nav, index) => (
                                <li key={nav.name}>
                                    {nav.subItems ? (
                                        <button
                                            onClick={() => handleSubmenuToggle(index)}
                                            className={`menu-item group ${openSubmenu?.index === index
                                                ? "menu-item-active"
                                                : "menu-item-inactive"
                                                } cursor-pointer ${!isExpanded && !isHovered
                                                    ? "lg:justify-center"
                                                    : "lg:justify-start"
                                                }`}
                                        >
                                            <span
                                                className={`menu-item-icon-size  ${openSubmenu?.index === index
                                                    ? "menu-item-icon-active"
                                                    : "menu-item-icon-inactive"
                                                    }`}
                                            >
                                                <nav.icon className="h-6 w-6" />
                                            </span>
                                            {(isExpanded || isHovered || isMobileOpen) && (
                                                <span className="menu-item-text whitespace-nowrap">{nav.name}</span>
                                            )}
                                            {(isExpanded || isHovered || isMobileOpen) && (
                                                <ChevronDownIcon
                                                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.index === index
                                                        ? "rotate-180 text-brand-500"
                                                        : ""
                                                        }`}
                                                />
                                            )}
                                        </button>
                                    ) : (
                                        nav.path && (
                                            <Link
                                                to={nav.path}
                                                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                                                    }`}
                                            >
                                                <span
                                                    className={`menu-item-icon-size ${isActive(nav.path)
                                                        ? "menu-item-icon-active"
                                                        : "menu-item-icon-inactive"
                                                        }`}
                                                >
                                                    <nav.icon className="h-6 w-6" />
                                                </span>
                                                {(isExpanded || isHovered || isMobileOpen) && (
                                                    <span className="menu-item-text">{nav.name}</span>
                                                )}
                                            </Link>
                                        )
                                    )}
                                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${openSubmenu?.index === index ? 'max-h-96' : 'max-h-0'}`}
                                        >
                                            <ul className="mt-2 space-y-1 ml-9">
                                                {nav.subItems.map((subItem) => (
                                                    <li key={subItem.name}>
                                                        <Link
                                                            to={subItem.path}
                                                            className={`menu-dropdown-item ${isActive(subItem.path)
                                                                ? "menu-dropdown-item-active"
                                                                : "menu-dropdown-item-inactive"
                                                                }`}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
