"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
            <Card className="relative overflow-hidden border-none bg-white/[0.02] backdrop-blur-xl group transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-100/50">
                {/* 2026 Reactive Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(var(--primary-rgb),0.03)_0%,transparent_60%)] pointer-events-none" />

                {/* Abstract Shape Background */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-700" />

                <CardContent className="p-6 relative z-10">
                    <div className="flex justify-between items-start mb-5">
                        <div className="p-2.5 rounded-xl bg-slate-50/50 border border-slate-100/50 text-slate-400 group-hover:border-primary/20 group-hover:bg-white group-hover:text-primary transition-all duration-500 shadow-sm">
                            <Icon size={20} strokeWidth={1.5} />
                        </div>
                        {change !== 0 && (
                            <div className={cn(
                                "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-sm transition-all group-hover:scale-105",
                                trend === "up"
                                    ? "bg-emerald-50/50 text-emerald-600 border-emerald-100/50"
                                    : "bg-rose-50/50 text-rose-600 border-rose-100/50"
                            )}>
                                {trend === "up" ? <ArrowUpRight size={12} strokeWidth={2.5} /> : <ArrowDownRight size={12} strokeWidth={2.5} />}
                                {change}%
                            </div>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                            {title}
                        </p>
                        <h3 className="text-3xl font-semibold tracking-tight text-slate-800 tabular-nums">
                            {value}
                        </h3>
                    </div>

                    {description && (
                        <div className="mt-5 pt-4 border-t border-slate-100/30">
                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                                {description}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
