"use client";

import React from "react";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    ArrowRight,
    TrendingUp,
    DollarSign,
    Target,
    Zap,
    ChevronRight,
    Clock,
    MoreHorizontal,
    Trophy
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockSaleLeads } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

const stages = [
    "Prospect",
    "Qualified",
    "Negotiation",
    "Contract Signed",
    "Delivered"
];

export default function SalesPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sales Pipeline</h1>
                    <p className="text-muted-foreground mt-1">Track weighted deal values and conversion probabilities.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <TrendingUp size={18} />
                        Forecasting
                    </Button>
                    <Button className="gap-2">
                        <Plus size={18} />
                        New Deal
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PipelineStat label="Pipeline Value" value="$2.4M" change="+12%" />
                <PipelineStat label="Weighted Value" value="$1.1M" change="+5%" />
                <PipelineStat label="Avg. Deal Size" value="$84k" change="-2%" />
                <PipelineStat label="Win Probability" value="64%" change="+8%" />
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                {stages.map((stage) => {
                    const stageLeads = mockSaleLeads.filter(l => l.stage === stage);
                    const totalValue = stageLeads.reduce((acc, current) => acc + current.value, 0);

                    return (
                        <div key={stage} className="min-w-[320px] bg-slate-50/50 rounded-2xl border border-slate-100 p-4 flex flex-col gap-4">
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">{stage}</h3>
                                    <Badge variant="secondary" className="h-5 px-1.5 min-w-[20px] justify-center bg-slate-200/50 text-slate-500">{stageLeads.length}</Badge>
                                </div>
                                <span className="text-xs font-bold text-slate-900">{formatCurrency(totalValue / 1000)}k</span>
                            </div>

                            <div className="space-y-3 flex-1">
                                {stageLeads.map((lead) => (
                                    <Link key={lead.id} href={`/clients/${lead.clientId}`}>
                                        <Card className="hover:border-primary transition-all cursor-pointer group shadow-sm border-slate-200">
                                            <CardContent className="p-4 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{lead.title}</h4>
                                                        <p className="text-[11px] text-slate-400 font-medium">{lead.clientName}</p>
                                                    </div>
                                                    <button className="text-slate-300 hover:text-slate-600">
                                                        <MoreHorizontal size={14} />
                                                    </button>
                                                </div>

                                                <div className="flex justify-between items-end">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1.5 text-slate-400">
                                                            <Clock size={12} />
                                                            <span className="text-[10px] font-bold uppercase tracking-tighter">{lead.expectedClose}</span>
                                                        </div>
                                                        <span className="text-sm font-black text-slate-800">{formatCurrency(lead.value)}</span>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-1">
                                                        <span className="text-[9px] font-black tracking-widest text-slate-400">WIN PROB.</span>
                                                        <Badge
                                                            variant="outline"
                                                            className={cn(
                                                                "text-[10px] font-bold border-none h-5 px-2",
                                                                lead.probability > 70 ? "bg-emerald-50 text-emerald-600" :
                                                                    lead.probability > 40 ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-500"
                                                            )}
                                                        >
                                                            {lead.probability}%
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}

                                <Button variant="ghost" className="w-full border-2 border-dashed border-slate-100 text-slate-300 hover:border-slate-200 hover:bg-white h-12 gap-2 text-xs font-bold">
                                    <Plus size={14} />
                                    Quick Add Deal
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function PipelineStat({ label, value, change }: any) {
    const isPositive = change.startsWith("+");
    return (
        <Card className="border-none shadow-sm h-fit">
            <CardContent className="p-5 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                    <h3 className="text-2xl font-bold">{value}</h3>
                </div>
                <Badge variant={isPositive ? "success" : "destructive"} className="h-6">
                    {change}
                </Badge>
            </CardContent>
        </Card>
    );
}
