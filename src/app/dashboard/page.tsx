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
    Search,
    Filter,
    CalendarDays
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
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
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none" />

            <div className="relative animate-in fade-in duration-700 space-y-10">
                {/* Ultra Premium Header */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 pb-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-1 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                            <motion.h1
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight"
                            >
                                Vue <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Exécutive</span>
                            </motion.h1>
                        </div>
                        <p className="text-slate-500 text-lg font-medium opacity-70 flex items-center gap-2">
                            <CalendarDays size={20} className="text-slate-400" />
                            Année Fiscale 2024 • Performance Globale
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="h-12 w-[1px] bg-slate-200/60 mx-2 hidden xl:block" />
                        <Button
                            variant="outline"
                            className="h-12 w-12 p-0 rounded-2xl bg-white/80 backdrop-blur border-slate-200 text-slate-400 hover:text-primary hover:border-primary/20 shadow-sm"
                        >
                            <Filter size={18} />
                        </Button>
                        <Button
                            onClick={handleExport}
                            variant="outline"
                            className="bg-white/80 backdrop-blur border-slate-200 text-slate-600 hover:text-primary hover:border-primary/20 shadow-sm h-12 px-6 font-bold rounded-2xl transition-all"
                        >
                            <ExternalLink size={18} className="mr-2" />
                            Rapport
                        </Button>
                        <Button
                            onClick={() => setIsDealModalOpen(true)}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-black shadow-2xl shadow-slate-900/10 h-12 px-6 rounded-2xl transition-all group"
                        >
                            <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
                            Capturer une opportunité
                        </Button>
                    </div>
                </div>

                {/* Main Grid System */}
                <div className="grid grid-cols-12 gap-8">

                    {/* Stats Section - Top Row Full Width */}
                    <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        <StatsCard
                            title="Chiffre d'Affaires Brut"
                            value={`$${(stats.totalRevenue / 1000000).toFixed(1)}M`}
                            change={12.5}
                            trend="up"
                            icon={TrendingUp}
                            description="Revenus validés • Objectif Q3"
                        />
                        <StatsCard
                            title="Charge du Pipeline"
                            value={stats.activeProjects.toString()}
                            change={8.2}
                            trend="up"
                            icon={Briefcase}
                            description="Capacité opérationnelle actuelle"
                        />
                        <StatsCard
                            title="Base Clients"
                            value={stats.clientCount.toString()}
                            change={4.1}
                            trend="up"
                            icon={Users}
                            description="Nouvelles activations de comptes"
                        />
                        <StatsCard
                            title="Vélocité Prospect"
                            value="92%"
                            change={2.4}
                            trend="down"
                            icon={Activity}
                            description="Conversion vs Objectif Q2"
                        />
                    </div>

                    {/* Middle Row: Revenue Chart & Project Health */}
                    <div className="col-span-12 xl:col-span-8">
                        <Card className="card-premium overflow-hidden h-full">
                            <CardHeader className="border-b border-slate-50/50 pb-8 p-8">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                            <CardTitle className="text-2xl font-black text-slate-900">Trajectoire des Revenus</CardTitle>
                                        </div>
                                        <CardDescription className="mt-1 font-bold text-slate-400">Analyse mensuelle des opportunités conclues vs objectifs.</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge variant="secondary" className="bg-slate-100/50 text-slate-500 border-none font-black px-3 py-1">2024</Badge>
                                        <Badge className="bg-primary/5 text-primary border-none font-black px-3 py-1 ring-1 ring-primary/20">CIBLE: 105%</Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="h-[400px] p-8 pt-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800 }}
                                            dy={15}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800 }}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                            dx={-15}
                                        />
                                        <Tooltip
                                            cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                                            contentStyle={{
                                                borderRadius: '1.25rem',
                                                border: 'none',
                                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                                padding: '16px',
                                                background: 'rgba(255, 255, 255, 0.98)',
                                            }}
                                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Montant']}
                                            labelStyle={{ color: '#0f172a', marginBottom: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorRevenue)"
                                            activeDot={{ r: 8, strokeWidth: 0, fill: 'hsl(var(--primary))' }}
                                            animationDuration={2000}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="target"
                                            stroke="#cbd5e1"
                                            strokeWidth={2}
                                            strokeDasharray="6 6"
                                            fill="none"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="col-span-12 xl:col-span-4">
                        <Card className="card-premium h-full flex flex-col pt-2">
                            <CardHeader className="border-b border-slate-50/50 p-8">
                                <CardTitle className="text-2xl font-black text-slate-900">Intégrité Projet</CardTitle>
                                <CardDescription className="mt-1 font-bold text-slate-400">Répartition des phases de construction actives.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 flex-1 flex flex-col justify-between pt-10">
                                <div className="h-[200px] w-full">
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
                                                tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }}
                                                width={100}
                                            />
                                            <Tooltip
                                                cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }}
                                                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                            />
                                            <Bar dataKey="value" radius={[0, 8, 8, 0]} animationDuration={1800}>
                                                {projectsDistributionData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="p-6 rounded-3xl bg-emerald-50/30 border border-emerald-100 flex flex-col items-center group/stat hover:bg-white hover:shadow-xl hover:shadow-emerald-100/50 transition-all cursor-default">
                                        <CheckCircle2 className="text-emerald-500 mb-2 group-hover/stat:scale-110 transition-transform" size={18} />
                                        <span className="text-4xl font-black text-slate-900 leading-none">{projectStats.inProgress + projectStats.completed}</span>
                                        <span className="text-[9px] text-emerald-600 uppercase tracking-[0.2em] font-black mt-3">VALIDÉS</span>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-rose-50/30 border border-rose-100 flex flex-col items-center group/stat hover:bg-white hover:shadow-xl hover:shadow-rose-100/50 transition-all cursor-default">
                                        <AlertCircle className="text-rose-500 mb-2 group-hover/stat:scale-110 transition-transform" size={18} />
                                        <span className="text-4xl font-black text-rose-500 leading-none">{projectStats.delayed}</span>
                                        <span className="text-[9px] text-rose-600 uppercase tracking-[0.2em] font-black mt-3">À RISQUE</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Bottom Row: Active Deals Table & AI Insights */}
                    <div className="col-span-12 xl:col-span-8">
                        <Card className="card-premium">
                            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50/50 p-8">
                                <div>
                                    <CardTitle className="text-2xl font-black text-slate-900">Opportunités Actives</CardTitle>
                                    <CardDescription className="mt-1 font-bold text-slate-400">Scoring propriétaire et suivi des étapes.</CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/10 hover:bg-primary/5 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl">
                                    Carte du Pipeline <ChevronRight size={14} className="ml-1" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto overflow-y-hidden">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-50 text-left text-[11px] text-slate-300 uppercase tracking-[0.2em] font-black">
                                                <th className="p-8 pb-5 font-black">Désignation</th>
                                                <th className="py-8 pb-5 font-black">Entité</th>
                                                <th className="py-8 pb-5 font-black">Valeur</th>
                                                <th className="py-8 pb-5 font-black">Étape</th>
                                                <th className="p-8 pb-5 font-black text-right">Probabilité Réussite</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50/50">
                                            {recentLeads.map((lead, idx) => (
                                                <motion.tr
                                                    key={lead.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="group hover:bg-slate-50/30 transition-colors cursor-pointer"
                                                >
                                                    <td className="p-8 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-50/50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300 shadow-sm">
                                                                <Briefcase size={18} />
                                                            </div>
                                                            <span className="font-bold text-sm text-slate-800 group-hover:text-primary transition-colors">{lead.title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-sm text-slate-500 font-bold">{lead.clientName}</td>
                                                    <td className="py-5 text-sm font-black text-slate-900">${lead.value.toLocaleString()}</td>
                                                    <td className="py-5">
                                                        <Badge
                                                            variant={lead.stage === "Contract Signed" ? "success" : "secondary"}
                                                            className="font-black text-[9px] uppercase tracking-[0.15em] bg-white border border-slate-100 shadow-sm px-3 py-1.5 rounded-lg"
                                                        >
                                                            {lead.stage}
                                                        </Badge>
                                                    </td>
                                                    <td className="p-8 py-5 text-right">
                                                        <div className="flex items-center justify-end gap-4 text-sm font-black text-slate-900">
                                                            <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner hidden md:block">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${lead.probability}%` }}
                                                                    transition={{ duration: 1.5, delay: 0.8 + idx * 0.1 }}
                                                                    className={cn(
                                                                        "h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]",
                                                                        lead.probability > 70 ? "bg-emerald-500" : lead.probability > 40 ? "bg-primary" : "bg-slate-400"
                                                                    )}
                                                                ></motion.div>
                                                            </div>
                                                            <span className="min-w-[40px]">{lead.probability}%</span>
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
                        <Card className="card-premium !bg-slate-900 !border-slate-800 text-white relative overflow-hidden group h-full">
                            {/* High-End AI Glow Effect */}
                            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px] -mr-48 -mt-48 transition-transform duration-[2000ms] group-hover:scale-125" />
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -ml-24 -mb-24" />

                            <CardHeader className="relative z-10 pb-10 border-b border-white/5 p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-2 w-2 rounded-full bg-primary animate-ping shadow-[0_0_15px_rgba(59,130,246,1)]"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">CŒUR ANALYTIQUE QUANTIQUE</span>
                                </div>
                                <CardTitle className="text-white text-3xl font-black leading-tight italic tracking-tighter">Intelligence<br />Stratégique</CardTitle>
                                <CardDescription className="text-slate-500 font-bold mt-2">Modélisation prédictive pour l'accélération du pipeline.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-10 p-8 relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="space-y-4 p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all cursor-default backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-3 text-emerald-400">
                                        <div className="p-2 rounded-xl bg-emerald-500/10">
                                            <TrendingUp size={18} strokeWidth={2.5} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Opportunité Détectée</span>
                                    </div>
                                    <p className="text-[11px] text-slate-300 leading-relaxed font-bold opacity-80">
                                        Le secteur industriel montre une <span className="text-white underline decoration-emerald-500/50 underline-offset-4 decoration-2">vélocité 15% plus élevée</span>. Cible prioritaire : expansions Q3 dans ce vertical.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-4 p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all cursor-default backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-3 text-amber-400">
                                        <div className="p-2 rounded-xl bg-amber-500/10">
                                            <Clock size={18} strokeWidth={2.5} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Prévision Ressources</span>
                                    </div>
                                    <p className="text-[11px] text-slate-300 leading-relaxed font-bold opacity-80">
                                        Surcharge de validation technique détectée. Recommandé : Allocation de <span className="text-white underline decoration-amber-500/50 underline-offset-4 decoration-2">2 ressources CAO additionnelles</span> au projet-482.
                                    </p>
                                </motion.div>

                                <div className="pt-2">
                                    <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-black border-none h-14 shadow-2xl rounded-2xl transition-all flex items-center justify-center gap-2 group/btn">
                                        Audit Stratégique
                                        <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                    <p className="text-center text-slate-600 text-[10px] font-bold mt-4 uppercase tracking-widest opacity-60">Dernière mise à jour : il y a 2 minutes</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>

                <NewDealModal isOpen={isDealModalOpen} onClose={() => setIsDealModalOpen(false)} />
            </div>
        </div>);
}
