"use client";

import React from "react";
import {
    Search,
    Bell,
    HelpCircle,
    User,
    Command,
    ChevronDown,
    Globe,
    Zap,
    LayoutGrid
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function Topbar() {
    const [isSearchFocused, setIsSearchFocused] = React.useState(false);
    const [activeRole, setActiveRole] = React.useState("Admin Hub");

    return (
        <header className="h-16 border-b bg-card/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
            {/* Search Bar - Simulated Command Palette */}
            <div className="flex-1 max-w-xl relative">
                <div className={cn(
                    "flex items-center gap-3 px-4 py-1.5 rounded-xl transition-all border",
                    isSearchFocused ? "bg-white border-primary shadow-lg ring-4 ring-primary/5 w-[120%]" : "bg-slate-50 border-slate-200 w-full"
                )}>
                    <Search size={18} className={cn("transition-colors", isSearchFocused ? "text-primary" : "text-slate-400")} />
                    <Input
                        placeholder="Search anything... (Cmd + K)"
                        className="border-none bg-transparent shadow-none focus-visible:ring-0 p-0 h-8"
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    <div className="flex items-center gap-1">
                        <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-sm">
                            <Command size={10} /> K
                        </kbd>
                    </div>
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
                {/* Role Switcher Demo */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 mr-4">
                    <Zap size={14} className="text-primary" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">View:</span>
                    <select
                        className="bg-transparent text-xs font-bold outline-none cursor-pointer"
                        value={activeRole}
                        onChange={(e) => setActiveRole(e.target.value)}
                    >
                        <option>Admin Hub</option>
                        <option>Sales View</option>
                        <option>Project Lead</option>
                        <option>Technical Director</option>
                    </select>
                </div>

                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="relative group">
                        <Bell size={20} className="text-slate-600 group-hover:text-primary transition-colors" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </Button>
                    <Button variant="ghost" size="icon" className="group">
                        <HelpCircle size={20} className="text-slate-600 group-hover:text-primary transition-colors" />
                    </Button>
                    <Button variant="ghost" size="icon" className="group">
                        <Globe size={20} className="text-slate-600 group-hover:text-primary transition-colors" />
                    </Button>
                </div>

                <div className="h-8 w-px bg-slate-200 mx-2"></div>

                <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-slate-900 leading-none">Alex Rivera</span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-tighter mt-1">{activeRole}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary shadow-sm group-hover:bg-primary transition-all group-hover:text-white group-hover:rotate-3">
                        AR
                    </div>
                </div>
            </div>
        </header>
    );
}
