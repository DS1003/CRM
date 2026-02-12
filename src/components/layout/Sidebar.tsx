"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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

import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

const menuItems = [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard" },
    { icon: Users, label: "Clients & Prospects", href: "/clients" },
    { icon: Briefcase, label: "Pipeline Ventes", href: "/sales" },
    { icon: Layers, label: "Hub Construction", href: "/construction" },
    { icon: ShieldCheck, label: "CAO & Technique", href: "/cad" },
    { icon: MessageSquare, label: "Communications", href: "/communication" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: LayoutDashboard, label: "Tickets & SAV", href: "/tickets" },
    { icon: BarChart3, label: "Rapports", href: "/reporting" },
];

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useApp();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-slate-200/50 bg-white/70 backdrop-blur-md flex flex-col",
                collapsed ? "w-20" : "w-72"
            )}
        >
            <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100/50 relative">
                {!collapsed && (
                    <div className="flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-500">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-serif font-bold text-lg italic tracking-tighter">
                            M
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm tracking-tight leading-none text-slate-900 uppercase">MODERNYS</span>
                            <span className="text-[0.55rem] tracking-[0.1em] text-primary font-bold uppercase mt-0.5">Enterprise</span>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => onCollapse(!collapsed)}
                    className={cn(
                        "absolute -right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-400 hover:text-primary transition-all z-50",
                        collapsed && "right-1/2 translate-x-1/2"
                    )}
                >
                    {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto mt-6 px-4 space-y-1 scrollbar-hide">
                <div className="px-2 mb-3">
                    {!collapsed && <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Menu Principal</p>}
                </div>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all group relative",
                                isActive
                                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 font-semibold"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
                            )}
                        >
                            <item.icon size={18} className={cn("transition-all duration-300", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-900")} strokeWidth={isActive ? 2.5 : 2} />

                            {!collapsed && (
                                <span className="truncate text-xs animate-in slide-in-from-left-2 duration-300">
                                    {item.label}
                                </span>
                            )}

                            {isActive && !collapsed && (
                                <div className="ml-auto w-1 h-1 rounded-full bg-primary" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto border-t border-slate-100/50 p-4 space-y-1 pb-6">
                <div className="px-2 mb-2">
                    {!collapsed && <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Système</p>}
                </div>
                <Link
                    href="/settings"
                    className={cn(
                        "flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
                    )}
                >
                    <Settings size={18} className="text-slate-400 group-hover:rotate-45 transition-transform" strokeWidth={2} />
                    {!collapsed && <span className="text-xs">Paramètres</span>}
                </Link>
                <button
                    onClick={handleLogout}
                    className={cn(
                        "flex w-full items-center gap-3 px-3.5 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-all font-semibold group"
                    )}
                >
                    <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                    {!collapsed && <span className="text-xs">Déconnexion</span>}
                </button>
            </div>
        </aside>
    );
}
