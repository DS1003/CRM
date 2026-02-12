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
    CalendarDays
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
        <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
            {/* Ambient Background Elements - Subtle Life */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1.1, 1, 1.1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]"
                />
                <div className="absolute inset-0 bg-grid-slate-100/[0.03] bg-[bottom_1px_center] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-10">
                {/* Ultra Premium Header */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 pb-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="h-1.5 w-8 bg-primary rounded-full" />
                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">NexCare Executive</span>
                        </div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-medium tracking-tight text-slate-900"
                        >
                            Vue d'Ensemble <span className="text-slate-400 italic font-light">Q3 2024</span>
                        </motion.h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex -space-x-3 mr-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="h-full w-full object-cover" />
                                </div>
                            ))}
                            <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                                +12
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="h-12 w-12 p-0 rounded-2xl bg-white/50 backdrop-blur-md border-slate-200/60 text-slate-400 hover:text-primary transition-all"
                        >
                            <Filter size={18} />
                        </Button>
                        <Button
                            onClick={() => setIsDealModalOpen(true)}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 px-8 rounded-2xl transition-all shadow-xl shadow-slate-200 group"
                        >
                            <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
                            Nouvelle Opportunité
                        </Button>
                    </div>
                </div>

                {/* Main Grid System */}
                <div className="grid grid-cols-12 gap-8">

                    {/* Stats Section */}
                    <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        <StatsCard
                            title="Volume d'Affaires"
                            value={`$${(stats.totalRevenue / 1000000).toFixed(1)}M`}
                            change={12.5}
                            trend="up"
                            icon={TrendingUp}
                            description="Flux de revenus validés"
                        />
                        <StatsCard
                            title="Projets Actifs"
                            value={stats.activeProjects.toString()}
                            change={8.2}
                            trend="up"
                            icon={Briefcase}
                            description="Charge opérationnelle"
                        />
                        <StatsCard
                            title="Base Clients"
                            value={stats.clientCount.toString()}
                            change={4.1}
                            trend="up"
                            icon={Users}
                            description="Nouveaux comptes Q3"
                        />
                        <StatsCard
                            title="Efficience Lead"
                            value="92%"
                            change={2.4}
                            trend="down"
                            icon={Activity}
                            description="Performance conversion"
                        />
                    </div>

                    {/* Middle Row */}
                    <div className="col-span-12 xl:col-span-8">
                        <Card className="card-premium overflow-hidden border-slate-200/50 shadow-sm">
                            <CardHeader className="border-b border-slate-50/50 pb-8 p-10">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-semibold text-slate-900">Trajectoire Financière</CardTitle>
                                        <CardDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue Forecast vs Target</CardDescription>
                                    </div>
                                    <div className="flex gap-2.5">
                                        <Badge variant="outline" className="text-slate-400 border-slate-100 font-bold px-3 py-1 rounded-lg text-[9px]">2024</Badge>
                                        <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold px-3 py-1 rounded-lg text-[9px]">CIBLE: 105%</Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="h-[420px] p-10 pt-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                                            dy={20}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                            dx={-20}
                                        />
                                        <Tooltip
                                            cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                                            contentStyle={{
                                                borderRadius: '1.5rem',
                                                border: 'none',
                                                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)',
                                                padding: '20px',
                                                background: 'white',
                                            }}
                                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total']}
                                            labelStyle={{ color: '#0f172a', marginBottom: '8px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorRevenue)"
                                            activeDot={{ r: 8, strokeWidth: 0, fill: 'hsl(var(--primary))' }}
                                            animationDuration={2500}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="target"
                                            stroke="#e2e8f0"
                                            strokeWidth={2}
                                            strokeDasharray="8 8"
                                            fill="none"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="col-span-12 xl:col-span-4">
                        <Card className="card-premium h-full flex flex-col border-slate-200/50 shadow-sm">
                            <CardHeader className="border-b border-slate-50/50 p-10">
                                <CardTitle className="text-2xl font-bold text-slate-900">Maturité Projets</CardTitle>
                                <CardDescription className="mt-1 font-semibold text-slate-400">Santé globale du portefeuille actif.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-10 flex-1 flex flex-col justify-between pt-12">
                                <div className="h-[220px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={projectsDistributionData}
                                            layout="vertical"
                                            margin={{ left: -10, right: 30, top: 0, bottom: 0 }}
                                            barSize={20}
                                        >
                                            <XAxis type="number" hide />
                                            <YAxis
                                                dataKey="name"
                                                type="category"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }}
                                                width={100}
                                            />
                                            <Tooltip
                                                cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }}
                                                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                            />
                                            <Bar dataKey="value" radius={[0, 10, 10, 0]} animationDuration={2000}>
                                                {projectsDistributionData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="grid grid-cols-2 gap-5 mt-10">
                                    <div className="p-8 rounded-[2rem] bg-emerald-50/30 border border-emerald-100 flex flex-col items-center group transition-all hover:bg-white hover:shadow-xl hover:shadow-emerald-100/30">
                                        <CheckCircle2 className="text-emerald-500 mb-3" size={20} />
                                        <span className="text-4xl font-extrabold text-slate-900 leading-none">{projectStats.inProgress + projectStats.completed}</span>
                                        <span className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mt-3">SÉCURISÉS</span>
                                    </div>
                                    <div className="p-8 rounded-[2rem] bg-rose-50/30 border border-rose-100 flex flex-col items-center group transition-all hover:bg-white hover:shadow-xl hover:shadow-rose-100/30">
                                        <AlertCircle className="text-rose-500 mb-3" size={20} />
                                        <span className="text-4xl font-extrabold text-rose-500 leading-none">{projectStats.delayed}</span>
                                        <span className="text-[10px] text-rose-600 uppercase tracking-widest font-bold mt-3">À RISQUE</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Bottom Row */}
                    <div className="col-span-12 xl:col-span-8">
                        <Card className="card-premium border-slate-200/50 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50/50 p-10">
                                <div>
                                    <CardTitle className="text-2xl font-bold text-slate-900">Opportunités de Marché</CardTitle>
                                    <CardDescription className="mt-1 font-semibold text-slate-400">Suivi des négociations prioritaires.</CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" className="text-primary font-bold text-[11px] uppercase tracking-widest px-6 py-2.5 rounded-xl hover:bg-primary/5">
                                    Explorer Pipeline <ChevronRight size={14} className="ml-1" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-50 text-left text-[11px] text-slate-400 uppercase tracking-widest font-bold">
                                                <th className="p-10 pb-6">Désignation</th>
                                                <th className="py-10 pb-6">Client</th>
                                                <th className="py-10 pb-6">Valeur</th>
                                                <th className="py-10 pb-6">Étape</th>
                                                <th className="p-10 pb-6 text-right">Scoring IA</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50/50">
                                            {recentLeads.map((lead, idx) => (
                                                <motion.tr
                                                    key={lead.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="group hover:bg-slate-50/20 transition-colors cursor-pointer"
                                                >
                                                    <td className="p-10 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all shadow-sm">
                                                                <Briefcase size={18} />
                                                            </div>
                                                            <span className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors">{lead.title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-6 text-sm text-slate-500 font-semibold">{lead.clientName}</td>
                                                    <td className="py-6 text-sm font-extrabold text-slate-900">${lead.value.toLocaleString()}</td>
                                                    <td className="py-6">
                                                        <Badge
                                                            variant={lead.stage === "Contract Signed" ? "success" : "secondary"}
                                                            className="font-bold text-[10px] px-3 py-1 bg-white border border-slate-100 shadow-sm rounded-lg"
                                                        >
                                                            {lead.stage}
                                                        </Badge>
                                                    </td>
                                                    <td className="p-10 py-6 text-right">
                                                        <div className="flex items-center justify-end gap-5 text-sm font-bold text-slate-900">
                                                            <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden md:block">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${lead.probability}%` }}
                                                                    transition={{ duration: 1.5, delay: 0.8 + idx * 0.1 }}
                                                                    className={cn(
                                                                        "h-full rounded-full transition-all",
                                                                        lead.probability > 70 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : lead.probability > 40 ? "bg-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "bg-slate-300"
                                                                    )}
                                                                />
                                                            </div>
                                                            <span className="min-w-[40px] text-xs font-extrabold">{lead.probability}%</span>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="col-span-12 xl:col-span-4">
                        <Card className="card-premium border-none !bg-slate-900 text-white relative overflow-hidden group h-full shadow-2xl shadow-slate-200/50">
                            {/* Sophisticated AI Glow */}
                            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px] -mr-48 -mt-48 transition-transform duration-[2000ms] group-hover:scale-125" />

                            <CardHeader className="relative z-10 pb-10 border-b border-white/5 p-10">
                                <div className="space-y-4">
                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">NexCare Intelligence</span>
                                    <CardTitle className="text-white text-2xl font-medium leading-tight">Analyses<br /><span className="text-slate-500 italic">Prédictives</span></CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-8 pt-10 p-10 relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="space-y-4 p-7 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all cursor-default backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-3 text-emerald-400">
                                        <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                                            <TrendingUp size={18} strokeWidth={2.5} />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Growth Factor</span>
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed font-semibold opacity-80">
                                        Le vertical <span className="text-white underline decoration-emerald-500/30 underline-offset-4 decoration-2">Résidentiel Premium</span> performe 18% au-dessus des prévisions saisonnières.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-4 p-7 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all cursor-default backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-3 text-amber-400">
                                        <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                            <Clock size={18} strokeWidth={2.5} />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">SLA Monitoring</span>
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed font-semibold opacity-80">
                                        Alerte saturation sur le <span className="text-white underline decoration-amber-500/30 underline-offset-4 decoration-2">Service Technique</span>. Réallocation de charge recommandée d'ici 24h.
                                    </p>
                                </motion.div>

                                <div className="pt-4">
                                    <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-extrabold h-14 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3">
                                        Rapport de Surveillance
                                        <ChevronRight size={20} />
                                    </Button>
                                    <p className="text-center text-slate-600 text-[10px] font-bold mt-5 uppercase tracking-widest opacity-50">Dernière mise à jour par NexAI : Now</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>

                <NewDealModal isOpen={isDealModalOpen} onClose={() => setIsDealModalOpen(false)} />
            </div>
        </div>);
}
