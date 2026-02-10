"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Layers,
    MessageSquare,
    FileText,
    BarChart3,
    Settings,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    LogOut,
} from "lucide-react";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Clients & Leads", href: "/clients" },
    { icon: Briefcase, label: "Sales Pipeline", href: "/sales" },
    { icon: Layers, label: "Construction Hub", href: "/construction" },
    { icon: ShieldCheck, label: "CAD & Technical", href: "/cad" },
    { icon: MessageSquare, label: "Communication", href: "/communication" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: BarChart3, label: "Reporting", href: "/reporting" },
];

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out border-r bg-card flex flex-col",
                collapsed ? "w-20" : "w-64"
            )}
        >
            <div className="flex h-16 items-center justify-between px-6 border-b">
                {!collapsed && (
                    <div className="flex items-center gap-2 animate-in fade-in duration-300">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-white font-bold">C</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight">NexCRM</span>
                    </div>
                )}
                <button
                    onClick={() => onCollapse(!collapsed)}
                    className={cn("p-1.5 rounded-lg hover:bg-accent transition-colors", collapsed && "mx-auto")}
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto mt-6 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                        >
                            <item.icon size={20} className={cn(isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
                            {!collapsed && <span className="font-medium animate-in slide-in-from-left-2 duration-300">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto border-t p-4 space-y-1">
                <Link
                    href="/settings"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    )}
                >
                    <Settings size={20} />
                    {!collapsed && <span className="font-medium">Settings</span>}
                </Link>
                <button
                    className={cn(
                        "flex w-full items-center gap-3 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                    )}
                >
                    <LogOut size={20} />
                    {!collapsed && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </aside>
    );
}
