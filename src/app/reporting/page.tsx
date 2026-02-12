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
    { name: "Qualified", value: 85, color: "#60a5fa" },
    { name: "Negotiation", value: 42, color: "#fb923c" },
    { name: "Won", value: 28, color: "#10b981" },
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
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Performance Analytics</h1>
                    <p className="text-muted-foreground mt-1">Granular breakdown of sales productivity and regional conversion rates.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2 bg-white/50 border-slate-200">
                        <Filter size={16} />
                        Advanced Filtering
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-white/50 border-slate-200">
                        <Calendar size={16} />
                        Last 30 Days
                    </Button>
                    <Button size="sm" className="gap-2 bg-slate-900 text-white shadow-lg shadow-slate-900/20">
                        <Download size={16} />
                        Export Data
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Conversion Rate"
                    value="12.4%"
                    change={2.1}
                    trend="up"
                    icon={Zap}
                    description="Total lead-to-won contract percentage"
                />
                <StatsCard
                    title="Sales Velocity"
                    value="18 Days"
                    change={1.5}
                    trend="up"
                    icon={TrendingUp}
                    description="Average time to close a deal"
                />
                <StatsCard
                    title="Lead Quality"
                    value="7.2/10"
                    change={0.4}
                    trend="down"
                    icon={Target}
                    description="Self-reported lead health score"
                />
                <StatsCard
                    title="CAC Ratio"
                    value="1:4.2"
                    change={12.0}
                    trend="up"
                    icon={Users}
                    description="Customer Acquisition Cost vs LTV"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-premium">
                    <CardHeader>
                        <CardTitle>Sales Conversion Funnel</CardTitle>
                        <CardDescription>Number of leads transitioning through each pipeline stage.</CardDescription>
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
                        <CardTitle>Agent Performance Benchmarking</CardTitle>
                        <CardDescription>Sales volume vs leads handled by top performing agents.</CardDescription>
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
                        AI Strategy Recommendations
                        <Badge variant="secondary" className="bg-white/10 text-white border-white/20">BETA</Badge>
                    </CardTitle>
                    <CardDescription className="text-slate-400">NexAI performance optimization suggestions based on historical data.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/item">
                            <Badge variant="success" className="mb-4 font-bold tracking-widest">OPPORTUNITY</Badge>
                            <h5 className="font-bold text-lg mb-2 group-hover/item:text-emerald-400 transition-colors">Upsell Cluster Detected</h5>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Clients in the "Technology" industry are 40% more likely to purchase structural audit services within 6 months of initial onboarding.
                            </p>
                            <Button variant="link" className="text-emerald-400 p-0 h-auto mt-4 text-xs font-bold uppercase tracking-widest hover:text-emerald-300">
                                View Segment <ArrowUpRight size={14} className="ml-1" />
                            </Button>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/item">
                            <Badge variant="warning" className="mb-4 text-white border-white/40 font-bold tracking-widest">EFFICIENCY</Badge>
                            <h5 className="font-bold text-lg mb-2 group-hover/item:text-amber-400 transition-colors">Contract Bottleneck</h5>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                The negotiation stage is taking 4 days longer than last quarter. Suggesting template simplification for standard construction projects.
                            </p>
                            <Button variant="link" className="text-amber-400 p-0 h-auto mt-4 text-xs font-bold uppercase tracking-widest hover:text-amber-300">
                                Review Templates <ArrowUpRight size={14} className="ml-1" />
                            </Button>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/item">
                            <Badge className="mb-4 bg-primary/20 text-primary-foreground font-bold tracking-widest border-none">AI PREDICTION</Badge>
                            <h5 className="font-bold text-lg mb-2 group-hover/item:text-primary transition-colors">Q4 Revenue Spike</h5>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Current pipeline indicates a 22% increase in Q4 revenue compared to historical averages, driven by recent government permit approvals.
                            </p>
                            <Button variant="link" className="text-primary p-0 h-auto mt-4 text-xs font-bold uppercase tracking-widest hover:text-primary/80">
                                See Forecast <ArrowUpRight size={14} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
