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
                "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-slate-100/50 bg-white/80 backdrop-blur-2xl flex flex-col shadow-[1px_0_20px_-10px_rgba(0,0,0,0.02)]",
                collapsed ? "w-20" : "w-72"
            )}
        >
            <div className="flex h-20 items-center justify-between px-6 border-b border-slate-50 relative">
                {!collapsed && (
                    <div className="flex items-center gap-3 animate-in fade-in zoom-in-95 duration-500">
                        <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center shadow-xl shadow-slate-900/20 text-white font-serif font-black text-2xl italic tracking-tighter relative overflow-hidden group/logo">
                            <span className="relative z-10">M</span>
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover/logo:translate-x-full transition-transform duration-700" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-lg tracking-tighter leading-none text-slate-900 uppercase">MODERNYS</span>
                            <span className="text-[0.6rem] tracking-[0.2em] text-primary font-black uppercase mt-1">Enterprise CRM</span>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => onCollapse(!collapsed)}
                    className={cn(
                        "absolute -right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-slate-100 shadow-md text-slate-400 hover:text-primary hover:border-primary/20 transition-all z-50 hover:scale-110",
                        collapsed && "right-1/2 translate-x-1/2"
                    )}
                >
                    {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto mt-6 px-4 space-y-2 scrollbar-hide">
                <div className="px-2 mb-4">
                    {!collapsed && <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-60">Main Menu</p>}
                </div>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all group relative overflow-hidden",
                                isActive
                                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20 font-bold"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-bold"
                            )}
                        >
                            {/* Shine effect for active item */}
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                            )}

                            <item.icon size={20} className={cn("transition-all duration-300", isActive ? "text-primary scale-110" : "text-slate-400 group-hover:text-slate-900 group-hover:scale-110")} strokeWidth={isActive ? 2.5 : 2} />

                            {!collapsed && (
                                <span className={cn("truncate animate-in slide-in-from-left-2 duration-300 relative z-10", isActive && "text-white")}>
                                    {item.label}
                                </span>
                            )}

                            {isActive && !collapsed && (
                                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(59,130,246,0.8)] z-10"></div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto border-t border-slate-50 p-4 space-y-2 pb-8">
                <div className="px-2 mb-2">
                    {!collapsed && <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-60">System</p>}
                </div>
                <Link
                    href="/settings"
                    className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all group relative overflow-hidden text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-bold"
                    )}
                >
                    <Settings size={20} className="text-slate-400 group-hover:text-slate-900 transition-all group-hover:rotate-45" strokeWidth={2} />
                    {!collapsed && <span className="animate-in slide-in-from-left-2 duration-300">Settings</span>}
                </Link>
                <button
                    className={cn(
                        "flex w-full items-center gap-3 px-4 py-2.5 rounded-2xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold group"
                    )}
                >
                    <LogOut size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                    {!collapsed && <span className="animate-in slide-in-from-left-2 duration-300">Logout</span>}
                </button>
            </div>
        </aside>
    );
}
