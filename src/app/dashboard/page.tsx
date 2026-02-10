"use client";

import React from "react";
import {
    Users,
    Briefcase,
    TrendingUp,
    Activity,
    BrainCircuit,
    ExternalLink,
    ChevronRight,
    Plus
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
import { mockProjects, mockSaleLeads, mockClients } from "@/lib/mock-data";

const revenueData = [
    { month: "Jan", revenue: 450000, target: 400000 },
    { month: "Feb", revenue: 520000, target: 400000 },
    { month: "Mar", revenue: 480000, target: 450000 },
    { month: "Apr", revenue: 610000, target: 450000 },
    { month: "May", revenue: 590000, target: 500000 },
    { month: "Jun", revenue: 720000, target: 500000 },
];

const projectsData = [
    { name: "Active", value: 12, color: "var(--primary)" },
    { name: "Delayed", value: 4, color: "#f59e0b" },
    { name: "Review", value: 6, color: "#10b981" },
    { name: "On Hold", value: 2, color: "#64748b" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Global performance and strategic insights.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                        <ExternalLink size={16} className="mr-2" />
                        Export Report
                    </Button>
                    <Button size="sm">
                        <Plus size={16} className="mr-2" />
                        New Strategic Entry
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Revenue"
                    value="$3.4M"
                    change={12.5}
                    trend="up"
                    icon={TrendingUp}
                    description="Total revenue generated this fiscal year"
                />
                <StatsCard
                    title="Active Projects"
                    value="24"
                    change={8.2}
                    trend="up"
                    icon={Briefcase}
                    description="Projects currently in progress"
                />
                <StatsCard
                    title="Client Growth"
                    value="156"
                    change={4.1}
                    trend="up"
                    icon={Users}
                    description="New clients added this quarter"
                />
                <StatsCard
                    title="Avg. Efficiency"
                    value="92%"
                    change={2.4}
                    trend="down"
                    icon={Activity}
                    description="Operational output vs target"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <Card className="lg:col-span-2 border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Revenue Forecast vs Target</CardTitle>
                        <CardDescription>Monthly comparison of actual revenue against set targets.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="target"
                                    stroke="#cbd5e1"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    fill="none"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* AI Insights Card */}
                <Card className="border-none shadow-lg bg-slate-900 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <BrainCircuit size={120} />
                    </div>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-none">
                                AI INSIGHTS
                            </Badge>
                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Simulation</span>
                        </div>
                        <CardTitle className="text-white">Smart Recommendations</CardTitle>
                        <CardDescription className="text-slate-400">AI-generated analysis of your current business state.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <TrendingUp size={16} />
                                <span className="text-sm font-semibold">Growth Opportunity</span>
                            </div>
                            <p className="text-xs text-slate-300">
                                Manufacturing sector shows 15% higher conversion. Focus Q3 expansion efforts in this industry.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-amber-400">
                                <Activity size={16} />
                                <span className="text-sm font-semibold">Risk Detected</span>
                            </div>
                            <p className="text-xs text-slate-300">
                                "Bridgeport Commercial" project has a 20% probability of delay due to technical validation backlog.
                            </p>
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90 text-white border-none mt-4">
                            Detailed AI Audit
                            <ChevronRight size={16} className="ml-2" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Table */}
                <Card className="lg:col-span-2 border-none shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Sales Activity</CardTitle>
                            <CardDescription>Track the latest movements in your sales pipeline.</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">View All</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b text-left text-xs text-muted-foreground uppercase tracking-wider">
                                        <th className="py-4 font-medium">Deal Plan</th>
                                        <th className="py-4 font-medium">Client</th>
                                        <th className="py-4 font-medium">Value</th>
                                        <th className="py-4 font-medium">Stage</th>
                                        <th className="py-4 font-medium text-right">Probability</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {mockSaleLeads.map((lead) => (
                                        <tr key={lead.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4">
                                                <span className="font-semibold text-sm">{lead.title}</span>
                                            </td>
                                            <td className="py-4 text-sm text-muted-foreground">{lead.clientName}</td>
                                            <td className="py-4 text-sm font-medium">${lead.value.toLocaleString()}</td>
                                            <td className="py-4">
                                                <Badge variant={lead.stage === "Contract Signed" ? "success" : "secondary"}>
                                                    {lead.stage}
                                                </Badge>
                                            </td>
                                            <td className="py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 text-sm font-medium">
                                                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary"
                                                            style={{ width: `${lead.probability}%` }}
                                                        ></div>
                                                    </div>
                                                    {lead.probability}%
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Project Health */}
                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Projects Distribution</CardTitle>
                        <CardDescription>Current projects status across all sectors.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={projectsData} layout="vertical" margin={{ left: -20, right: 20 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500 }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                    {projectsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-slate-50 border flex flex-col items-center">
                                <span className="text-2xl font-bold">18</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">On Schedule</span>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex flex-col items-center">
                                <span className="text-2xl font-bold text-rose-600">4</span>
                                <span className="text-[10px] text-rose-500 uppercase tracking-wider font-bold">Delayed</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
