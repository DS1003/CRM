"use client";

import React, { useState } from "react";
import {
    Users,
    TrendingUp,
    Activity,
    ChevronRight,
    Plus,
    CheckCircle2,
    AlertCircle,
    Clock,
    Calendar,
    Phone,
    ArrowUpRight,
    Zap,
    MessageSquare,
    CheckCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";

export default function DashboardPage() {
    const { user, clients, leads, tickets } = useApp();
    const router = useRouter();
    const [isDealModalOpen, setIsDealModalOpen] = useState(false);

    // Filter logic for "Mes Prospects du jour"
    const today = new Date().toISOString().split('T')[0];
    const myProspectsToday = clients.filter(c => {
        if (user?.role === "MKT" && c.assignedAgentId !== user.id) return false;
        return c.status === "Rappel" && c.nextRecall?.startsWith(today);
    });

    // Urgent Recalls (NextRecall in the past or today)
    const urgentRecalls = clients.filter(c => {
        if (user?.role === "MKT" && c.assignedAgentId !== user.id) return false;
        if (!c.nextRecall) return false;
        return new Date(c.nextRecall) < new Date(Date.now() + 2 * 60 * 60 * 1000); // Past or within 2h
    }).slice(0, 4);

    // BO Tickets (Pending)
    const pendingBOTickets = tickets.filter(t => t.department === "BO" && t.status !== "Closed" && t.status !== "Resolved");

    // Sales: Hot Prospects (Phase Finale or Interest confirmed)
    const hotProspects = clients.filter(c => c.status === "Finale" || (c.type === "Prospect" && c.status === "Rappel"));

    // Supervisor: NC Alerts
    const ncAlerts = clients.filter(c => c.isNC);

    // Dynamic Title for Panel 1
    const panel1Title = user?.role === "Sales" ? "Prospects Chauds" :
        user?.role === "Supervisor" ? "Alerte Non-Concordance" :
            "Mes Prospects du Jour";

    const panel1Data = user?.role === "Sales" ? hotProspects :
        user?.role === "Supervisor" ? ncAlerts :
            myProspectsToday;

    return (
        <div className="relative min-h-[calc(100vh-5rem)]">
            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-10">

                {/* Header */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 pb-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="h-1.5 w-8 bg-primary rounded-full" />
                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">NexCare {user?.role} Portal</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                            Bonjour, <span className="text-primary">{user?.name}</span>
                        </h1>
                        <p className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider pl-1 font-sans">Tableau de bord opérationnel • {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white/50 backdrop-blur-md p-2 rounded-2xl border border-slate-100 flex items-center gap-4 px-4 shadow-sm">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-slate-400 uppercase">Status Système</span>
                                <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> OPTIMAL
                                </span>
                            </div>
                        </div>
                        <Button
                            onClick={() => router.push('/management/clients')}
                            variant="outline"
                            className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 font-bold uppercase tracking-wider h-11 px-8 rounded-xl transition-all shadow-sm"
                        >
                            Comptes Clients
                        </Button>
                        <Button
                            onClick={() => router.push('/clients')}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider h-11 px-8 rounded-xl transition-all shadow-lg shadow-slate-200"
                        >
                            Liste Prospects
                        </Button>
                    </div>
                </div>

                {/* Role-Specific Content */}
                <div className="grid grid-cols-12 gap-8">

                    {/* Left Column: Alerts & Workflows */}
                    <div className="col-span-12 xl:col-span-8 space-y-8">

                        {/* Prospects Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Panel 1: Dynamic focus based on Role */}
                            <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white">
                                <CardHeader className="p-7 pb-4 flex flex-row items-center justify-between border-b border-slate-50">
                                    <div>
                                        <CardTitle className="text-base font-bold text-slate-800 uppercase tracking-tight">{panel1Title}</CardTitle>
                                        <CardDescription className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                            {user?.role === "Supervisor" ? "Dossiers critiques" : "Rappels et RDV"}
                                        </CardDescription>
                                    </div>
                                    <Badge className={cn(
                                        "border-none font-bold px-3 py-1 rounded-lg",
                                        user?.role === "Supervisor" ? "bg-rose-50 text-rose-500" : "bg-primary/5 text-primary"
                                    )}>
                                        {panel1Data.length} {user?.role === "Supervisor" ? "SIGNALEMENTS" : "À TRAITER"}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-slate-50">
                                        {panel1Data.length > 0 ? panel1Data.slice(0, 5).map(prospect => (
                                            <Link key={prospect.id} href={`/clients/${prospect.id}`} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group">
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all",
                                                        user?.role === "Supervisor" ? "bg-rose-50 text-rose-400 group-hover:bg-rose-500" : "bg-slate-100 text-slate-400 group-hover:bg-primary",
                                                        "group-hover:text-white"
                                                    )}>
                                                        {prospect.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{prospect.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{prospect.industry}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    {user?.role === "Supervisor" ? (
                                                        <Badge className="bg-rose-100 text-rose-600 border-none text-[8px] font-black">NC DÉTECTÉ</Badge>
                                                    ) : (
                                                        <>
                                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest">{prospect.nextRecall?.split('T')[1]?.substring(0, 5) || "09:00"}</p>
                                                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mt-0.5">
                                                                <Phone size={12} /> {prospect.status === "Finale" ? "RDV" : "Appel"}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </Link>
                                        )) : (
                                            <div className="p-12 text-center text-slate-400 font-bold text-sm italic">
                                                Aucun dossier à traiter.
                                            </div>
                                        )}
                                    </div>
                                    {panel1Data.length > 5 && (
                                        <Link href="/clients" className="block p-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-t border-slate-50 hover:bg-slate-50 transition-colors">
                                            Voir tout le flux
                                        </Link>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Panel 2: Rappels Urgents */}
                            <Card className="rounded-[2rem] border border-rose-100/50 shadow-sm overflow-hidden bg-rose-50/30">
                                <CardHeader className="p-7 pb-4 flex flex-row items-center justify-between border-b border-rose-100/20">
                                    <div>
                                        <CardTitle className="text-base font-bold text-rose-600 uppercase tracking-tight">Rappels Urgents</CardTitle>
                                        <CardDescription className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider">Dossiers prioritaires</CardDescription>
                                    </div>
                                    <div className="h-9 w-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-200">
                                        <AlertCircle size={18} />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-rose-100/40">
                                        {urgentRecalls.length > 0 ? urgentRecalls.map(prospect => (
                                            <Link key={prospect.id} href={`/clients/${prospect.id}`} className="flex items-center justify-between p-6 hover:bg-white transition-colors group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-rose-500 border border-rose-100 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-sm">
                                                        {prospect.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{prospect.name}</p>
                                                        <p className="text-[10px] font-bold text-rose-400 uppercase mt-0.5">{prospect.isNC ? "NON-CONFORME" : "PROSPECT CHAUD"}</p>
                                                    </div>
                                                </div>
                                                <div className="p-2 px-3 rounded-lg bg-white border border-rose-100 text-rose-600 font-black text-[10px] shadow-sm">
                                                    {formatDate(prospect.nextRecall || "")}
                                                </div>
                                            </Link>
                                        )) : (
                                            <div className="p-12 text-center text-slate-400 font-bold text-sm italic">
                                                Aucune urgence détectée.
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity / Interaction Feed */}
                        <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
                            <CardHeader className="p-7 border-b border-slate-50">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-lg font-bold text-slate-800 uppercase tracking-tight">Activités Récentes</CardTitle>
                                    <Badge variant="secondary" className="px-3 py-1 rounded-full text-[9px] font-bold uppercase">Live Feed</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="space-y-8">
                                    {clients.filter(c => c.interactions.length > 0).slice(0, 3).map(client => (
                                        <div key={client.id} className="flex gap-6 relative">
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                                                client.type === "Client" ? "bg-emerald-500" : "bg-primary"
                                            )} />
                                            <div className="flex-1 space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className={cn(
                                                            "text-[10px] font-black uppercase tracking-[0.2em]",
                                                            client.type === "Client" ? "text-emerald-500" : "text-primary"
                                                        )}>
                                                            {client.type === "Client" ? "🎉 Transformation Client" : "Interaction MKT"}
                                                        </span>
                                                        <h4 className="font-bold text-sm text-slate-800 mt-1">{client.name} - {client.type === "Client" ? "Dossier signé" : "qualification effectuée"}</h4>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-slate-400">{formatDate(client.interactions[0].date)}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
                                                    "{client.interactions[0].comment}"
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: AI Insights & BO Tickets */}
                    <div className="col-span-12 xl:col-span-4 space-y-8">

                        {/* AI Engine Status */}
                        <Card className="rounded-[2rem] bg-slate-900 border-none text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12 transition-transform duration-1000 group-hover:scale-110">
                                <Zap size={120} />
                            </div>
                            <CardHeader className="p-8 relative z-10">
                                <Badge className="bg-primary/20 text-primary border-none mb-4 px-2 py-0.5 font-bold text-[9px] uppercase tracking-wider">IA Prédictive</Badge>
                                <CardTitle className="text-xl font-bold tracking-tight leading-none text-white">Focus Intelligence</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 space-y-6 relative z-10">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed italic border-l-2 border-primary/50 pl-4">
                                        "Optimisation recommandée sur 3 dossiers en phase finale."
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 transition-colors">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Score Qualité Base</p>
                                            <p className="text-xl font-black text-emerald-400">94.2%</p>
                                        </div>
                                        <TrendingUp className="text-emerald-500" size={24} />
                                    </div>
                                    <Button className="w-full bg-white text-slate-900 font-black uppercase tracking-widest h-12 rounded-xl text-[10px] shadow-lg shadow-black/20">
                                        Générer Planning IA
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* BO Tickets Panel */}
                        <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
                            <CardHeader className="p-7 pb-4 flex flex-row items-center justify-between border-b border-slate-50">
                                <div>
                                    <CardTitle className="text-base font-bold text-slate-800 uppercase tracking-tight">Tickets BO</CardTitle>
                                    <CardDescription className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Traitement administratif</CardDescription>
                                </div>
                                <div className="p-1.5 px-3 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs border border-slate-200">
                                    {pendingBOTickets.length}
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-50">
                                    {pendingBOTickets.length > 0 ? pendingBOTickets.slice(0, 4).map(ticket => (
                                        <Link key={ticket.id} href={`/tickets`} className="block p-6 hover:bg-slate-50 transition-colors group">
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge className={cn(
                                                    "text-[9px] font-black uppercase tracking-widest border-none",
                                                    ticket.priority === "High" ? "bg-rose-500 text-white" : "bg-slate-200 text-slate-600"
                                                )}>
                                                    {ticket.priority}
                                                </Badge>
                                                <span className="text-[9px] font-bold text-slate-400">SLA: {formatDate(ticket.slaDeadline)}</span>
                                            </div>
                                            <p className="text-xs font-black text-slate-800 group-hover:text-primary transition-colors">{ticket.subject}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-black text-slate-500">
                                                    {ticket.clientName.charAt(0)}
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400">{ticket.clientName}</span>
                                            </div>
                                        </Link>
                                    )) : (
                                        <div className="p-12 text-center text-slate-400 font-bold text-sm italic">
                                            Aucun ticket en attente. Félicitations !
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
