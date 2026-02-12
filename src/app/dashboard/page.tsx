"use client";

import React, { useState } from "react";
import {
    Users,
    Briefcase,
    TrendingUp,
    Activity,
    ExternalLink,
    ChevronRight,
    Plus,
    CheckCircle2,
    AlertCircle,
    Clock,
    Filter,
    CalendarDays,
    Zap
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from "recharts";
import { useApp } from "@/context/AppContext";
import { NewDealModal } from "@/components/sales/NewDealModal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const revenueData = [
    { month: "Jan", revenue: 450000, target: 400000 },
    { month: "Fév", revenue: 520000, target: 400000 },
    { month: "Mar", revenue: 480000, target: 450000 },
    { month: "Avr", revenue: 610000, target: 450000 },
    { month: "Mai", revenue: 590000, target: 500000 },
    { month: "Juin", revenue: 720000, target: 500000 },
];

export default function DashboardPage() {
    const { stats, leads, projects } = useApp();
    const [isDealModalOpen, setIsDealModalOpen] = useState(false);

    // Calculate dynamic distribution
    const projectStats = {
        inProgress: projects.filter(p => p.status === "In Progress").length,
        delayed: projects.filter(p => p.status === "Delayed").length,
        planning: projects.filter(p => p.status === "Planning").length,
        completed: projects.filter(p => p.status === "Completed").length,
    };

    const projectsDistributionData = [
        { name: "En cours", value: projectStats.inProgress, color: "hsl(var(--primary))" },
        { name: "Planification", value: projectStats.planning, color: "#94a3b8" },
        { name: "Retardé", value: projectStats.delayed, color: "#f43f5e" },
        { name: "Terminé", value: projectStats.completed, color: "#10b981" },
    ];

    // Take top 5 recent leads
    const recentLeads = [...leads].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 5);

    const handleExport = () => {
        alert("Préparation du rapport exécutif... Le rapport sera disponible dans la section Documents.");
    };

    return (
        <div className="relative min-h-[calc(100vh-5rem)]">
            {/* Background Sophistication */}
            <div className="absolute inset-0 bg-[#f8fafc] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[140px] opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] opacity-40 pointer-events-none" />

            <div className="relative animate-in fade-in duration-1000 space-y-10">
                {/* Ultra Premium 2026 Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-6 border-b border-slate-200/40">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 rounded-full bg-slate-900 text-[10px] font-bold text-white tracking-[0.2em] uppercase shadow-lg shadow-slate-900/20">
                                Global Hub
                            </div>
                            <div className="h-1 w-1 rounded-full bg-slate-200" />
                            <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Q3 Performance</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
                            Vue <span className="text-primary italic font-serif">Exécutive</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-white/60 backdrop-blur-md p-1.5 rounded-[1.5rem] ring-1 ring-slate-200/50 flex gap-2">
                            <Button
                                variant="ghost"
                                className="h-11 px-6 rounded-xl hover:bg-white hover:shadow-sm text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-all"
                            >
                                <Filter size={14} className="mr-2" />
                                Filtres
                            </Button>
                            <Button
                                onClick={() => setIsDealModalOpen(true)}
                                className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-11 px-8 rounded-xl transition-all shadow-xl shadow-slate-900/20 text-[11px] uppercase tracking-widest"
                            >
                                <Plus size={16} className="mr-2" />
                                Nouveau Flux
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Glassmorphism Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard title="Volume d'Affaires" value={`$${(stats.totalRevenue / 1000000).toFixed(1)}M`} change={12.5} trend="up" icon={TrendingUp} description="Evolution mensuelle du CA" />
                    <StatsCard title="Projets Actifs" value={stats.activeProjects.toString()} change={8.2} trend="up" icon={Briefcase} description="Charge opérationnelle live" />
                    <StatsCard title="Base Clients" value={stats.clientCount.toString()} change={4.1} trend="up" icon={Users} description="Nouveaux comptes validés" />
                    <StatsCard title="Efficience IA" value="92.4%" change={-1.2} trend="down" icon={Activity} description="Score de fluidité système" />
                </div>

                {/* Complex Data Visualization Row */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    <Card className="xl:col-span-8 border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] ring-1 ring-slate-100/60 rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="p-10 pb-6">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <CardTitle className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Trajectoire Financière</CardTitle>
                                    <p className="text-2xl font-semibold text-slate-900 tracking-tight">Analyse de Croissance</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 rounded-full ring-1 ring-primary/10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Projection IA</span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[400px] p-10 pt-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.12} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dy={15} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} tickFormatter={(value) => `$${value / 1000}k`} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', padding: '20px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)' }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="xl:col-span-4 border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] ring-1 ring-slate-100/60 rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="p-10 pb-6 border-b border-slate-50">
                            <CardTitle className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Maturité Portefeuille</CardTitle>
                            <p className="text-2xl font-semibold text-slate-900 tracking-tight mt-1">Status Projets</p>
                        </CardHeader>
                        <CardContent className="p-10 flex flex-col justify-between h-[400px]">
                            <div className="h-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={projectsDistributionData} layout="vertical" barSize={12}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} width={80} />
                                        <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                                            {projectsDistributionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="p-6 rounded-[2rem] bg-emerald-50/50 ring-1 ring-emerald-100/50 flex flex-col items-center text-center">
                                    <span className="text-3xl font-bold text-slate-900 tracking-tight">{projectStats.inProgress + projectStats.completed}</span>
                                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Sains</span>
                                </div>
                                <div className="p-6 rounded-[2rem] bg-rose-50/50 ring-1 ring-rose-100/50 flex flex-col items-center text-center">
                                    <span className="text-3xl font-bold text-rose-500 tracking-tight">{projectStats.delayed}</span>
                                    <span className="text-[9px] font-bold text-rose-600 uppercase tracking-widest mt-1">Retards</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Interactive Row */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    <Card className="xl:col-span-8 border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] ring-1 ring-slate-100/60 rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="p-10 pb-4 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Transactions Récentes</CardTitle>
                                <p className="text-2xl font-semibold text-slate-900 tracking-tight mt-1">Dernières Opportunités</p>
                            </div>
                            <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5 rounded-xl">
                                Pipeline Complet <ChevronRight size={14} className="ml-1" />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/30 text-[9px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50">
                                    <tr>
                                        <th className="px-10 py-4">Projet / Client</th>
                                        <th className="py-4">Volume</th>
                                        <th className="py-4">Maturité</th>
                                        <th className="px-10 py-4 text-right">IA Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50/50">
                                    {recentLeads.map((lead) => (
                                        <tr key={lead.id} className="group hover:bg-slate-50/30 transition-colors cursor-pointer">
                                            <td className="px-10 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{lead.title}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium">{lead.clientName}</span>
                                                </div>
                                            </td>
                                            <td className="py-5">
                                                <span className="text-sm font-bold text-slate-900">${lead.value.toLocaleString()}</span>
                                            </td>
                                            <td className="py-5">
                                                <Badge variant="outline" className="text-[9px] font-bold py-0.5 border-slate-200 text-slate-500 bg-white">
                                                    {lead.stage}
                                                </Badge>
                                            </td>
                                            <td className="px-10 py-5 text-right">
                                                <span className={cn(
                                                    "text-xs font-bold",
                                                    lead.probability > 70 ? "text-emerald-500" : "text-primary"
                                                )}>{lead.probability}%</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>

                    <Card className="xl:col-span-4 border-none bg-slate-900 ring-1 ring-slate-800 rounded-[2.5rem] overflow-hidden relative group shadow-2xl">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-105 transition-transform duration-[4s] pointer-events-none">
                            <Zap size={200} strokeWidth={1} />
                        </div>
                        <CardHeader className="p-10 pb-6 border-b border-white/5">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 rounded-lg bg-primary/20 text-primary border border-primary/20">
                                    <Activity size={14} />
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary">NexCare AI</span>
                            </div>
                            <CardTitle className="text-white text-3xl font-bold leading-tight tracking-tight">Intelligence<br />Executive</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 pt-8 space-y-6 relative z-10">
                            {[
                                {
                                    label: "Opportunité",
                                    text: "Le secteur 'Résidentiel' surperforme de 18% Q3.",
                                    color: "text-emerald-400",
                                    bg: "bg-emerald-500/10",
                                    border: "border-emerald-500/20"
                                },
                                {
                                    label: "Alerte Flux",
                                    text: "Saturation technique détectée sur les chantiers West.",
                                    color: "text-amber-400",
                                    bg: "bg-amber-500/10",
                                    border: "border-amber-500/20"
                                }
                            ].map((insight) => (
                                <div key={insight.label} className={cn("p-6 rounded-[2rem] border backdrop-blur-sm transition-all hover:bg-white/[0.05]", insight.bg, insight.border)}>
                                    <span className={cn("text-[8px] font-bold uppercase tracking-[0.2em] block mb-2", insight.color)}>{insight.label}</span>
                                    <p className="text-xs text-slate-300 font-medium leading-relaxed">{insight.text}</p>
                                </div>
                            ))}
                            <Button className="w-full h-12 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl text-[11px] uppercase tracking-widest shadow-xl transition-all">
                                Executive Hub Analysis
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <NewDealModal isOpen={isDealModalOpen} onClose={() => setIsDealModalOpen(false)} />
        </div>
    );
}
