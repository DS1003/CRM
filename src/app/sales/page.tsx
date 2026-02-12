"use client";

import React, { useState } from "react";
import {
    Plus,
    TrendingUp,
    Clock,
    MoreHorizontal,
    ArrowUpRight,
    Search
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import { cn, formatCurrency } from "@/lib/utils";
import { NewDealModal } from "@/components/sales/NewDealModal";

const stages = [
    "New",
    "Qualification",
    "Proposal",
    "Negotiation",
    "Contract Signed"
] as const;

export default function SalesPage() {
    const { leads } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate stats dynamicallly
    const totalPipelineValue = leads.reduce((acc, lead) => acc + lead.value, 0);
    const weightedValue = leads.reduce((acc, lead) => acc + (lead.value * (lead.probability / 100)), 0);
    const avgDealSize = totalPipelineValue / (leads.length || 1);

    // Sort leads by value for now
    const sortedLeads = [...leads].sort((a, b) => b.value - a.value);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sales Pipeline</h1>
                    <p className="text-muted-foreground mt-1">Track weighted deal values and conversion probabilities.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 bg-white/50 border-slate-200">
                        <TrendingUp size={18} />
                        Forecasting
                    </Button>
                    <Button className="gap-2 bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20" onClick={() => setIsModalOpen(true)}>
                        <Plus size={18} />
                        New Deal
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PipelineStat label="Pipeline Value" value={formatCurrency(totalPipelineValue)} change="+12%" />
                <PipelineStat label="Weighted Value" value={formatCurrency(weightedValue)} change="+5%" />
                <PipelineStat label="Avg. Deal Size" value={formatCurrency(avgDealSize)} change="-2%" />
                <PipelineStat label="Win Probability" value={`${Math.round((weightedValue / totalPipelineValue) * 100) || 0}%`} change="+8%" />
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
                {stages.map((stage) => {
                    const stageLeads = sortedLeads.filter(l => l.stage === stage);
                    const totalValue = stageLeads.reduce((acc, current) => acc + current.value, 0);

                    return (
                        <div key={stage} className="min-w-[320px] bg-slate-50/50 rounded-3xl border border-slate-100 p-4 flex flex-col gap-4 shadow-sm">
                            <div className="flex items-center justify-between px-2 pt-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-500">{stage}</h3>
                                    <Badge variant="secondary" className="h-5 px-1.5 min-w-[20px] justify-center bg-white border border-slate-100 text-slate-600 font-bold shadow-sm">{stageLeads.length}</Badge>
                                </div>
                                <span className="text-xs font-bold text-slate-900 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm">{formatCurrency(totalValue / 1000)}k</span>
                            </div>

                            <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                                {stageLeads.map((lead) => (
                                    <Card key={lead.id} className="card-premium group cursor-pointer hover:border-primary/30 border-slate-200/60 shadow-sm bg-white">
                                        <CardContent className="p-4 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-sm text-slate-800 group-hover:text-primary transition-colors">{lead.title}</h4>
                                                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide mt-1">{lead.clientName}</p>
                                                </div>
                                                <button className="text-slate-300 hover:text-slate-600 transition-colors">
                                                    <MoreHorizontal size={14} />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5 text-slate-400">
                                                        <Clock size={12} />
                                                        <span className="text-[10px] font-bold uppercase tracking-tighter">{lead.expectedCloseDate || "No Date"}</span>
                                                    </div>
                                                    <span className="text-sm font-black text-slate-800 block">{formatCurrency(lead.value)}</span>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className="text-[9px] font-black tracking-widest text-slate-300">PROB.</span>
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            "text-[10px] font-bold border-none h-5 px-2 shadow-sm",
                                                            lead.probability > 70 ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100" :
                                                                lead.probability > 40 ? "bg-amber-50 text-amber-600 ring-1 ring-amber-100" : "bg-slate-50 text-slate-500 ring-1 ring-slate-100"
                                                        )}
                                                    >
                                                        {lead.probability}%
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                <Button variant="ghost" className="w-full border-2 border-dashed border-slate-200 text-slate-400 hover:border-primary/30 hover:text-primary hover:bg-primary/5 h-12 gap-2 text-xs font-bold rounded-xl transition-all" onClick={() => setIsModalOpen(true)}>
                                    <Plus size={14} />
                                    Quick Add Deal
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <NewDealModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

function PipelineStat({ label, value, change }: any) {
    const isPositive = change.startsWith("+");
    return (
        <Card className="card-premium h-fit">
            <CardContent className="p-5 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                    <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
                </div>
                <Badge variant={isPositive ? "success" : "destructive"} className="h-6 font-bold">
                    {change}
                </Badge>
            </CardContent>
        </Card>
    );
}
