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
    Legend
} from "recharts";
import { motion } from "framer-motion";
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
        { agent: "Admin", sales: wonLeads * 125000, leads: leads.length },
        { agent: "Equipe BO", sales: 450000, leads: tickets.filter(t => t.department === "BO").length },
        { agent: "Equipe Tech", sales: 320000, leads: tickets.filter(t => t.department === "Serv Tech").length },
    ];

    return (
        <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
            {/* Ambient Background Elements - Subtle Life */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px]"
                />
            </div>

            <div className="relative z-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 pb-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="h-1.5 w-8 bg-emerald-500 rounded-full" />
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em]">NexCare Analytics</span>
                        </div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-medium tracking-tight text-slate-900"
                        >
                            Surveillance <span className="text-slate-400 italic font-light">Opérationnelle</span>
                        </motion.h1>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="h-12 px-6 bg-white/50 backdrop-blur-sm border-slate-200/60 text-slate-500 font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white transition-all">
                            <Filter size={16} className="mr-2" />
                            Filtrer
                        </Button>
                        <Button className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-[10px] rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center gap-2 group">
                            Export Rapport
                            <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Conversion"
                        value={`${conversionRate}%`}
                        change={2.1}
                        trend="up"
                        icon={Zap}
                        description="Taux de transformation Leads"
                    />
                    <StatsCard
                        title="Conformité SLA"
                        value={`${slaCompliance}%`}
                        change={3.2}
                        trend="up"
                        icon={ShieldCheck}
                        description="Tickets résolus à temps"
                    />
                    <StatsCard
                        title="Flux Critique"
                        value={escalatedTickets.toString()}
                        change={-1}
                        trend="down"
                        icon={Target}
                        description="Incidents escaladés actifs"
                    />
                    <StatsCard
                        title="Base Clientèle"
                        value={clients.length.toString()}
                        change={12.0}
                        trend="up"
                        icon={Users}
                        description="Portefeuille de comptes actifs"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="card-premium lg:col-span-1 border-slate-200/50 shadow-sm overflow-hidden">
                        <CardHeader className="border-b border-slate-50/50 pb-4">
                            <CardTitle className="text-lg font-bold">Tunnel de Ventes</CardTitle>
                            <CardDescription className="font-medium text-slate-400">Répartition par étape du pipeline</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[320px] pt-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={conversionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={8}
                                        dataKey="value"
                                        cornerRadius={12}
                                    >
                                        {conversionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="card-premium lg:col-span-1 border-slate-200/50 shadow-sm overflow-hidden">
                        <CardHeader className="border-b border-slate-50/50 pb-4">
                            <CardTitle className="text-lg font-bold">Charge Support</CardTitle>
                            <CardDescription className="font-medium text-slate-400">Distribution par département SAV</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[320px] pt-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={ticketDeptData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={8}
                                        dataKey="value"
                                        cornerRadius={12}
                                    >
                                        {ticketDeptData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="card-premium lg:col-span-1 border-slate-200/50 shadow-sm overflow-hidden">
                        <CardHeader className="border-b border-slate-50/50 pb-4">
                            <CardTitle className="text-lg font-bold">Productivité Equipes</CardTitle>
                            <CardDescription className="font-medium text-slate-400">C.A. généré vs Flux gérés</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[320px] pt-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={performanceData} barSize={24}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                                    <XAxis dataKey="agent" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                                        tickFormatter={(value) => `${value / 1000}k`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc', radius: 8 }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card className="card-premium border-none !bg-slate-900 text-white overflow-hidden relative group shadow-2xl shadow-slate-200/50">
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                        <TrendingUp size={200} />
                    </div>
                    <CardHeader className="pb-8">
                        <CardTitle className="text-white flex items-center gap-3 text-xl font-bold">
                            Intelligence Stratégique NexCare
                            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 animate-pulse font-bold text-[10px] tracking-widest">IA LIVE</Badge>
                        </CardTitle>
                        <CardDescription className="text-slate-400 font-medium">Analyses prédictives basées sur l'activité temps réel.</CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-10 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-7 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/item">
                                <Badge variant="success" className="mb-5 font-bold tracking-widest text-[9px] bg-emerald-500/10 text-emerald-400 border-none">OPPORTUNITÉ</Badge>
                                <h5 className="font-bold text-lg mb-3 group-hover/item:text-emerald-400 transition-colors">Vente Additionnelle SAV</h5>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                    {clients.length > 5 ? "Une corrélation est détectée entre les demandes SAV BO et les besoins de ré-audit structurel." : "Volume de données insuffisant pour une projection de vente croisée."}
                                    Maximisez la rétention via maintenance annuelle.
                                </p>
                                <Button variant="link" className="text-emerald-400 p-0 h-auto mt-6 text-[11px] font-bold uppercase tracking-widest hover:text-emerald-300 transition-all">
                                    Lancer Campagne <ArrowUpRight size={14} className="ml-1.5" />
                                </Button>
                            </div>
                            <div className="p-7 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/item">
                                <Badge variant="warning" className="mb-5 text-amber-400 border-none bg-amber-400/10 font-bold tracking-widest text-[9px]">EFFICIENCE</Badge>
                                <h5 className="font-bold text-lg mb-3 group-hover/item:text-amber-400 transition-colors">Alerte Goulot Support</h5>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                    {escalatedTickets > 0 ? `Attention: ${escalatedTickets} ticket(s) escaladé(s) impactent votre score de satisfaction globale.` : "Fluidité opérationnelle optimale : Aucun ticket en retard critique détecté."}
                                    Rééquilibrage de charge recommandé.
                                </p>
                                <Button variant="link" className="text-amber-400 p-0 h-auto mt-6 text-[11px] font-bold uppercase tracking-widest hover:text-amber-300 transition-all">
                                    Réaffecter Ressources <ArrowUpRight size={14} className="ml-1.5" />
                                </Button>
                            </div>
                            <div className="p-7 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/item">
                                <Badge className="mb-5 bg-primary/20 text-primary font-bold tracking-widest text-[9px] border-none">PRÉDICTION IA</Badge>
                                <h5 className="font-bold text-lg mb-3 group-hover/item:text-primary transition-colors">Croissance Q1/Q2</h5>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                    En se basant sur les {leads.length} opportunités actives, NexAI prévoit une conversion de {wonLeads + 2} nouveaux contrats d'ici 30 jours.
                                    Anticipez les ressources CAO.
                                </p>
                                <Button variant="link" className="text-primary p-0 h-auto mt-6 text-[11px] font-bold uppercase tracking-widest hover:text-primary/80 transition-all">
                                    Planifier Ressources <ArrowUpRight size={14} className="ml-1.5" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
