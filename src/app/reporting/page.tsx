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

const conversionData = [
    { name: "Prospects", value: 120, color: "#94a3b8" },
    { name: "Qualifiés", value: 85, color: "#60a5fa" },
    { name: "Négociation", value: 42, color: "#fb923c" },
    { name: "Gagnés", value: 28, color: "#10b981" },
];

const performanceData = [
    { agent: "Sarah C.", sales: 850000, leads: 42 },
    { agent: "Marcus R.", sales: 520000, leads: 31 },
    { agent: "Elena S.", sales: 1250000, leads: 18 },
    { agent: "John D.", sales: 410000, leads: 54 },
];

export default function ReportingPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analyses de Performance</h1>
                    <p className="text-muted-foreground mt-1">Analyse détaillée de la productivité commerciale et des taux de conversion.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2 bg-white/50 border-slate-200">
                        <Filter size={16} />
                        Filtrage Avancé
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-white/50 border-slate-200">
                        <Calendar size={16} />
                        30 derniers jours
                    </Button>
                    <Button size="sm" className="gap-2 bg-slate-900 text-white shadow-lg shadow-slate-900/20 font-bold">
                        <Download size={16} />
                        Exporter les données
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Taux de Conversion"
                    value="12.4%"
                    change={2.1}
                    trend="up"
                    icon={Zap}
                    description="Total des contrats gagnés vs prospects"
                />
                <StatsCard
                    title="Vélocité de Vente"
                    value="18 Jours"
                    change={1.5}
                    trend="up"
                    icon={TrendingUp}
                    description="Temps moyen pour conclure un deal"
                />
                <StatsCard
                    title="Qualité des Prospects"
                    value="7.2/10"
                    change={0.4}
                    trend="down"
                    icon={Target}
                    description="Score de santé moyen des leads"
                />
                <StatsCard
                    title="Ratio CAC"
                    value="1:4.2"
                    change={12.0}
                    trend="up"
                    icon={Users}
                    description="Coût d'acquisition vs Valeur Vie"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-premium">
                    <CardHeader>
                        <CardTitle>Tunnel de Conversion</CardTitle>
                        <CardDescription>Nombre de prospects transitant par chaque étape du pipeline.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={conversionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
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

                <Card className="card-premium">
                    <CardHeader>
                        <CardTitle>Performance par Agent</CardTitle>
                        <CardDescription>Volume de ventes vs prospects gérés par agent.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData} barSize={40}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="agent" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={10} />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
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
                        Recommandations Stratégiques IA
                        <Badge variant="secondary" className="bg-white/10 text-white border-white/20">BETA</Badge>
                    </CardTitle>
                    <CardDescription className="text-slate-400">Suggestions d'optimisation basées sur les données historiques.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/item">
                            <Badge variant="success" className="mb-4 font-bold tracking-widest">OPPORTUNITÉ</Badge>
                            <h5 className="font-bold text-lg mb-2 group-hover/item:text-emerald-400 transition-colors">Vente Additionnelle Détectée</h5>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Les clients de l'industrie "Technologie" ont 40% plus de chances d'acheter des services d'audit structurel dans les 6 mois.
                            </p>
                            <Button variant="link" className="text-emerald-400 p-0 h-auto mt-4 text-xs font-bold uppercase tracking-widest hover:text-emerald-300">
                                Voir le Segment <ArrowUpRight size={14} className="ml-1" />
                            </Button>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/item">
                            <Badge variant="warning" className="mb-4 text-white border-white/40 font-bold tracking-widest">EFFICACITÉ</Badge>
                            <h5 className="font-bold text-lg mb-2 group-hover/item:text-amber-400 transition-colors">Goulot d'étranglement</h5>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                L'étape de négociation prend 4 jours de plus que le trimestre dernier. Simplification des modèles recommandée.
                            </p>
                            <Button variant="link" className="text-amber-400 p-0 h-auto mt-4 text-xs font-bold uppercase tracking-widest hover:text-amber-300">
                                Revoir les Modèles <ArrowUpRight size={14} className="ml-1" />
                            </Button>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/item">
                            <Badge className="mb-4 bg-primary/20 text-primary-foreground font-bold tracking-widest border-none">PRÉDICTION IA</Badge>
                            <h5 className="font-bold text-lg mb-2 group-hover/item:text-primary transition-colors">Hausse Q4 des Revenus</h5>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Le pipeline actuel indique une augmentation de 22% des revenus au Q4, grâce aux approbations de permis récentes.
                            </p>
                            <Button variant="link" className="text-primary p-0 h-auto mt-4 text-xs font-bold uppercase tracking-widest hover:text-primary/80">
                                Voir les Prévisions <ArrowUpRight size={14} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
