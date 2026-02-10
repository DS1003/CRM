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
    LineChart,
    Line,
    Legend
} from "recharts";
import {
    TrendingUp,
    Users,
    Target,
    Zap,
    Download,
    Calendar,
    Filter
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
                    <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
                    <p className="text-muted-foreground mt-1">Granular breakdown of sales productivity and regional conversion rates.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter size={16} />
                        Advanced Filtering
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Calendar size={16} />
                        Last 30 Days
                    </Button>
                    <Button size="sm" className="gap-2">
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
                <Card className="border-none shadow-md">
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
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {conversionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Agent Performance Benchmarking</CardTitle>
                        <CardDescription>Sales volume vs leads handled by top performing agents.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="agent" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-md overflow-hidden bg-slate-900 text-white">
                <CardHeader>
                    <CardTitle className="text-white">AI Strategy Recommendations</CardTitle>
                    <CardDescription className="text-slate-400">NexAI performance optimization suggestions based on historical data.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <Badge variant="success" className="mb-4">OPPORTUNITY</Badge>
                            <h5 className="font-bold mb-2">Upsell Cluster Detected</h5>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Clients in the "Technology" industry are 40% more likely to purchase structural audit services within 6 months of initial onboarding.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <Badge variant="warning" className="mb-4 text-white border-white/40">EFFICIENCY</Badge>
                            <h5 className="font-bold mb-2">Contract Bottleneck</h5>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                The negotiation stage is taking 4 days longer than last quarter. Suggesting template simplification for standard construction projects.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <Badge className="mb-4 bg-primary/20 text-primary-foreground">AI PREDICTION</Badge>
                            <h5 className="font-bold mb-2">Q4 Revenue Spike</h5>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Current pipeline indicates a 22% increase in Q4 revenue compared to historical averages, driven by recent government permit approvals.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
