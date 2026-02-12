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
    X
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Topbar() {
    const router = useRouter();
    const { user, logout, notifications, markNotificationAsRead, clearAllNotifications } = useApp();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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

    const getIcon = (type: string) => {
        switch (type) {
            case "lead": return { icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" };
            case "project": return { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" };
            default: return { icon: Shield, color: "text-slate-500", bg: "bg-slate-50" };
        }
    };

    const roles = [
        { name: "Admin Hub", icon: Shield, active: true },
        { name: "Sales Hub", icon: TrendingUp, active: false },
        { name: "Project Hub", icon: Briefcase, active: false },
    ];

    return (
        <header className="h-20 border-b border-slate-50 bg-white/80 backdrop-blur-xl sticky top-0 z-30 px-8 flex items-center justify-between transition-all">
            {/* Search Bar - Simulated Command Palette Trigger */}
            <div className="flex-1 max-w-xl relative">
                <div
                    onClick={() => setIsSearchOpen(true)}
                    className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all border group cursor-pointer",
                        "bg-slate-50 border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-lg transition-all"
                    )}
                >
                    <Search size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="text-sm text-slate-400 font-medium flex-1">Search anything...</span>
                    <div className="flex items-center gap-1">
                        <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-lg shadow-sm">
                            <Command size={10} /> K
                        </kbd>
                    </div>
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 lg:gap-6">
                {/* Role Switcher */}
                <div className="relative">
                    <div
                        onClick={() => setIsRoleOpen(!isRoleOpen)}
                        className={cn(
                            "hidden lg:flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group border border-transparent hover:border-slate-100",
                            isRoleOpen && "bg-slate-50 border-slate-100 shadow-sm"
                        )}
                    >
                        <Zap size={14} className="text-amber-500 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">View:</span>
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                            {user?.role || "Admin Hub"}
                            <ChevronDown size={12} className={cn("text-slate-400 transition-transform", isRoleOpen && "rotate-180")} />
                        </div>
                    </div>

                    <AnimatePresence>
                        {isRoleOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsRoleOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full mt-2 right-0 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 z-20"
                                >
                                    <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Select Workspace</div>
                                    <div className="space-y-1">
                                        {roles.map((role) => (
                                            <button
                                                key={role.name}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all",
                                                    (user?.role === role.name || (role.active && !user)) ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                )}
                                            >
                                                <role.icon size={16} />
                                                {role.name}
                                                {(user?.role === role.name || (role.active && !user)) && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <div className="h-8 w-px bg-slate-100/80 mx-1 hidden lg:block"></div>

                {/* Notifications */}
                <div className="relative">
                    <Button
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "relative h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all",
                            isNotificationsOpen && "bg-slate-50 text-slate-900"
                        )}
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse"></span>
                        )}
                    </Button>

                    <AnimatePresence>
                        {isNotificationsOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full mt-2 right-0 w-84 sm:w-96 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-20"
                                >
                                    <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black text-slate-900">Notifications</span>
                                            {unreadCount > 0 && (
                                                <span className="text-[10px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full shadow-sm shadow-rose-200">
                                                    {unreadCount} NEW
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={clearAllNotifications}
                                            className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-wider transition-colors"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                        {notifications.length > 0 ? (
                                            notifications.map((notif) => {
                                                const meta = getIcon(notif.type);
                                                return (
                                                    <div
                                                        key={notif.id}
                                                        onClick={() => markNotificationAsRead(notif.id)}
                                                        className={cn(
                                                            "p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 cursor-pointer group relative",
                                                            !notif.read && "bg-blue-50/30"
                                                        )}
                                                    >
                                                        {!notif.read && (
                                                            <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                                        )}
                                                        <div className="flex gap-4">
                                                            <div className={cn("p-2 rounded-xl h-fit shrink-0", meta.bg, meta.color)}>
                                                                <meta.icon size={18} />
                                                            </div>
                                                            <div className="space-y-1 flex-1">
                                                                <div className="flex justify-between items-start gap-2">
                                                                    <h5 className={cn(
                                                                        "text-xs transition-colors",
                                                                        notif.read ? "text-slate-600 font-bold" : "text-slate-900 font-black group-hover:text-primary"
                                                                    )}>
                                                                        {notif.title}
                                                                    </h5>
                                                                    <span className="text-[9px] font-bold text-slate-400 uppercase shrink-0 whitespace-nowrap">{notif.time}</span>
                                                                </div>
                                                                <p className={cn(
                                                                    "text-[11px] leading-relaxed",
                                                                    notif.read ? "text-slate-400 font-medium" : "text-slate-600 font-bold"
                                                                )}>
                                                                    {notif.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="p-12 text-center space-y-3">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                                                    <Bell size={24} className="text-slate-200" />
                                                </div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">All caught up</p>
                                            </div>
                                        )}
                                    </div>
                                    <button className="w-full py-4 bg-white border-t border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-50 hover:text-primary transition-all">
                                        View Full Audit Log
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all">
                    <HelpCircle size={20} />
                </Button>

                {/* Profile Toggle */}
                <div className="relative">
                    <div
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-4 group cursor-pointer pl-2 py-1.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                    >
                        <div className="flex flex-col items-end hidden sm:flex">
                            <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors leading-none tracking-tight">{user?.name || "Guest"}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-70">{user?.role || "Super Admin"}</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-white shadow-md flex items-center justify-center font-black text-slate-600 group-hover:scale-105 transition-all relative overflow-hidden">
                            <span className="relative z-10 text-xs">{user?.avatar || "AR"}</span>
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full mt-2 right-0 w-64 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 z-20"
                                >
                                    <div className="p-4 border-b border-slate-50 mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">{user?.avatar || "AR"}</div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-slate-900">{user?.name || "Guest"}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase truncate max-w-[140px]">{user?.email || "guest@modernys.com"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
                                            <UserIcon size={16} /> My Account
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
                                            <Settings size={16} /> Enterprise Settings
                                        </button>
                                        <div className="h-px bg-slate-50 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 transition-all"
                                        >
                                            <LogOut size={16} /> Sign Out
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Global Search Command Center */}
            <Dialog
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                className="max-w-2xl !p-0 overflow-hidden bg-white/95 backdrop-blur-2xl"
            >
                <div className="border-b border-slate-100 p-6 flex items-center gap-4">
                    <Search className="text-primary" size={24} />
                    <input
                        autoFocus
                        placeholder="Search for deals, projects, or documents..."
                        className="flex-1 bg-transparent border-none outline-none text-lg font-bold text-slate-900 placeholder:text-slate-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <kbd className="px-2 py-1 text-[10px] font-black text-slate-400 bg-slate-50 border border-slate-100 rounded-lg">ESC</kbd>
                </div>

                <div className="p-4 max-h-[480px] overflow-y-auto">
                    {searchQuery.length === 0 ? (
                        <div className="space-y-6 p-4">
                            <div>
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Quick Links</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <SearchResult icon={TrendingUp} label="Open Sales Pipeline" shortcut="G then P" />
                                    <SearchResult icon={Briefcase} label="Active Projects" shortcut="G then C" />
                                    <SearchResult icon={MessageSquare} label="Recent Conversations" shortcut="G then M" />
                                    <SearchResult icon={Settings} label="System Config" shortcut="G then S" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">History</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-primary transition-colors cursor-pointer p-2 rounded-xl hover:bg-slate-50">
                                        <Clock size={16} className="text-slate-300" />
                                        <span>Project: Oasis Modernization Phase 2</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-primary transition-colors cursor-pointer p-2 rounded-xl hover:bg-slate-50">
                                        <Clock size={16} className="text-slate-300" />
                                        <span>Client Audit: Horizon Properties Group</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center space-y-4">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                                <Search size={24} className="text-slate-300" />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 uppercase tracking-tighter text-xl italic">No results for <span className="text-primary">"{searchQuery}"</span></h4>
                                <p className="text-sm text-slate-500 font-bold mt-2">Try searching for a client name or project ID.</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <kbd className="px-1.5 py-0.5 text-[9px] font-black bg-white border border-slate-200 rounded shadow-sm text-slate-500">↑↓</kbd>
                            <span className="text-[9px] font-black uppercase text-slate-400">Navigate</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <kbd className="px-1.5 py-0.5 text-[9px] font-black bg-white border border-slate-200 rounded shadow-sm text-slate-500">ENTER</kbd>
                            <span className="text-[9px] font-black uppercase text-slate-400">Select</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-primary opacity-60">
                        <Zap size={10} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Powered by NexAI</span>
                    </div>
                </div>
            </Dialog>
        </header>
    );
}

function SearchResult({ icon: Icon, label, shortcut }: { icon: any, label: string, shortcut: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-primary/20 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white border border-slate-100 text-slate-400 group-hover:text-primary transition-colors">
                    <Icon size={16} />
                </div>
                <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{label}</span>
            </div>
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{shortcut}</span>
        </div>
    );
}
