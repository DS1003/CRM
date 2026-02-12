"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
    Search,
    Bell,
    HelpCircle,
    Command,
    Zap,
    ChevronDown,
    LogOut,
    User as UserIcon,
    Settings,
    Shield,
    TrendingUp,
    Briefcase,
    MessageSquare,
    CheckCircle2,
    Clock,
    X,
    Layout,
    Building,
    ArrowUpRight,
    BarChart3
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Topbar() {
    const router = useRouter();
    const {
        user,
        logout,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        updateRole,
        clients,
        projects,
        leads,
        tickets
    } = useApp();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Search Logic
    const filteredResults = searchQuery.length > 1 ? [
        ...clients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(c => ({ ...c, type: 'Client', href: `/clients/${c.id}` })),
        ...projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => ({ ...p, type: 'Projet', href: `/construction/${p.id}` })),
        ...leads.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase())).map(l => ({ ...l, type: 'Opportunité', href: `/sales` })),
        ...tickets.filter(t => t.subject.toLowerCase().includes(searchQuery.toLowerCase())).map(t => ({ ...t, type: 'Ticket', href: `/tickets` })),
    ].slice(0, 8) : [];

    const unreadCount = notifications.filter(n => !n.read).length;

    // Keyboard shortcut Cmd/Ctrl + K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const getIconMeta = (type: string) => {
        switch (type) {
            case "lead": return { icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50/50" };
            case "project": return { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50/50" };
            default: return { icon: Shield, color: "text-slate-400", bg: "bg-slate-50/50" };
        }
    };

    const roles = [
        { name: "Admin", icon: Shield, id: "admin" },
        { name: "Ventes", icon: TrendingUp, id: "sales" },
        { name: "Chef de projet", icon: Briefcase, id: "project" },
        { name: "BO", icon: Layout, id: "bo" },
        { name: "Serv Tech", icon: Zap, id: "serv_tech" },
    ];

    return (
        <header className="h-20 border-b border-slate-200/50 bg-white sticky top-0 z-30 px-8 flex items-center justify-between transition-all">
            {/* Search Section - Anchored Dropdown */}
            <div className="flex-1 max-w-xl relative group">
                <div className={cn(
                    "flex items-center gap-4 px-5 py-2.5 w-full rounded-2xl bg-slate-50 border border-slate-200/60 transition-all duration-500",
                    isSearchOpen
                        ? "bg-white border-primary/40 shadow-xl shadow-primary/5 ring-4 ring-primary/5"
                        : "text-slate-500 hover:bg-slate-100/50 hover:border-slate-300"
                )}>
                    <Search size={18} className={cn("transition-colors duration-500", isSearchOpen ? "text-primary" : "group-hover:text-primary")} strokeWidth={2.5} />
                    <input
                        placeholder="Rechercher clients, projets, flux..."
                        className="bg-transparent border-none outline-none text-sm font-medium w-full text-slate-900 placeholder:text-slate-400"
                        onFocus={() => setIsSearchOpen(true)}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {!isSearchOpen && (
                        <div className="ml-auto flex items-center gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
                            <kbd className="text-[9px] font-bold px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 tracking-tighter">CMD</kbd>
                            <kbd className="text-[9px] font-bold px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-500">K</kbd>
                        </div>
                    )}
                    {isSearchOpen && (
                        <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className="ml-auto p-1.5 hover:bg-white/10 rounded-full transition-colors">
                            <X size={16} className="text-slate-400" />
                        </button>
                    )}
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsSearchOpen(false)} />
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/50 z-40 overflow-hidden"
                            >
                                <div className="p-3 max-h-[450px] overflow-y-auto thin-scrollbar">
                                    {searchQuery.length === 0 ? (
                                        <div className="space-y-4 p-2">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Actions Rapides</div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <QuickAction icon={TrendingUp} label="Ventes" shortcut="S" onClick={() => { router.push("/sales"); updateRole("Ventes"); setIsSearchOpen(false); }} />
                                                <QuickAction icon={Briefcase} label="Projets" shortcut="P" onClick={() => { router.push("/construction"); updateRole("Chef de projet"); setIsSearchOpen(false); }} />
                                                <QuickAction icon={Layout} label="Tableau" shortcut="D" onClick={() => { router.push("/dashboard"); setIsSearchOpen(false); }} />
                                                <QuickAction icon={BarChart3} label="IA" shortcut="R" onClick={() => { router.push("/reporting"); setIsSearchOpen(false); }} />
                                            </div>
                                        </div>
                                    ) : searchQuery.length > 1 && filteredResults.length > 0 ? (
                                        <div className="space-y-1">
                                            {filteredResults.map((res: any, idx) => (
                                                <button
                                                    key={`${res.type}-${idx}`}
                                                    onClick={() => {
                                                        router.push(res.href);
                                                        setIsSearchOpen(false);
                                                        setSearchQuery("");
                                                    }}
                                                    className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all text-left group"
                                                >
                                                    <div className="w-10 h-10 rounded-lg bg-slate-50/50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                                                        {res.type === 'Client' && <Building size={18} />}
                                                        {res.type === 'Projet' && <Briefcase size={18} />}
                                                        {res.type === 'Opportunité' && <TrendingUp size={18} />}
                                                        {res.type === 'Ticket' && <MessageSquare size={18} />}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-slate-900 truncate">{(res.name || res.title || res.subject)}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{res.type}</p>
                                                    </div>
                                                    <ArrowUpRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all mr-2" />
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-12 text-center text-slate-400 space-y-3">
                                            <Search size={40} className="mx-auto opacity-10" />
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-slate-500 italic">Aucun résultat pour "{searchQuery}"</p>
                                                <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Essayez de rechercher un client ou un projet</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-slate-50/50 p-3 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3 opacity-50">
                                        <div className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 text-[9px] font-bold bg-white border border-slate-200 rounded text-slate-400">⏎</kbd>
                                            <span className="text-[9px] font-bold uppercase tracking-tight">Sélectionner</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 text-[9px] font-bold bg-white border border-slate-200 rounded text-slate-400">↑↓</kbd>
                                            <span className="text-[9px] font-bold uppercase tracking-tight">Naviguer</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Right Side - Refined Actions */}
            <div className="flex items-center gap-3">
                {/* Role Switcher - Slimmer */}
                <div className="relative">
                    <button
                        onClick={() => setIsRoleOpen(!isRoleOpen)}
                        className={cn(
                            "hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all border border-transparent",
                            isRoleOpen && "bg-slate-50 border-slate-200/50"
                        )}
                    >
                        <Layout size={14} className="text-slate-400" />
                        <span>{user?.role || "Sélecteur de Hub"}</span>
                        <ChevronDown size={12} className={cn("transition-transform duration-200", isRoleOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                        {isRoleOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsRoleOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                    className="absolute top-full mt-2 right-0 w-52 bg-white border border-slate-200/60 rounded-xl shadow-xl shadow-slate-200/20 p-1.5 z-20"
                                >
                                    <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Espace de travail</div>
                                    <div className="space-y-0.5">
                                        {roles.map((r) => (
                                            <button
                                                key={r.id}
                                                onClick={() => {
                                                    updateRole(r.name);
                                                    setIsRoleOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left",
                                                    user?.role === r.name ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                )}
                                            >
                                                <r.icon size={14} className={user?.role === r.name ? "text-primary" : "text-slate-400"} />
                                                {r.name}
                                                {user?.role === r.name && <div className="ml-auto w-1 h-1 rounded-full bg-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <div className="w-px h-6 bg-slate-200/50 mx-1 hidden md:block" />

                {/* Notification Bell - Clean */}
                <div className="relative">
                    <button
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className={cn(
                            "p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all relative",
                            isNotificationsOpen && "text-slate-900 bg-slate-50"
                        )}
                    >
                        <Bell size={18} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-white" />
                        )}
                    </button>

                    <AnimatePresence>
                        {isNotificationsOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                    className="absolute top-full mt-2 right-0 w-80 bg-white border border-slate-200/60 rounded-xl shadow-2xl shadow-slate-200/40 z-20 overflow-hidden"
                                >
                                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                                        <span className="text-xs font-bold text-slate-900">Notifications</span>
                                        <button
                                            onClick={clearAllNotifications}
                                            className="text-[10px] font-semibold text-slate-400 hover:text-primary transition-colors"
                                        >
                                            Effacer
                                        </button>
                                    </div>
                                    <div className="max-h-80 overflow-y-auto thin-scrollbar">
                                        {notifications.length > 0 ? (
                                            notifications.map((n) => {
                                                const meta = getIconMeta(n.type);
                                                return (
                                                    <div
                                                        key={n.id}
                                                        onClick={() => markNotificationAsRead(n.id)}
                                                        className={cn(
                                                            "p-4 border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer group flex gap-3",
                                                            !n.read && "bg-blue-50/20"
                                                        )}
                                                    >
                                                        <div className={cn("p-2 rounded-lg h-fit", meta.bg, meta.color)}>
                                                            <meta.icon size={14} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-center mb-0.5">
                                                                <h4 className={cn("text-[11px] truncate", n.read ? "text-slate-600 font-medium" : "text-slate-900 font-bold")}>
                                                                    {n.title}
                                                                </h4>
                                                                <span className="text-[9px] text-slate-400 font-medium">{n.time}</span>
                                                            </div>
                                                            <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                                                                {n.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="py-12 text-center text-slate-400 bg-white">
                                                <Bell size={24} className="mx-auto mb-2 opacity-10" />
                                                <p className="text-[10px] font-medium italic">Aucun nouveau signal</p>
                                            </div>
                                        )}
                                    </div>
                                    <button className="w-full py-2.5 text-[10px] font-bold text-slate-400 hover:text-primary hover:bg-slate-50 border-t border-slate-100 transition-all uppercase tracking-widest">
                                        Tableau de bord
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* Profile Toggle - Refined */}
                <div className="relative ml-1">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 p-1 pl-2 rounded-full border border-slate-200/60 hover:border-slate-300 hover:bg-white transition-all group"
                    >
                        <div className="flex flex-col items-end pr-1 hidden sm:flex">
                            <span className="text-[11px] font-bold text-slate-900 leading-tight">{user?.name}</span>
                            <span className="text-[9px] font-medium text-slate-400">{user?.email}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
                            {user?.avatar || "AR"}
                        </div>
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                    className="absolute top-full mt-2 right-0 w-56 bg-white border border-slate-200/60 rounded-xl shadow-2xl shadow-slate-200/40 p-1.5 z-20"
                                >
                                    <div className="p-2.5 mb-1.5 flex items-center gap-3 bg-slate-50/50 rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                                            {user?.avatar}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[11px] font-bold text-slate-900 truncate">{user?.name}</span>
                                            <span className="text-[9px] text-slate-400 font-medium truncate">{user?.role}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-0.5">
                                        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
                                            <UserIcon size={14} className="text-slate-400" /> Mon profil
                                        </button>
                                        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
                                            <Settings size={14} className="text-slate-400" /> Paramètres
                                        </button>
                                        <div className="h-px bg-slate-100 my-1.5 mx-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-50 transition-all"
                                        >
                                            <LogOut size={14} /> Déconnexion
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}

function QuickAction({ icon: Icon, label, shortcut, onClick }: { icon: any, label: string, shortcut: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-primary/5 hover:shadow-sm transition-all group w-full"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white border border-slate-200/60 text-slate-400 group-hover:text-primary transition-colors shadow-sm">
                    <Icon size={14} />
                </div>
                <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900">{label}</span>
            </div>
            <span className="text-[9px] font-bold text-slate-300 group-hover:text-primary/40 uppercase tracking-tighter">{shortcut}</span>
        </button>
    );
}
