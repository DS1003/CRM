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
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-background">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-xl bg-primary/5 text-primary border border-primary/10">
                        <Icon size={24} />
                    </div>
                    <div className={cn(
                        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                        trend === "up" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                    )}>
                        {trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {change}%
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="text-3xl font-bold mt-1 tracking-tight">{value}</h3>
                    <p className="text-xs text-muted-foreground mt-2">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}
