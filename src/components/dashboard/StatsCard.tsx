"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string;
    change: number;
    trend: "up" | "down";
    icon: LucideIcon;
    description: string;
}

export function StatsCard({ title, value, change, trend, icon: Icon, description }: StatsCardProps) {
    return (
        <Card className="card-premium group relative overflow-hidden">
            {/* Subtle reflection effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl transition-opacity group-hover:bg-primary/10" />

            <CardContent className="p-7 relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
                        <Icon size={24} strokeWidth={1.5} />
                    </div>
                    {change !== 0 && (
                        <div className={cn(
                            "flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border shadow-sm transition-transform group-hover:scale-105",
                            trend === "up"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                : "bg-rose-50 text-rose-600 border-rose-100"
                        )}>
                            {trend === "up" ? <ArrowUpRight size={13} strokeWidth={2.5} /> : <ArrowDownRight size={13} strokeWidth={2.5} />}
                            {change}%
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <h3 className="text-3xl font-bold tracking-tight text-slate-800 group-hover:text-primary transition-colors duration-500 leading-none">
                        {value}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-1">
                        {title}
                    </p>
                </div>

                {description && (
                    <div className="mt-6 pt-5 border-t border-slate-100/40">
                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                            {description}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
