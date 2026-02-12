"use client";

import React, { useState, useEffect } from "react";
import {
    Ticket,
    AlertCircle,
    Clock,
    CheckCircle2,
    ShieldAlert,
    Filter,
    Search,
    MoreVertical,
    ArrowUpRight,
    Users,
    Activity,
    UserCircle,
    Briefcase,
    Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import { cn, formatDate } from "@/lib/utils";
import { StatsCard } from "@/components/dashboard/StatsCard";

export default function TicketsPage() {
    const { tickets, user, simulateEscalation, updateTicket, triggerAutomatedTicket } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("All");

    // Simulate SLA checks on mount
    useEffect(() => {
        simulateEscalation();
    }, []);

    const role = user?.role || "Admin";

    // Filtering based on role and filters
    const filteredTickets = tickets.filter(ticket => {
        // Role based visibility
        if (role === "Ventes") return false; // Sales cannot close tech tickets (per requirement, but maybe they shouldn't even see them if they are purely tech/admin)
        // Re-read requirement: "Sales cannot close technical tickets". "Super Admin sees all".
        // "BO sees administrative tickets", "Serv Tech sees technical tickets".

        const isBOTicket = ticket.department === "BO";
        const isTechTicket = ticket.department === "Serv Tech";

        if (role === "Ventes") {
            // Sales can maybe see all but not close? The requirement is a bit vague on visibility for sales.
            // Let's assume they see all for context but can't edit.
        } else if (role === "BO" && !isBOTicket) {
            // return false; // Strictly only BO
        } else if (role === "Serv Tech" && !isTechTicket) {
            // return false; // Strictly only Serv Tech
        }
        // Actually, let's stick to the "BO sees administrative tickets" etc.
        if (role === "BO" && ticket.department !== "BO") return false;
        if (role === "Serv Tech" && ticket.department !== "Serv Tech") return false;

        // Search and Status filters
        const matchesSearch = ticket.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || ticket.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    // Stats
    const openCount = tickets.filter(t => t.status === "Open").length;
    const escalatedCount = tickets.filter(t => t.status === "Escalated").length;
    const slaCompCount = tickets.filter(t => new Date(t.slaDeadline) > new Date() || t.status === "Closed").length;
    const slaPercentage = Math.round((slaCompCount / tickets.length) * 100);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High": return "text-rose-600 bg-rose-50 border-rose-100";
            case "Medium": return "text-amber-600 bg-amber-50 border-amber-100";
            case "Low": return "text-emerald-600 bg-emerald-50 border-emerald-100";
            default: return "text-slate-600 bg-slate-50 border-slate-100";
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Open": return <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100 font-bold">OUVERT</Badge>;
            case "In Progress": return <Badge variant="secondary" className="bg-amber-50 text-amber-600 border-amber-100 font-bold">EN COURS</Badge>;
            case "Escalated": return <Badge variant="destructive" className="animate-pulse font-bold tracking-wider">ESCALADÉ</Badge>;
            case "Closed": return <Badge variant="success" className="font-bold">CLOS</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tickets & SAV Service</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Gestion des réclamations, support technique et conformité SLA.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 bg-white border-slate-200">
                        <Activity size={18} />
                        Rapports SLA
                    </Button>
                    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 ml-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-3 flex items-center">Simuler :</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-[9px] font-black hover:bg-rose-50 text-rose-500"
                            onClick={() => triggerAutomatedTicket({ type: "NC", clientId: "c1", clientName: "Acme Corp" })}
                        >
                            NC
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-[9px] font-black hover:bg-rose-50 text-rose-500"
                            onClick={() => triggerAutomatedTicket({ type: "Reclamation", clientId: "c2", clientName: "Global Tech" })}
                        >
                            RÉCLAM.
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-[9px] font-black hover:bg-blue-50 text-blue-500"
                            onClick={() => triggerAutomatedTicket({ type: "Tech", clientId: "c3", clientName: "Skyline" })}
                        >
                            TECH
                        </Button>
                    </div>
                    <Button className="gap-2 bg-slate-900 text-white font-bold shadow-lg shadow-slate-900/20">
                        <Zap size={18} />
                        Nouveau Ticket
                    </Button>
                </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Tickets Ouverts"
                    value={openCount.toString()}
                    change={-12}
                    trend="up"
                    icon={AlertCircle}
                    description="Total des incidents actifs"
                />
                <StatsCard
                    title="Conformité SLA"
                    value={`${slaPercentage}%`}
                    change={3.2}
                    trend="up"
                    icon={Clock}
                    description="Tickets résolus dans les temps"
                />
                <StatsCard
                    title="Escalades Critiques"
                    value={escalatedCount.toString()}
                    change={8}
                    trend="down"
                    icon={ShieldAlert}
                    description="Nécessite une action immédiate"
                />
                <StatsCard
                    title="Départements"
                    value="BO / Tech"
                    change={0}
                    trend="up"
                    icon={Users}
                    description="Répartition Services Support"
                />
            </div>

            <Card className="card-premium">
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-6">
                    <div>
                        <CardTitle>Registre des Incidents & Requêtes</CardTitle>
                        <CardDescription>Vue omnicanale des tickets de support client.</CardDescription>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative w-72">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <Input
                                placeholder="Rechercher ticket, client, sujet..."
                                className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors text-xs font-semibold"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                            {["All", "Open", "Escalated", "Closed"].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setFilterStatus(s)}
                                    className={cn(
                                        "px-4 py-1.5 text-[10px] uppercase font-black tracking-widest rounded-lg transition-all",
                                        filterStatus === s ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    {s === "All" ? "Tous" : s === "Open" ? "Ouverts" : s === "Escalated" ? "Escaladés" : "Clos"}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left border-b border-slate-50 text-[10px] text-slate-400 uppercase tracking-widest font-black">
                                    <th className="py-4 px-6">ID & Client</th>
                                    <th className="py-4 px-4">Sujet & Qualification</th>
                                    <th className="py-4 px-4">Priorité</th>
                                    <th className="py-4 px-4">SLA Deadline</th>
                                    <th className="py-4 px-4">Affecté à</th>
                                    <th className="py-4 px-4">Statut</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredTickets.map((ticket) => {
                                    const isSLAExpiringSoon = new Date(ticket.slaDeadline).getTime() - new Date().getTime() < 86400000;
                                    const isOverdue = new Date(ticket.slaDeadline) < new Date();

                                    return (
                                        <tr key={ticket.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-500 mb-0.5">#{ticket.id}</span>
                                                    <span className="text-sm font-bold text-slate-900">{ticket.clientName}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-800 line-clamp-1">{ticket.subject}</span>
                                                    <span className="text-[10px] text-primary font-black uppercase tracking-wider mt-1">{ticket.qualification}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className={cn("inline-flex px-2 py-1 rounded-md border text-[10px] font-black uppercase tracking-widest", getPriorityColor(ticket.priority))}>
                                                    {ticket.priority === "High" ? "HAUTE" : ticket.priority === "Medium" ? "MOYENNE" : "BASSE"}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "p-1.5 rounded-lg",
                                                        isOverdue ? "bg-rose-50 text-rose-500" : isSLAExpiringSoon ? "bg-amber-50 text-amber-500" : "bg-slate-50 text-slate-400"
                                                    )}>
                                                        <Clock size={14} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className={cn("text-xs font-bold", isOverdue ? "text-rose-600" : "text-slate-700")}>
                                                            {formatDate(ticket.slaDeadline)}
                                                        </span>
                                                        {isOverdue && ticket.status !== "Closed" && (
                                                            <span className="text-[9px] text-rose-500 font-black uppercase">RETARD SLA</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                        {ticket.assignedTo.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-slate-700">{ticket.assignedTo}</span>
                                                        <span className="text-[9px] text-slate-400 font-bold uppercase">{ticket.department}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                {getStatusBadge(ticket.status)}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-primary"
                                                        onClick={() => updateTicket(ticket.id, { status: "In Progress" })}
                                                        disabled={ticket.status === "Closed"}
                                                    >
                                                        Traiter
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="h-8 text-[10px] font-bold uppercase tracking-widest bg-slate-900 text-white shadow-md disabled:bg-slate-100 disabled:text-slate-400"
                                                        onClick={() => updateTicket(ticket.id, { status: "Closed" })}
                                                        disabled={ticket.status === "Closed" || (role === "Ventes" && ticket.department === "Serv Tech")}
                                                    >
                                                        Clore
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-premium bg-slate-50/50 border-slate-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Briefcase size={20} className="text-primary" />
                            Répartition par Département
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center py-6">
                        <div className="flex gap-12">
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full border-[6px] border-primary flex items-center justify-center">
                                    <span className="text-xl font-black">{tickets.filter(t => t.department === "BO").length}</span>
                                </div>
                                <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Back Office</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full border-[6px] border-slate-900 flex items-center justify-center">
                                    <span className="text-xl font-black">{tickets.filter(t => t.department === "Serv Tech").length}</span>
                                </div>
                                <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Service Tech</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="card-premium bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
                        <ShieldAlert size={120} />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-white">Auto-Escalade IA Modernys</CardTitle>
                        <CardDescription className="text-slate-400">Surveillance proactive des délais SLA en temps réel.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 relative z-10">
                        <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium">
                            Le système détecte automatiquement les tickets dont le délai est dépassé et les escalade vers le responsable de département correspondant.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl">
                                <span className="text-[10px] font-black text-primary uppercase block mb-1">Dernier Check-up</span>
                                <span className="text-sm font-bold">À l'instant</span>
                            </div>
                            <div className="flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl">
                                <span className="text-[10px] font-black text-amber-500 uppercase block mb-1">Actions auto effectuées</span>
                                <span className="text-sm font-bold">2 Escalades</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
