"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    AreaChart,
    Area
} from "recharts";
import {
    TrendingUp,
    Users,
    Target,
    Zap,
    Download,
    Filter,
    ArrowUpRight,
    Activity,
    ShieldCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { useApp } from "@/context/AppContext";

export default function ReportingPage() {
    const { leads, clients, tickets } = useApp();

    // Calculate dynamic stats
    const totalLeads = leads.length;
    const wonLeads = leads.filter(l => l.stage === "Contrat Signé").length;
    const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : "0";

    const escalatedTickets = tickets.filter(t => t.status === "Escalated").length;

    // SLA Calculation
    const compliantTickets = tickets.filter(t => t.status === "Closed" || new Date(t.slaDeadline) > new Date()).length;
    const slaCompliance = tickets.length > 0 ? ((compliantTickets / tickets.length) * 100).toFixed(0) : "100";

    const conversionData = [
        { name: "Prospects", value: leads.filter(l => l.stage === "Nouveau" || l.stage === "Prospect").length, color: "#94a3b8" },
        { name: "Qualifiés", value: leads.filter(l => l.stage === "Qualification" || l.stage === "Qualifié").length, color: "#60a5fa" },
        { name: "Négociation", value: leads.filter(l => l.stage === "Négociation" || l.stage === "Proposition").length, color: "#fb923c" },
        { name: "Gagnés", value: wonLeads, color: "#10b981" },
    ];

    const ticketDeptData = [
        { name: "Back Office", value: tickets.filter(t => t.department === "BO").length, color: "hsl(var(--primary))" },
        { name: "Serv Tech", value: tickets.filter(t => t.department === "Serv Tech").length, color: "#0f172a" },
    ];

    const performanceData = [
        { name: "Lun", sales: 4000, leads: 2400 },
        { name: "Mar", sales: 3000, leads: 1398 },
        { name: "Mer", sales: 2000, leads: 9800 },
        { name: "Jeu", sales: 2780, leads: 3908 },
        { name: "Ven", sales: 1890, leads: 4800 },
        { name: "Sam", sales: 2390, leads: 3800 },
        { name: "Dim", sales: 3490, leads: 4300 },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] ring-1 ring-slate-200/20">
                    <p className="text-[10px] font-bold text-slate-400 tracking-[0.1em] uppercase mb-1">{label}</p>
                    <p className="text-sm font-bold text-slate-900">{payload[0].value.toLocaleString()} pts</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">
            {/* 2026 Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-800">Analyses NexCare</h1>
                    <p className="text-slate-400 text-xs font-medium flex items-center gap-2">
                        <Activity size={12} className="text-primary/70 animate-pulse" />
                        Performance opérationnelle et surveillance prédictive des flux.
                    </p>
                </div>
                <div className="flex gap-2 bg-slate-100/30 p-1 rounded-xl ring-1 ring-slate-100/50 backdrop-blur-sm">
                    <Button variant="ghost" className="h-8 text-[10px] px-4 font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:shadow-sm transition-all">
                        Filtres
                    </Button>
                    <Button className="h-8 px-4 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-slate-200/50 transition-all">
                        Export Rapport
                    </Button>
                </div>
            </div>

            {/* Glassmorphism Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <StatsCard title="Conversion" value={`${conversionRate}%`} change={2.1} trend="up" icon={Zap} description="Efficience du tunnel de vente" />
                <StatsCard title="Conformité SLA" value={`${slaCompliance}%`} change={3.2} trend="up" icon={ShieldCheck} description="Respect des engagements de service" />
                <StatsCard title="Flux Critique" value={escalatedTickets.toString()} change={-1} trend="down" icon={Target} description="Volume d'incidents complexes" />
                <StatsCard title="Base Clientèle" value={clients.length.toString()} change={12.0} trend="up" icon={Users} description="Actifs sous gestion NexCare" />
            </div>

            {/* Modern Data Viz Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Area Chart - Main Visualizer */}
                <Card className="lg:col-span-8 border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] ring-1 ring-slate-100/60 rounded-[1.5rem] overflow-hidden">
                    <CardHeader className="p-8 border-b border-slate-50">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Dynamique Flux SAV</CardTitle>
                                <p className="text-2xl font-semibold text-slate-800 tracking-tight mt-1">Intelligence Temporelle</p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                <span className="text-[9px] font-bold text-primary uppercase tracking-widest leading-none">Live Analytics</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[400px] p-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.12} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorMain)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Pie Chart - Distribution */}
                <Card className="lg:col-span-4 border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] ring-1 ring-slate-100/60 rounded-[1.5rem] overflow-hidden">
                    <CardHeader className="p-8 border-b border-slate-50">
                        <CardTitle className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Répartition Flux</CardTitle>
                        <p className="text-2xl font-semibold text-slate-800 tracking-tight mt-1">Secteurs SAV</p>
                    </CardHeader>
                    <CardContent className="h-[400px] p-6 flex flex-col justify-center">
                        <ResponsiveContainer width="100%" height="280">
                            <PieChart>
                                <Pie
                                    data={ticketDeptData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={105}
                                    paddingAngle={12}
                                    dataKey="value"
                                    cornerRadius={20}
                                >
                                    {ticketDeptData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-8 space-y-3 px-4">
                            {ticketDeptData.map((d) => (
                                <div key={d.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d.name}</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700">{d.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* AI Insights - High-Tech Cards */}
            <Card className="border-none bg-slate-900 ring-1 ring-slate-800 rounded-[2rem] overflow-hidden relative group shadow-2xl">
                <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover:scale-105 transition-transform duration-[3s] pointer-events-none">
                    <Activity size={240} strokeWidth={1} />
                </div>
                <CardHeader className="p-10 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                            <Zap size={18} />
                        </div>
                        <div>
                            <CardTitle className="text-white text-lg font-bold">NexAI Analytics Engine</CardTitle>
                            <CardDescription className="text-slate-500 font-medium">Analyse prédictive et recommandations stratégiques</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-10 pt-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Insight Item 1 */}
                        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group/item backdrop-blur-sm">
                            <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-[0.3em] block mb-4">Optimisation</span>
                            <h5 className="font-semibold text-white text-base mb-2 group-hover/item:text-emerald-400 transition-colors">Vente Additionnelle SAV</h5>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium mb-6">
                                Corrélation détectée (+18%) entre les demandes techniques récurrentes et les besoins d'audit BO.
                            </p>
                            <div className="flex items-center gap-2 text-[9px] font-bold text-emerald-400 uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity">
                                Lancer Campagne <ArrowUpRight size={12} />
                            </div>
                        </div>

                        {/* Insight Item 2 */}
                        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group/item backdrop-blur-sm">
                            <span className="text-[8px] font-bold text-amber-400 uppercase tracking-[0.3em] block mb-4">Performance</span>
                            <h5 className="font-semibold text-white text-base mb-2 group-hover/item:text-amber-400 transition-colors">Flux Critique Détecté</h5>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium mb-6">
                                {escalatedTickets > 0 ? `Alerte: ${escalatedTickets} flux en escalade impactent la vélocité globale.` : "Fluidité opérationnelle maximale : Aucun retard critique sur les 24h."}
                            </p>
                            <div className="flex items-center gap-2 text-[9px] font-bold text-amber-400 uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity">
                                Réaffecter Ressources <ArrowUpRight size={12} />
                            </div>
                        </div>

                        {/* Insight Item 3 */}
                        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group/item backdrop-blur-sm">
                            <span className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] block mb-4">Prédiction</span>
                            <h5 className="font-semibold text-white text-base mb-2 group-hover/item:text-primary transition-colors">Croissance Trimestrielle</h5>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium mb-6">
                                Basé sur les {leads.length} opportunités actives, NexAI prévoit une croissance de 12% du CA sur le prochain cycle.
                            </p>
                            <div className="flex items-center gap-2 text-[9px] font-bold text-primary uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity">
                                Voir Projections <ArrowUpRight size={12} />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
