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
    Shield,
    User
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

const menuItems = [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard", roles: ["Admin", "MKT", "Sales", "BO", "Supervisor"] },
    { icon: Users, label: "Base Prospects", href: "/clients", roles: ["Admin", "MKT", "Sales", "Supervisor"] },
    { icon: Briefcase, label: "Portefeuille Clients", href: "/management/clients", roles: ["Admin", "BO", "Supervisor", "Sales"] },
    { icon: Briefcase, label: "Pipeline Ventes", href: "/sales", roles: ["Admin", "Sales", "Supervisor"] },
    { icon: Layers, label: "Hub Construction", href: "/construction", roles: ["Admin", "Construction", "Supervisor"] },
    { icon: ShieldCheck, label: "CAO & Technique", href: "/cad", roles: ["Admin", "CAD", "Supervisor"] },
    { icon: MessageSquare, label: "Communications", href: "/communication", roles: ["Admin", "Sales", "MKT"] },
    { icon: FileText, label: "Documents", href: "/documents", roles: ["Admin", "BO", "Legal"] },
    { icon: MessageSquare, label: "Tickets BO", href: "/tickets", roles: ["Admin", "BO", "Supervisor"] },
    { icon: BarChart3, label: "Reporting Global", href: "/reporting", roles: ["Admin", "Supervisor"] },
];

const adminItems = [
    { icon: User, label: "Gestion Agents", href: "/admin/agents" },
    { icon: Settings, label: "Paramétrage Motifs", href: "/admin/motifs" },
];

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { logout, user } = useApp();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-slate-200/50 bg-white flex flex-col",
                collapsed ? "w-20" : "w-72"
            )}
        >
            <div className="flex h-20 items-center justify-between px-6 border-b border-slate-100 relative">
                {!collapsed && (
                    <div className="flex items-center gap-3">
                        <img
                            src="https://modernys.immo/logo-white.png"
                            alt="NexCare"
                            className="w-36"
                        />
                    </div>
                )}
                <button
                    onClick={() => onCollapse(!collapsed)}
                    className={cn(
                        "absolute -right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-slate-200 shadow-lg text-slate-400 hover:text-primary transition-all z-50",
                        collapsed && "right-1/2 translate-x-1/2"
                    )}
                >
                    {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto mt-8 px-4 space-y-1.5 scrollbar-hide">
                <div className="px-3 mb-4">
                    {!collapsed && <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 opacity-80">Plateforme</p>}
                </div>
                {menuItems.filter(item => !item.roles || item.roles.includes(user?.role || "")).map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
                                isActive
                                    ? "bg-primary/5 text-primary font-bold"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
                            )}
                        >
                            <item.icon size={17} className={cn("transition-all duration-300", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} strokeWidth={isActive ? 2 : 1.5} />

                            {!collapsed && (
                                <span className="truncate text-[10px] font-semibold uppercase tracking-wider">
                                    {item.label}
                                </span>
                            )}

                            {isActive && !collapsed && (
                                <div className="ml-auto w-1 h-4 rounded-full bg-primary shadow-sm shadow-primary/40" />
                            )}
                        </Link>
                    );
                })}

                {user?.role === "Admin" && (
                    <>
                        <div className="px-3 mb-4 mt-8">
                            {!collapsed && <p className="text-[9px] font-bold uppercase tracking-wider text-primary/70">Administration</p>}
                        </div>
                        {adminItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
                                        isActive
                                            ? "bg-primary/5 text-primary font-bold"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
                                    )}
                                >
                                    <item.icon size={17} className={cn("transition-all duration-300", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} strokeWidth={isActive ? 2 : 1.5} />

                                    {!collapsed && (
                                        <span className="truncate text-[10px] font-semibold uppercase tracking-wider">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </>
                )}
            </nav>

            <div className="mt-auto border-t border-slate-100 p-4 space-y-1.5 pb-8">
                <div className="px-3 mb-3">
                    {!collapsed && <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 opacity-80">Espace Privé</p>}
                </div>
                <Link
                    href="/settings"
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium group"
                    )}
                >
                    <Settings size={17} className="text-slate-400 group-hover:rotate-90 group-hover:text-slate-900 transition-all" strokeWidth={1.5} />
                    {!collapsed && <span className="text-[10px] font-semibold uppercase tracking-wider">Compte & Sécurité</span>}
                </Link>
                <button
                    onClick={handleLogout}
                    className={cn(
                        "flex w-full items-center gap-3 px-4 py-3 rounded-xl text-rose-500/80 hover:bg-rose-500/5 hover:text-rose-500 transition-all font-semibold group"
                    )}
                >
                    <LogOut size={17} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
                    {!collapsed && <span className="text-[10px] font-semibold uppercase tracking-wider">Déconnexion</span>}
                </button>
            </div>
        </aside>
    );
}
