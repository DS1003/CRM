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
import {
    TrendingUp,
    Users,
    Target,
    Zap,
    Download,
    Calendar,
    Filter,
    ArrowUpRight
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

    const highPriorityTickets = tickets.filter(t => t.priority === "High").length;
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
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analyses & Reporting SAV</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Indicateurs de performance commerciale et conformité de service.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2 bg-white/50 border-slate-200">
                        <Filter size={16} />
                        Filtrer
                    </Button>
                    <Button size="sm" className="gap-2 bg-slate-900 text-white shadow-lg shadow-slate-900/20 font-bold">
                        <Download size={16} />
                        Exporter Rapport
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
                    icon={TrendingUp}
                    description="Tickets résolus dans les délais"
                />
                <StatsCard
                    title="Urgent / Escaladé"
                    value={escalatedTickets.toString()}
                    change={-1}
                    trend="down"
                    icon={Target}
                    description="Incidents critiques actifs"
                />
                <StatsCard
                    title="Base Clientèle"
                    value={clients.length.toString()}
                    change={12.0}
                    trend="up"
                    icon={Users}
                    description="Portefeuille clients actifs"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="card-premium lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Tunnel de Conversion</CardTitle>
                        <CardDescription>Répartition des leads par étape.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={conversionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    cornerRadius={8}
                                >
                                    {conversionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="card-premium lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Tickets par Département</CardTitle>
                        <CardDescription>Répartition de la charge de support.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={ticketDeptData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    cornerRadius={8}
                                >
                                    {ticketDeptData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="card-premium lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Performance Equipes</CardTitle>
                        <CardDescription>C.A. généré / Volume géré.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData} barSize={30}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="agent" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} dy={10} />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 10 }}
                                    tickFormatter={(value) => `${value / 1000}k`}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="card-premium !bg-slate-900 !border-slate-800 text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <TrendingUp size={200} />
                </div>
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-3">
                        Recommandations Stratégiques NexAI
                        <Badge variant="secondary" className="bg-white/10 text-white border-white/20 animate-pulse">LIVE</Badge>
                    </CardTitle>
                    <CardDescription className="text-slate-400">Analyses prédictives basées sur l'activité temps réel.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/item">
                            <Badge variant="success" className="mb-4 font-bold tracking-widest">OPPORTUNITÉ</Badge>
                            <h5 className="font-bold text-lg mb-2 group-hover/item:text-emerald-400 transition-colors">Vente Additionnelle SAV</h5>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                {clients.length > 5 ? "Une corrélation est détectée entre les demandes SAV BO et les besoins de ré-audit structurel." : "Volume de données insuffisant pour une préjection de vente croisée."}
                                Maximisez la rétention en proposant un contrat de maintenance annuelle.
                            </p>
                            <Button variant="link" className="text-emerald-400 p-0 h-auto mt-4 text-xs font-bold uppercase tracking-widest hover:text-emerald-300">
                                Lancer Campagne <ArrowUpRight size={14} className="ml-1" />
                            </Button>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/item">
                            <Badge variant="warning" className="mb-4 text-white border-white/40 font-bold tracking-widest">EFFICIENCE</Badge>
                            <h5 className="font-bold text-lg mb-2 group-hover/item:text-amber-400 transition-colors">Alerte Goulot SAV</h5>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                {escalatedTickets > 0 ? `Attention: ${escalatedTickets} ticket(s) escaladé(s) impactent votre score de satisfaction globale.` : "Fluidité opérationnelle optimale : Aucun ticket en retard critique détecté."}
                                Distribution de charge recommandée.
                            </p>
                            <Button variant="link" className="text-amber-400 p-0 h-auto mt-4 text-xs font-bold uppercase tracking-widest hover:text-amber-300">
                                Réaffecter Ressources <ArrowUpRight size={14} className="ml-1" />
                            </Button>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/item">
                            <Badge className="mb-4 bg-primary/20 text-primary-foreground font-bold tracking-widest border-none">PRÉDICTION IA</Badge>
                            <h5 className="font-bold text-lg mb-2 group-hover/item:text-primary transition-colors">Croissance Q1/Q2</h5>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                En se basant sur les {leads.length} opportunités actives, NexAI prévoit une conversion de {wonLeads + 2} nouveaux contrats d'ici la fin du mois.
                                Préparez les ressources CAO.
                            </p>
                            <Button variant="link" className="text-primary p-0 h-auto mt-4 text-xs font-bold uppercase tracking-widest hover:text-primary/80">
                                Planifier Ressources <ArrowUpRight size={14} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
