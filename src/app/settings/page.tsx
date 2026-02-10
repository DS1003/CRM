"use client";

import React from "react";
import {
    User,
    Settings,
    Bell,
    Lock,
    Globe,
    Palette,
    ShieldCheck,
    CreditCard,
    LogOut,
    ChevronRight,
    Database
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [activeSection, setActiveSection] = React.useState("Profile");

    const sections = [
        { id: "Profile", icon: User, label: "My Profile" },
        { id: "Account", icon: Lock, label: "Account Security" },
        { id: "Notifications", icon: Bell, label: "Notifications" },
        { id: "Preferences", icon: Palette, label: "Display & Theme" },
        { id: "Integrations", icon: Globe, label: "Integrations & API" },
        { id: "Billing", icon: CreditCard, label: "Billing & Plans" },
        { id: "Data", icon: Database, label: "Data Management" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings & Workspace</h1>
                <p className="text-muted-foreground mt-1">Manage your enterprise environment and security parameters.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="border-slate-200">
                        <CardContent className="p-2 space-y-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-3 rounded-xl transition-all text-sm group",
                                        activeSection === section.id
                                            ? "bg-primary text-white shadow-md shadow-primary/20"
                                            : "text-slate-600 hover:bg-slate-50"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <section.icon size={18} />
                                        <span className="font-semibold">{section.label}</span>
                                    </div>
                                    {activeSection !== section.id && <ChevronRight size={14} className="text-slate-300 group-hover:text-primary transition-transform group-hover:translate-x-0.5" />}
                                </button>
                            ))}
                            <div className="pt-2 mt-2 border-t border-slate-100">
                                <button className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all text-sm font-semibold">
                                    <LogOut size={18} />
                                    Sign Out
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Section Content */}
                <div className="lg:col-span-3">
                    <Card className="border-slate-200 shadow-sm min-h-[600px]">
                        <CardHeader className="border-b border-slate-50 pb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">{activeSection}</CardTitle>
                                    <CardDescription className="mt-1">
                                        Configure your {activeSection.toLowerCase()} settings and preferences.
                                    </CardDescription>
                                </div>
                                <Button className="h-9 px-6 bg-slate-900">Save Changes</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            {activeSection === "Profile" && (
                                <div className="space-y-10">
                                    <div className="flex items-center gap-8">
                                        <div className="relative group">
                                            <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
                                                <img src="https://i.pravatar.cc/150?u=1" alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all">
                                                <Palette size={14} />
                                            </button>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold">Alex Rivera</h4>
                                            <p className="text-sm text-slate-400">Super Administrator • Full Access Hub</p>
                                            <div className="flex gap-2 mt-3">
                                                <Badge variant="secondary" className="bg-slate-100 border-none text-[10px] uppercase font-bold tracking-widest px-2 h-5">Enterprise Tier</Badge>
                                                <Badge variant="success" className="text-[10px] uppercase font-bold tracking-widest px-2 h-5">Verified</Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                            <Input defaultValue="Alex Rivera" className="bg-slate-50 border-slate-200 h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                            <Input defaultValue="alex@enterprisecrm.io" className="bg-slate-50 border-slate-200 h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Job Title</label>
                                            <Input defaultValue="Super Administrator" className="bg-slate-50 border-slate-200 h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Department</label>
                                            <Input defaultValue="Excecutive Hub" className="bg-slate-50 border-slate-200 h-11" />
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100 italic space-y-4">
                                        <p className="text-xs text-slate-400">
                                            Public Profile Information will be visible to your team members and validated clients.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeSection === "Account" && (
                                <div className="space-y-8">
                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                                                <ShieldCheck size={24} className="text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold">Two-Factor Authentication</h4>
                                                <p className="text-xs text-slate-400">Add an additional layer of security to your workspace.</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="h-9 px-4 text-xs font-bold uppercase tracking-widest">Enable 2FA</Button>
                                    </div>

                                    <div className="space-y-6">
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Security Dashboard</h5>
                                        <div className="divide-y divide-slate-100">
                                            {[
                                                { event: "Login from New York, US", time: "2 hours ago", status: "Validated" },
                                                { event: "Password Update Request", time: "3 days ago", status: "Denied" },
                                                { event: "API Key Generation", time: "Jan 12, 2024", status: "Secure" },
                                            ].map((log, i) => (
                                                <div key={i} className="py-4 flex items-center justify-between group cursor-default">
                                                    <div>
                                                        <p className="text-sm font-semibold group-hover:text-primary transition-colors">{log.event}</p>
                                                        <p className="text-xs text-slate-400 mt-0.5">{log.time}</p>
                                                    </div>
                                                    <Badge variant="outline" className="text-[9px] font-bold uppercase border-slate-100">{log.status}</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!["Profile", "Account"].includes(activeSection) && (
                                <div className="flex flex-col items-center justify-center py-24 text-slate-300">
                                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                                        <Settings size={40} className="opacity-10 animate-[spin_10s_linear_infinite]" />
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Configure {activeSection}</h4>
                                    <p className="text-xs mt-2 italic max-w-xs text-center leading-relaxed">
                                        This strategic configuration panel is available for Super Administrators and Technical Leads.
                                    </p>
                                    <Button variant="outline" className="mt-8 border-dashed border-slate-200 h-10 px-8">
                                        Initialize Workspace Module
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
