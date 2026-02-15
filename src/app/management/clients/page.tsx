"use client";

import React, { useState } from "react";
import {
    Search,
    Filter,
    Plus,
    Building,
    Calendar,
    ChevronRight,
    ArrowUpRight,
    Users,
    Zap,
    AlertTriangle,
    Clock,
    Phone,
    MapPin,
    Briefcase,
    MessageSquare,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import { cn, formatDate, formatCurrency } from "@/lib/utils";

export default function ManagementClientsPage() {
    const { clients, projects, tickets } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [industryFilter, setIndustryFilter] = useState("all");

    // Only show "Clients", not "Prospects"
    const convertedClients = clients.filter(c => c.type === "Client");

    const filteredClients = convertedClients.filter((client) => {
        const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.industry.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesIndustry = industryFilter === "all" ? true : client.industry === industryFilter;
        return matchesSearch && matchesIndustry;
    });

    const industries = ["all", ...new Set(convertedClients.map(c => c.industry))];

    const stats = {
        total: convertedClients.length,
        activeProjects: projects.filter(p => p.status === "In Progress").length,
        openTickets: tickets.filter(t => t.status === "Open" || t.status === "In Progress").length,
        totalValue: projects.reduce((acc, p) => acc + p.budget, 0)
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200">
                            <Briefcase size={22} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Portefeuille Clients</h1>
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Gestion des comptes certifiés et VIP
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl font-bold border-2 border-slate-100 hover:bg-slate-50 transition-all flex gap-3 text-slate-600">
                        <TrendingUp size={18} />
                        Analytics
                    </Button>
                    <Button className="h-12 px-8 bg-primary text-white font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex gap-3">
                        <Plus size={18} />
                        Nouveau Compte
                    </Button>
                </div>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ClientStatCard
                    value={stats.total}
                    label="Comptes Actifs"
                    icon={Users}
                    trend="+12%"
                    color="slate"
                />
                <ClientStatCard
                    value={stats.activeProjects}
                    label="Chantiers en cours"
                    icon={Building}
                    trend="+3"
                    color="blue"
                />
                <ClientStatCard
                    value={stats.openTickets}
                    label="Tickets Support"
                    icon={MessageSquare}
                    trend={stats.openTickets > 5 ? "Action requise" : "Stable"}
                    color={stats.openTickets > 5 ? "rose" : "amber"}
                />
                <ClientStatCard
                    value={`${(stats.totalValue / 1000000).toFixed(1)}M`}
                    label="Valeur Portefeuille"
                    icon={Zap}
                    trend="+8.5%"
                    color="emerald"
                    unit="MAD"
                />
            </div>

            {/* Filters & Tools */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden ring-1 ring-slate-100">
                <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center bg-slate-50/50">
                    <div className="flex-1 relative w-full group">
                        <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Rechercher un client, une industrie ou un contact..."
                            className="h-14 pl-14 pr-6 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:border-primary/30 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {industries.map((ind) => (
                            <button
                                key={ind}
                                onClick={() => setIndustryFilter(ind)}
                                className={cn(
                                    "px-6 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 whitespace-nowrap",
                                    industryFilter === ind
                                        ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                                )}
                            >
                                {ind === "all" ? "Toutes Industries" : ind}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Client Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {filteredClients.map((client) => {
                    const clientProjects = projects.filter(p => p.clientId === client.id);
                    const clientTickets = tickets.filter(t => t.clientId === client.id && t.status !== "Closed");

                    return (
                        <Link key={client.id} href={`/clients/${client.id}`}>
                            <Card className="rounded-[3rem] border-none shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden bg-white group cursor-pointer ring-1 ring-slate-100/50">
                                <CardContent className="p-0">
                                    <div className="p-8 flex items-start justify-between">
                                        <div className="flex gap-6">
                                            <div className="w-20 h-20 rounded-[2rem] bg-slate-900 flex items-center justify-center text-white text-2xl font-black shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                                {client.name.charAt(0)}
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">{client.name}</h3>
                                                    {client.isNC && <Badge className="bg-rose-500 text-white border-none animate-bounce"><AlertTriangle size={12} /></Badge>}
                                                </div>
                                                <p className="text-xs font-bold text-primary uppercase tracking-[0.2em]">{client.industry}</p>
                                                <div className="flex items-center gap-4 pt-2">
                                                    <div className="flex items-center gap-1.5 text-slate-400">
                                                        <MapPin size={14} />
                                                        <span className="text-[10px] font-bold uppercase truncate max-w-[150px]">{client.address}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>

                                    {/* Sub-stats for active clients */}
                                    <div className="mx-8 mb-8 p-6 bg-slate-50/50 rounded-[2rem] grid grid-cols-3 gap-4 border border-slate-100">
                                        <div className="text-center space-y-1">
                                            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Chantiers</span>
                                            <span className="block text-lg font-black text-slate-800">{clientProjects.length}</span>
                                        </div>
                                        <div className="text-center space-y-1 border-x border-slate-200">
                                            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Tickets</span>
                                            <span className={cn("block text-lg font-black", clientTickets.length > 0 ? "text-rose-500" : "text-slate-800")}>
                                                {clientTickets.length}
                                            </span>
                                        </div>
                                        <div className="text-center space-y-1">
                                            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Dernier Contact</span>
                                            <span className="block text-[10px] font-bold text-slate-600 mt-2">{formatDate(client.lastInteraction)}</span>
                                        </div>
                                    </div>

                                    <div className="px-8 pb-8 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                                                        <img src={`https://i.pravatar.cc/100?u=${client.id}${i}`} alt="agent" />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Équipe Dédiée</span>
                                        </div>
                                        <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] px-4 py-1.5 rounded-full ring-1 ring-emerald-100/50">
                                            CLIENT CERTIFIÉ
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </div>

            {/* Empty State */}
            {filteredClients.length === 0 && (
                <div className="py-32 flex flex-col items-center justify-center text-center space-y-8 bg-white rounded-[4rem] border-4 border-dashed border-slate-50 shadow-inner">
                    <div className="w-32 h-32 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 shadow-2xl animate-pulse">
                        <Briefcase size={64} />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Aucun Client Identifié</h3>
                        <p className="text-slate-400 font-bold max-w-sm mx-auto uppercase text-xs tracking-widest leading-loose">
                            Votre portefeuille est actuellement vide ou ne correspond pas aux filtres.
                        </p>
                    </div>
                    <Button variant="outline" className="h-14 px-10 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] border-2 border-slate-100 hover:bg-slate-900 hover:text-white transition-all" onClick={() => { setSearchTerm(""); setIndustryFilter("all"); }}>
                        Rénitialiser le Focus
                    </Button>
                </div>
            )}
        </div>
    );
}

function ClientStatCard({ value, label, icon: Icon, trend, color, unit }: any) {
    const themes: any = {
        slate: "bg-slate-900 text-white shadow-slate-200",
        blue: "bg-white text-slate-900 border-slate-100 shadow-sm",
        rose: "bg-white text-rose-600 border-rose-100 shadow-sm",
        amber: "bg-white text-amber-600 border-amber-100 shadow-sm",
        emerald: "bg-white text-emerald-600 border-emerald-100 shadow-sm",
    };

    const isDark = color === "slate";

    return (
        <Card className={cn("rounded-[2.5rem] border-none p-8 flex flex-col relative overflow-hidden transition-all hover:shadow-xl", themes[color])}>
            <div className="flex justify-between items-start mb-6">
                <div className={cn("p-4 rounded-2xl", isDark ? "bg-white/10" : "bg-slate-50")}>
                    <Icon size={24} />
                </div>
                <Badge className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border-none", isDark ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500")}>
                    {trend}
                </Badge>
            </div>
            <div>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tight">{value}</span>
                    {unit && <span className="text-xs font-bold opacity-60 uppercase">{unit}</span>}
                </div>
                <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-2", isDark ? "text-slate-400" : "text-slate-400")}>
                    {label}
                </p>
            </div>

            {/* Background elements for premium feel */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-current opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
        </Card>
    );
}
