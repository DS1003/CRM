"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
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
    Zap,
    MessageSquare,
    Send,
    History,
    FileText,
    CreditCard,
    Headset,
    AlertTriangle,
    CheckSquare,
    UserPlus,
    PauseCircle,
    Archive,
    Trash2,
    ChevronRight,
    Smartphone,
    Mail,
    Phone,
    Monitor,
    Smile,
    Frown,
    StickyNote
} from "lucide-react";
import {
    Ticket,
    TicketStatus,
    TicketPriority,
    TicketType,
    TicketChannel,
    TicketTimelineEvent
} from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Dialog, DialogFooter } from "@/components/ui/Dialog";
import { useApp } from "@/context/AppContext";
import { cn, formatDate } from "@/lib/utils";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { motion, AnimatePresence } from "framer-motion";

export default function TicketsPage() {
    const {
        tickets,
        user,
        simulateEscalation,
        updateTicket,
        addTicket,
        clients,
        triggerAutomatedTicket
    } = useApp();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("All");
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
    const [processAction, setProcessAction] = useState<TicketStatus | null>(null);

    // Form states
    const [processNote, setProcessNote] = useState("");
    const [processSummary, setProcessSummary] = useState("");
    const [processSatisfaction, setProcessSatisfaction] = useState<boolean>(true);
    const [processFinalComment, setProcessFinalComment] = useState("");
    const [processConfirmation, setProcessConfirmation] = useState(false);

    const [newTicket, setNewTicket] = useState({
        clientId: "",
        clientName: "",
        subject: "",
        description: "",
        priority: "Medium" as TicketPriority,
        type: "Technical" as TicketType,
        channel: "BO" as TicketChannel,
        department: "BO" as "BO" | "Serv Tech",
        assignedTo: ""
    });

    const isAdmin = user?.role === "Admin";

    // Filtering logic
    const filteredTickets = useMemo(() => {
        return tickets.filter(t => {
            if (t.isArchived && filterStatus !== "Archived") return false;
            if (!t.isArchived && filterStatus === "Archived") return false;

            const matchesSearch =
                t.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = filterStatus === "All" || filterStatus === "Archived" || t.status === filterStatus;

            return matchesSearch && matchesStatus;
        });
    }, [tickets, searchTerm, filterStatus]);

    // KPI Calculations
    const kpis = useMemo(() => {
        const open = tickets.filter(t => !["Closed", "Archived", "Resolved"].includes(t.status)).length;
        const escalated = tickets.filter(t => t.status === "Escalated").length;
        const resolved = tickets.filter(t => t.status === "Resolved" || t.status === "Closed").length;
        const total = tickets.length;
        const slaCompliant = tickets.filter(t => new Date(t.slaDeadline) > new Date() || t.status === "Closed").length;

        return {
            open,
            escalated,
            slaCompliance: total > 0 ? Math.round((slaCompliant / total) * 100) : 100,
            avgResolution: "4.2h" // Simulated
        };
    }, [tickets]);

    // SLA Calculation Helper
    const calculateDeadline = (priority: TicketPriority) => {
        const hours = priority === "High" ? 4 : priority === "Medium" ? 24 : 72;
        return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
    };

    const handleCreateTicket = () => {
        if (!newTicket.clientId || !newTicket.subject || !newTicket.description) return;

        const client = clients.find(c => c.id === newTicket.clientId);

        addTicket({
            ...newTicket,
            clientName: client?.name || "Client Inconnu",
            status: "Open",
            createdAt: new Date().toISOString(),
            slaDeadline: calculateDeadline(newTicket.priority),
            resolutionSummary: "",
            resolutionAction: "",
            finalComment: "",
            department: newTicket.department
        });

        setIsCreateModalOpen(false);
        setNewTicket({
            clientId: "",
            clientName: "",
            subject: "",
            description: "",
            priority: "Medium",
            type: "Technical",
            channel: "BO",
            department: "BO",
            assignedTo: ""
        });
    };

    const handleUpdateStatus = () => {
        if (!selectedTicket || !processAction) return;

        const updates: Partial<Ticket> = { status: processAction };

        if (processAction === "In Progress") {
            if (!processNote) return;
            updates.internalNotes = [...(selectedTicket.internalNotes || []), processNote];
        } else if (processAction === "Resolved") {
            if (!processSummary || !processNote) return;
            updates.resolutionSummary = processSummary;
            updates.resolutionAction = processNote;
        } else if (processAction === "Closed") {
            if (!processConfirmation || !processFinalComment) return;
            updates.satisfaction = processSatisfaction;
            updates.finalComment = processFinalComment;
        }

        updateTicket(selectedTicket.id, updates);
        setIsProcessModalOpen(false);
        setProcessAction(null);
        setProcessNote("");
        setProcessSummary("");
        setProcessFinalComment("");
        setProcessConfirmation(false);
    };

    const handleArchive = (id: string) => {
        if (!isAdmin) return;
        updateTicket(id, { isArchived: true, status: "Archived" });
    };

    const getStatusConfig = (status: TicketStatus) => {
        switch (status) {
            case "Open": return { label: "Ouvert", color: "bg-blue-50/50 text-blue-600 border-blue-100/50", icon: AlertCircle };
            case "Assigned": return { label: "Assigné", color: "bg-indigo-50/50 text-indigo-600 border-indigo-100/50", icon: UserCircle };
            case "In Progress": return { label: "En cours", color: "bg-amber-50/50 text-amber-600 border-amber-100/50", icon: Activity };
            case "Waiting Client": return { label: "Attente Client", color: "bg-purple-50/50 text-purple-600 border-purple-100/50", icon: MessageSquare };
            case "Escalated": return { label: "Escaladé", color: "bg-rose-50/50 text-rose-600 border-rose-100/50", icon: ShieldAlert };
            case "Resolved": return { label: "Résolu", color: "bg-emerald-50/50 text-emerald-600 border-emerald-100/50", icon: CheckCircle2 };
            case "Closed": return { label: "Clos", color: "bg-slate-50 text-slate-500 border-slate-200/50", icon: Archive };
            case "Archived": return { label: "Archivé", color: "bg-slate-50 text-slate-400 border-slate-200/30 opacity-60", icon: Trash2 };
            default: return { label: status, color: "bg-slate-50 text-slate-500", icon: Zap };
        }
    };

    const getTypeIcon = (type: TicketType) => {
        switch (type) {
            case "Complaint": return <AlertTriangle size={14} />;
            case "Technical": return <Zap size={14} />;
            case "NC": return <ShieldAlert size={14} />;
            case "Document": return <FileText size={14} />;
            case "Payment": return <CreditCard size={14} />;
        }
    };

    const getChannelIcon = (channel: TicketChannel) => {
        switch (channel) {
            case "Email": return <Mail size={14} />;
            case "WhatsApp": return <Smartphone size={14} />;
            case "Phone": return <Phone size={14} />;
            case "BO": return <Monitor size={14} />;
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-800">NexCare Service</h1>
                    <p className="text-slate-400 text-xs mt-1 flex items-center gap-2 font-medium">
                        Focus sur l'excellence opérationnelle et la relation client.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-9 text-[11px] px-4 border-slate-200 text-slate-500 font-bold uppercase tracking-wider rounded-lg" onClick={() => simulateEscalation()}>
                        Monitor SLA
                    </Button>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="h-9 px-4 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all"
                    >
                        Nouveau Flux
                    </Button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Requêtes Actives" value={kpis.open.toString()} icon={AlertCircle} description="Flux en attente" trend="up" change={5} />
                <StatsCard title="SLA Compliance" value={`${kpis.slaCompliance}%`} icon={Clock} description="Engagement de service" trend="up" change={2} />
                <StatsCard title="Escalades" value={kpis.escalated.toString()} icon={ShieldAlert} description="Secteurs critiques" trend="down" change={1} />
                <StatsCard title="Taux de Résol." value="98%" icon={CheckCircle2} description="Performance SAV" trend="up" change={0.5} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Ticket List */}
                <Card className="lg:col-span-2 card-premium overflow-hidden border-slate-200/50">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-6 px-8">
                        <div className="flex bg-slate-100/50 p-1.5 rounded-xl border border-slate-200/40">
                            {["All", "Open", "Assigned", "In Progress", "Escalated", "Resolved", "Archived"].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setFilterStatus(s)}
                                    className={cn(
                                        "px-4 py-1.5 text-[11px] font-semibold rounded-lg transition-all",
                                        filterStatus === s ? "bg-white text-slate-900 shadow-sm border border-slate-200/20" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    {s === "All" ? "Tous" : s === "In Progress" ? "En Cours" : s}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-72">
                            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <Input
                                placeholder="Rechercher par client, sujet..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-10 bg-slate-50/50 border-slate-200/60 text-xs font-medium focus:bg-white transition-all rounded-xl shadow-none"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-slate-50 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                                        <th className="py-5 px-8 font-bold">Identité Ticket</th>
                                        <th className="py-5 px-4 font-bold">Classification</th>
                                        <th className="py-5 px-4 font-bold">Échéance SLA</th>
                                        <th className="py-5 px-4 font-bold">Statut</th>
                                        <th className="py-5 px-8 text-right font-bold">Détails</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50/50">
                                    {filteredTickets.map((ticket) => {
                                        const status = getStatusConfig(ticket.status);
                                        const isOverdue = new Date(ticket.slaDeadline) < new Date();

                                        return (
                                            <tr key={ticket.id} className="group hover:bg-slate-50/30 transition-colors">
                                                <td className="py-6 px-8">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className="text-[10px] font-bold text-slate-400 tracking-tight">#{ticket.id}</span>
                                                            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100/50 px-1.5 py-0.5 rounded">
                                                                {ticket.channel}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors cursor-pointer" onClick={() => { setSelectedTicket(ticket); setIsDetailModalOpen(true); }}>
                                                            {ticket.subject}
                                                        </span>
                                                        <span className="text-xs text-slate-500 font-medium mt-1">{ticket.clientName}</span>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-4">
                                                    <div className="space-y-2">
                                                        <div className={cn(
                                                            "inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-tight",
                                                            ticket.priority === "High" ? "bg-rose-50/50 text-rose-600 border-rose-100/50" :
                                                                ticket.priority === "Medium" ? "bg-amber-50/50 text-amber-600 border-amber-100/50" :
                                                                    "bg-emerald-50/50 text-emerald-600 border-emerald-100/50"
                                                        )}>
                                                            {ticket.priority}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-slate-400">
                                                            <span className="text-[10px] font-semibold text-slate-500/70">{ticket.type}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-4">
                                                    <div className="flex flex-col gap-1.5">
                                                        <div className={cn(
                                                            "flex items-center gap-2 text-xs font-medium",
                                                            isOverdue && ticket.status !== "Closed" ? "text-rose-500" : "text-slate-600"
                                                        )}>
                                                            <Clock size={12} className="opacity-60" />
                                                            {formatDate(ticket.slaDeadline)}
                                                        </div>
                                                        {isOverdue && ticket.status !== "Closed" && (
                                                            <span className="text-[9px] font-bold text-rose-500/80 bg-rose-50 px-2 py-0.5 rounded-full w-fit">Retard</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-6 px-4">
                                                    <Badge className={cn("text-[10px] font-semibold border px-2.5 py-1 rounded-full shadow-none", status.color)}>
                                                        <status.icon size={11} className="mr-1.5 opacity-80" />
                                                        {status.label}
                                                    </Badge>
                                                </td>
                                                <td className="py-6 px-8 text-right">
                                                    <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-9 w-9 p-0 hover:bg-slate-100 hover:text-primary rounded-xl transition-all"
                                                            onClick={() => { setSelectedTicket(ticket); setIsDetailModalOpen(true); }}
                                                        >
                                                            <ChevronRight size={18} />
                                                        </Button>
                                                        {isAdmin && !ticket.isArchived && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-9 w-9 p-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                                                onClick={() => handleArchive(ticket.id)}
                                                            >
                                                                <Archive size={16} />
                                                            </Button>
                                                        )}
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

                {/* Automation & Insights */}
                <div className="space-y-6">
                    <Card className="card-premium bg-slate-900 text-white overflow-hidden group border-none shadow-xl shadow-slate-200/50">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                            <Zap size={100} />
                        </div>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
                                <ShieldAlert size={18} className="text-primary/80" />
                                NexCare Intelligence
                            </CardTitle>
                            <CardDescription className="text-white/40 font-medium">Auto-monitoring de la relation client</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 relative z-10 pb-8">
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <span className="text-[10px] font-bold text-primary/70 uppercase tracking-widest block mb-2">Statut Monitor</span>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                                    <p className="text-xs font-semibold text-slate-300">Flux SAV opérationnels</p>
                                </div>
                            </div>
                            <Button className="w-full bg-white hover:bg-white/90 text-slate-900 font-bold h-11 transition-all rounded-xl" variant="secondary">
                                <Activity size={16} className="mr-2" />
                                Rapport Analytique
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="card-premium border-slate-200/50 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                            <CardTitle className="text-[11px] font-bold uppercase tracking-widest text-slate-400 flex items-center justify-between">
                                Simulations Système
                                <Zap size={14} className="text-amber-400 opacity-60" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-2.5 p-5">
                            <Button variant="outline" className="text-[10px] font-bold h-11 border-slate-100 hover:border-rose-100 hover:bg-rose-50/30 transition-all rounded-xl shadow-none" onClick={() => triggerAutomatedTicket({ type: "NC", clientId: "c1", clientName: "Acme" })}>
                                Alerte NC
                            </Button>
                            <Button variant="outline" className="text-[10px] font-bold h-11 border-slate-100 hover:border-amber-100 hover:bg-amber-50/30 transition-all rounded-xl shadow-none" onClick={() => triggerAutomatedTicket({ type: "Reclamation", clientId: "c2", clientName: "Global" })}>
                                Réclam.
                            </Button>
                            <Button variant="outline" className="text-[10px] font-bold h-11 border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all rounded-xl shadow-none" onClick={() => triggerAutomatedTicket({ type: "Tech", clientId: "c3", clientName: "Skyline" })}>
                                Incident Tech
                            </Button>
                            <Button variant="outline" className="text-[10px] font-bold h-11 border-slate-100 hover:border-purple-100 hover:bg-purple-50/30 transition-all rounded-xl shadow-none" onClick={() => triggerAutomatedTicket({ type: "DocRequest", clientId: "c1", clientName: "Acme" })}>
                                Requis Doc
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="card-premium border-slate-200/50 shadow-sm overflow-hidden">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-900">
                                <History size={18} className="text-primary/70" />
                                Lifecycle Flux
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                            <div className="space-y-6">
                                {[
                                    { s: "Open", d: "Dépôt et qualification" },
                                    { s: "In Progress", d: "Traitement et logging" },
                                    { s: "Waiting", d: "Action client requise" },
                                    { s: "Resolved", d: "Solution implémentée" },
                                    { s: "Closed", d: "Validation satisfaction" }
                                ].map((step, idx) => (
                                    <div key={step.s} className="flex gap-4">
                                        <div className="flex flex-col items-center pt-1">
                                            <div className={cn(
                                                "w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] font-bold",
                                                idx === 0 ? "border-primary/40 bg-primary/5 text-primary" : "border-slate-100 bg-slate-50 text-slate-400"
                                            )}>
                                                {idx + 1}
                                            </div>
                                            {idx !== 4 && <div className="flex-1 w-px bg-slate-100 my-1" />}
                                        </div>
                                        <div className="pt-1">
                                            <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">{step.s}</p>
                                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-1">{step.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Create Ticket Modal */}
            <Dialog
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Ouverture Nouveau Flux SAV"
                description="Initialisation d'un ticket omnicanal pour le service support."
                className="max-w-2xl rounded-3xl"
            >
                <div className="grid grid-cols-2 gap-6 py-6">
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Client émetteur</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 h-11 text-sm font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all appearance-none"
                                value={newTicket.clientId}
                                onChange={(e) => setNewTicket({ ...newTicket, clientId: e.target.value })}
                            >
                                <option value="">Sélect. Client...</option>
                                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Titre de la requête</label>
                            <Input
                                placeholder="ex: Problème structurel..."
                                className="bg-slate-50 border-slate-200 h-11 text-sm font-semibold rounded-2xl focus:bg-white"
                                value={newTicket.subject}
                                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Type</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 h-11 text-sm font-semibold"
                                    value={newTicket.type}
                                    onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value as TicketType })}
                                >
                                    <option value="Technical">Technique</option>
                                    <option value="Complaint">Réclamation</option>
                                    <option value="NC">Non-Conformité</option>
                                    <option value="Document">Documentaire</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Urgence (SLA)</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 h-11 text-sm font-semibold"
                                    value={newTicket.priority}
                                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as TicketPriority })}
                                >
                                    <option value="High">Haute (4h)</option>
                                    <option value="Medium">Moyenne (24h)</option>
                                    <option value="Low">Basse (72h)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Description détaillée</label>
                            <textarea
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-semibold min-h-[155px] outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-slate-900"
                                placeholder="Détaillez l'incident ou la demande..."
                                value={newTicket.description}
                                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Canal</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 h-11 text-sm font-semibold"
                                    value={newTicket.channel}
                                    onChange={(e) => setNewTicket({ ...newTicket, channel: e.target.value as TicketChannel })}
                                >
                                    <option value="BO">Back Office</option>
                                    <option value="Email">Email</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                    <option value="Phone">Téléphone</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Service</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 h-11 text-sm font-semibold"
                                    value={newTicket.department}
                                    onChange={(e) => setNewTicket({ ...newTicket, department: e.target.value as 'BO' | 'Serv Tech' })}
                                >
                                    <option value="BO">BO Admin</option>
                                    <option value="Serv Tech">Service Technique</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter className="border-t border-slate-100/60 pt-6">
                    <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)} className="rounded-xl font-semibold">Annuler</Button>
                    <Button onClick={handleCreateTicket} className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 rounded-xl h-11">Activer le Ticket</Button>
                </DialogFooter>
            </Dialog>

            {/* Ticket Detail Modal */}
            <Dialog
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                className="max-w-4xl !p-0 overflow-hidden rounded-[1.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40"
            >
                {selectedTicket && (
                    <div className="flex flex-col lg:flex-row h-[75vh] max-h-[750px] overflow-hidden bg-white">
                        {/* Main Info Column */}
                        <div className="flex-1 overflow-y-auto thin-scrollbar p-8 lg:p-10 space-y-10">
                            {/* Header Section */}
                            <div className="flex justify-between items-start gap-8">
                                <div className="space-y-3.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-bold text-slate-300 tracking-[0.1em] uppercase">Flux #{selectedTicket.id}</span>
                                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                                        <Badge variant="outline" className={cn("text-[8px] font-semibold px-2 py-0 border-none rounded-full bg-transparent shadow-none capitalize", getStatusConfig(selectedTicket.status).color.split(' ')[1])}>
                                            {getStatusConfig(selectedTicket.status).label}
                                        </Badge>
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-800 tracking-tight leading-snug max-w-lg">
                                        {selectedTicket.subject}
                                    </h2>
                                    <div className="flex items-center gap-2.5 pt-0.5">
                                        <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-primary font-bold text-[9px] border border-slate-100/60">
                                            {selectedTicket.clientName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Émetteur</p>
                                            <p className="text-[11px] font-medium text-slate-600">{selectedTicket.clientName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden sm:block shrink-0">
                                    <div className="bg-slate-50/20 rounded-xl p-3 border border-slate-100/60">
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mb-0.5">Deadline</p>
                                                <p className={cn("text-[11px] font-semibold", new Date(selectedTicket.slaDeadline) < new Date() ? "text-rose-500" : "text-slate-500")}>
                                                    {formatDate(selectedTicket.slaDeadline)}
                                                </p>
                                            </div>
                                            <Clock size={14} className={new Date(selectedTicket.slaDeadline) < new Date() ? "text-rose-400" : "text-slate-300"} strokeWidth={2} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2 space-y-3">
                                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                                        Synthèse descriptive
                                    </p>
                                    <div className="p-5 bg-slate-50/20 rounded-xl border border-dotted border-slate-200">
                                        <p className="text-[13px] font-medium text-slate-500 leading-relaxed italic">
                                            "{selectedTicket.description}"
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-6">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Classification</span>
                                        <span className="text-[10px] font-semibold text-slate-600">{selectedTicket.type}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Canal</span>
                                        <div className="flex items-center gap-2 font-semibold text-slate-600 text-[10px]">
                                            {getChannelIcon(selectedTicket.channel)}
                                            {selectedTicket.channel}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center px-1 pt-3 border-t border-slate-50">
                                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Responsable</span>
                                        <span className="text-[9px] font-bold text-primary/60 px-2 py-0.5 bg-primary/5 rounded-full border border-primary/10">
                                            @{selectedTicket.assignedTo.replace(/\s+/g, '').toLowerCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Internal Notes */}
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-primary/20 rounded-full" />
                                    Notes & Diagnostics
                                </h3>
                                <div className="space-y-3">
                                    {selectedTicket.internalNotes?.map((note: string, i: number) => (
                                        <div key={i} className="p-4 bg-white border border-slate-50 rounded-xl text-[12px] font-medium text-slate-500 flex gap-4 hover:border-slate-100 transition-all">
                                            <span className="text-[9px] font-bold text-slate-200 mt-0.5">#{i + 1}</span>
                                            <p className="leading-relaxed">{note}</p>
                                        </div>
                                    ))}
                                    {(!selectedTicket.internalNotes || selectedTicket.internalNotes.length === 0) && (
                                        <div className="py-12 text-center border border-dashed border-slate-100 rounded-xl text-slate-300 text-[10px] font-medium italic">
                                            Aucun diagnostic enregistré.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Resolution Section if applicable */}
                            {(selectedTicket.status === "Resolved" || selectedTicket.status === "Closed") && (
                                <div className="p-8 bg-emerald-50/20 rounded-[2rem] border border-emerald-100/30 space-y-6">
                                    <h3 className="text-base font-bold text-emerald-700/80 flex items-center gap-2.5">
                                        <CheckSquare size={18} />
                                        Résolution SAV
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-emerald-600/40 uppercase tracking-widest">Synthèse</p>
                                            <p className="text-sm font-medium text-emerald-800/70 leading-relaxed italic">"{selectedTicket.resolutionSummary}"</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-emerald-600/40 uppercase tracking-widest">Mesure Corrective</p>
                                            <p className="text-sm font-medium text-emerald-800/80 leading-relaxed bg-white/40 p-4 rounded-xl border border-emerald-100/20">
                                                {selectedTicket.resolutionAction}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Timeline / Action Sidebar */}
                        <div className="w-full lg:w-[320px] bg-slate-50/30 border-l border-slate-50 flex flex-col h-full">
                            <div className="p-8 flex flex-col h-full">
                                <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-8 px-1">
                                    Transaction Log
                                </h3>

                                <div className="flex-1 overflow-y-auto thin-scrollbar px-1 mb-6 min-h-0 relative">
                                    <div className="absolute left-[2.5px] top-2 bottom-0 w-[0.5px] bg-slate-100" />
                                    <div className="space-y-0 relative">
                                        {selectedTicket.timeline.map((event: TicketTimelineEvent) => (
                                            <div key={event.id} className="flex gap-4 group">
                                                <div className={cn(
                                                    "w-1.5 h-1.5 rounded-full mt-1.5 z-10 transition-all ring-4 ring-white shrink-0",
                                                    event.type === "escalation" ? "bg-rose-400" :
                                                        event.type === "status_change" ? "bg-primary/50" : "bg-slate-200"
                                                )} />
                                                <div className="flex-1 space-y-1 pb-8">
                                                    <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{formatDate(event.timestamp)}</p>
                                                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed group-hover:text-slate-800 transition-colors">{event.content}</p>
                                                    <p className="text-[8px] text-slate-400 font-medium italic">
                                                        {event.author}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons Area */}
                                <div className="space-y-3 pt-8 border-t border-slate-100 mt-auto bg-transparent z-20">
                                    {selectedTicket.status === "Open" && (
                                        <Button
                                            className="w-full bg-slate-900 text-white font-semibold h-10 rounded-lg shadow-none hover:bg-slate-800 transition-all text-[10px] uppercase tracking-wider"
                                            onClick={() => { setProcessAction("In Progress"); setIsProcessModalOpen(true); setIsDetailModalOpen(false); }}
                                        >
                                            Activer le traitement
                                        </Button>
                                    )}
                                    {selectedTicket.status === "In Progress" && (
                                        <>
                                            <Button
                                                className="w-full bg-slate-900 text-white font-semibold h-10 rounded-lg shadow-none hover:bg-slate-800 transition-all text-[10px] uppercase tracking-wider"
                                                onClick={() => { setProcessAction("Resolved"); setIsProcessModalOpen(true); setIsDetailModalOpen(false); }}
                                            >
                                                Valider Résolution
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="w-full border-slate-200 font-semibold h-10 rounded-lg hover:bg-slate-50 text-slate-500 text-[9px] uppercase tracking-widest"
                                                onClick={() => { setProcessAction("Waiting Client"); setIsProcessModalOpen(true); setIsDetailModalOpen(false); }}
                                            >
                                                Requête Client
                                            </Button>
                                        </>
                                    )}
                                    {selectedTicket.status === "Resolved" && (
                                        <Button
                                            className="w-full bg-slate-900 text-white font-semibold h-10 rounded-lg shadow-none hover:bg-slate-800 transition-all text-[10px] uppercase tracking-wider"
                                            onClick={() => { setProcessAction("Closed"); setIsProcessModalOpen(true); setIsDetailModalOpen(false); }}
                                        >
                                            Clôturer le flux
                                        </Button>
                                    )}
                                    {selectedTicket.status === "Escalated" && isAdmin && (
                                        <Button
                                            className="w-full bg-rose-500 text-white font-semibold h-10 rounded-lg shadow-none hover:bg-rose-600 transition-all text-[10px] uppercase tracking-wider"
                                            onClick={() => { setProcessAction("In Progress"); setIsProcessModalOpen(true); setIsDetailModalOpen(false); }}
                                        >
                                            Débloquer
                                        </Button>
                                    )}
                                    {selectedTicket.status === "Waiting Client" && (
                                        <Button
                                            className="w-full bg-slate-900 text-white font-semibold h-10 rounded-lg shadow-none hover:bg-slate-800 transition-all text-[10px] uppercase tracking-wider"
                                            onClick={() => { setProcessAction("In Progress"); setIsProcessModalOpen(true); setIsDetailModalOpen(false); }}
                                        >
                                            Reprendre le flux
                                        </Button>
                                    )}
                                    {selectedTicket.status === "Closed" && (
                                        <div className="p-5 bg-white border border-slate-50 rounded-xl text-center shadow-sm">
                                            <p className="text-[8px] font-bold text-slate-300 uppercase mb-3 tracking-widest">Feedback Client</p>
                                            <div className="flex justify-center flex-col items-center gap-1.5 font-medium">
                                                {selectedTicket.satisfaction ? (
                                                    <>
                                                        <Smile className="text-emerald-400/80" size={32} strokeWidth={1} />
                                                        <span className="text-[9px] text-emerald-500/60 uppercase tracking-widest">Expérience Optimale</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Frown className="text-rose-300/80" size={32} strokeWidth={1} />
                                                        <span className="text-[9px] text-rose-400/60 uppercase tracking-widest">Insatisfaction</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>

            {/* Workflow Processing Modal */}
            <Dialog
                isOpen={isProcessModalOpen}
                onClose={() => setIsProcessModalOpen(false)}
                title={
                    processAction === "In Progress" ? "Prise en charge incidente" :
                        processAction === "Resolved" ? "Validation de résolution" :
                            processAction === "Closed" ? "Clôture de flux SAV" :
                                "Action Requise"
                }
                className="max-w-md rounded-3xl"
            >
                <div className="py-6 space-y-6">
                    {processAction === "In Progress" && (
                        <div className="space-y-5">
                            <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50 text-xs font-semibold text-amber-700 leading-relaxed flex gap-3">
                                <AlertTriangle size={18} className="shrink-0" />
                                <p>Un diagnostic initial est requis pour activer le passage en cours de traitement.</p>
                            </div>
                            <textarea
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-semibold min-h-[140px] outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-slate-900"
                                placeholder="Détaillez votre plan d'action..."
                                value={processNote}
                                onChange={(e) => setProcessNote(e.target.value)}
                            />
                        </div>
                    )}

                    {processAction === "Resolved" && (
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Solution technique</label>
                                <Input
                                    className="h-11 font-semibold rounded-2xl bg-slate-50 focus:bg-white"
                                    placeholder="ex: Correctif structurel appliqué"
                                    value={processSummary}
                                    onChange={(e) => setProcessSummary(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Log d'intervention</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-semibold min-h-[120px] outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-slate-900"
                                    placeholder="Décrivez les étapes finales..."
                                    value={processNote}
                                    onChange={(e) => setProcessNote(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {processAction === "Closed" && (
                        <div className="space-y-8">
                            <div className="flex justify-between items-center p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                                <span className="text-sm font-bold text-slate-700">Satisfaction Client</span>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setProcessSatisfaction(true)}
                                        className={cn("p-2.5 rounded-xl transition-all shadow-sm", processSatisfaction ? "bg-emerald-500 text-white" : "bg-white text-slate-300 border border-slate-100 hover:text-slate-500")}
                                    >
                                        <Smile size={24} />
                                    </button>
                                    <button
                                        onClick={() => setProcessSatisfaction(false)}
                                        className={cn("p-2.5 rounded-xl transition-all shadow-sm", !processSatisfaction ? "bg-rose-500 text-white" : "bg-white text-slate-300 border border-slate-100 hover:text-slate-500")}
                                    >
                                        <Frown size={24} />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Conclusion Archivage</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-semibold min-h-[100px]"
                                    placeholder="Bilan final de la relation sur ce ticket..."
                                    value={processFinalComment}
                                    onChange={(e) => setProcessFinalComment(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10 cursor-pointer shadow-sm shadow-blue-900/5 transition-all hover:bg-primary/10" onClick={() => setProcessConfirmation(!processConfirmation)}>
                                <div className={cn("w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all", processConfirmation ? "bg-primary border-primary text-white" : "border-slate-300 bg-white shadow-inner")}>
                                    {processConfirmation && <CheckSquare size={16} />}
                                </div>
                                <span className="text-xs font-bold text-slate-700">Je valide la clôture définitive du flux.</span>
                            </div>
                        </div>
                    )}

                    {processAction === "Waiting Client" && (
                        <div className="space-y-5">
                            <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                                <p className="text-xs font-semibold text-indigo-700 leading-relaxed italic">
                                    Notification automatique via {selectedTicket?.channel || 'BO'}.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Objet de la demande</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-semibold min-h-[120px]"
                                    placeholder="ex: Manque photos justificatives..."
                                    value={processNote}
                                    onChange={(e) => setProcessNote(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter className="pt-6 border-t border-slate-100/60">
                    <Button variant="ghost" onClick={() => setIsProcessModalOpen(false)} className="rounded-xl font-semibold">Annuler</Button>
                    <Button
                        onClick={handleUpdateStatus}
                        disabled={
                            (processAction === "In Progress" && !processNote) ||
                            (processAction === "Resolved" && (!processSummary || !processNote)) ||
                            (processAction === "Closed" && (!processConfirmation || !processFinalComment)) ||
                            (processAction === "Waiting Client" && !processNote)
                        }
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 rounded-xl transition-all"
                    >
                        Confirmer Action
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
