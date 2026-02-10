"use client";

import React from "react";
import {
    Building2,
    Search,
    Filter,
    Plus,
    Clock,
    CheckCircle2,
    AlertTriangle,
    HardHat,
    Calendar,
    ChevronRight,
    TrendingUp,
    MapPin
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockProjects } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

export default function ConstructionPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Construction Hub</h1>
                    <p className="text-muted-foreground mt-1">Enterprise Resource Planning for site operations and technical milestones.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <TrendingUp size={18} />
                        Forecasting
                    </Button>
                    <Button className="gap-2 bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        <Plus size={18} />
                        Initiate Project
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatusCard
                    label="Active Projects"
                    value="12"
                    icon={HardHat}
                    color="bg-primary"
                    description="Projects currently in structural phase"
                />
                <StatusCard
                    label="On Schedule"
                    value="9"
                    icon={CheckCircle2}
                    color="bg-emerald-500"
                    description="Sites meeting all milestone KPIs"
                />
                <StatusCard
                    label="At Risk"
                    value="3"
                    icon={AlertTriangle}
                    color="bg-rose-500"
                    description="Delayed by technical validation"
                />
            </div>

            <Card className="border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Master Project Ledger</CardTitle>
                        <CardDescription>Live tracking of all active and pending construction sites.</CardDescription>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative w-64">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <Input placeholder="Search sites..." className="pl-10 h-9 bg-slate-50" />
                        </div>
                        <Button variant="outline" size="sm" className="h-9">
                            <Filter size={16} className="mr-2" />
                            Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                        {mockProjects.map((project) => (
                            <Link key={project.id} href={`/construction/${project.id}`}>
                                <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-primary/30 hover:shadow-md transition-all group flex flex-col md:flex-row gap-6 cursor-pointer">
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform",
                                        project.status === "Delayed" ? "bg-rose-500" : "bg-primary"
                                    )}>
                                        <Building2 size={32} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{project.name}</h3>
                                                <p className="text-sm text-slate-400 flex items-center gap-2 mt-0.5">
                                                    <MapPin size={14} /> {project.clientName}
                                                </p>
                                            </div>
                                            <Badge variant={project.status === "Delayed" ? "warning" : "success"} className="text-[10px] uppercase font-bold tracking-widest px-3">
                                                {project.status}
                                            </Badge>
                                        </div>

                                        <div className="mt-6 flex flex-col md:flex-row md:items-center gap-8">
                                            <div className="flex-1">
                                                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2">
                                                    <span>Phase Completion</span>
                                                    <span>{project.progress}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn(
                                                            "h-full transition-all duration-500",
                                                            project.status === "Delayed" ? "bg-rose-500" : "bg-primary"
                                                        )}
                                                        style={{ width: `${project.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="flex gap-8 border-l border-slate-100 pl-8">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block underline decoration-primary decoration-2 underline-offset-4">Manager</span>
                                                    <span className="text-sm font-bold block">{project.manager}</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block transition-all group-hover:text-slate-900">Health</span>
                                                    <span className="text-sm font-bold block">{formatCurrency(project.budget / 1000)}k</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Button variant="ghost" size="icon" className="text-slate-300 group-hover:text-primary">
                                                        <ChevronRight size={24} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function StatusCard({ label, value, icon: Icon, color, description }: any) {
    return (
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-3 rounded-xl text-white", color)}>
                        <Icon size={24} />
                    </div>
                    <span className="text-3xl font-bold tracking-tight">{value}</span>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-sm italic">{label}</h4>
                    <p className="text-xs text-slate-400 mt-1">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}
