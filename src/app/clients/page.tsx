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
    User,
    Sparkles
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import { NewClientModal } from "@/components/clients/NewClientModal";
import { cn, formatDate } from "@/lib/utils";

export default function ClientsPage() {
    const { clients, user } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");

    // Filtering logic based on Role and Filters
    const prospectsOnly = clients.filter(c => c.type === "Prospect");

    const filteredClients = prospectsOnly.filter((client) => {
        const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.industry.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" ? true :
            statusFilter === "nc" ? client.isNC :
                client.status === statusFilter;

        if (user?.role === "MKT") {
            return matchesSearch && matchesStatus && client.assignedAgentId === user.id;
        }

        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: prospectsOnly.length,
        rappel: prospectsOnly.filter(c => c.status === "Rappel").length,
        finale: prospectsOnly.filter(c => c.status === "Finale").length,
        nc: prospectsOnly.filter(c => c.isNC).length
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Block */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md">
                            <Users size={18} />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Base de Prospection</h1>
                    </div>
                    <p className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider pl-1 font-sans">
                        Filtre d'acquisition et qualification initiale
                    </p>
                </div>
                <Button
                    className="h-11 px-8 bg-slate-900 text-white font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex gap-3"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus size={18} />
                    Nouveau Prospect
                </Button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ProspectStat value={stats.total} label="Total Prospects" icon={Users} color="slate" />
                <ProspectStat value={stats.rappel} label="À Rappeler" icon={Clock} color="amber" />
                <ProspectStat value={stats.finale} label="Phase Finale" icon={Zap} color="emerald" />
                <ProspectStat value={stats.nc} label="Non-Conformes" icon={AlertTriangle} color="rose" />
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Rechercher par nom, secteur..."
                        className="h-12 pl-12 pr-6 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm focus:border-primary/30 transition-all outline-none placeholder:font-normal"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    <FilterButton active={statusFilter === "all"} onClick={() => setStatusFilter("all")} label="Tout" />
                    <FilterButton active={statusFilter === "En attente"} onClick={() => setStatusFilter("En attente")} label="Attente" />
                    <FilterButton active={statusFilter === "Rappel"} onClick={() => setStatusFilter("Rappel")} label="Rappel" />
                    <FilterButton active={statusFilter === "Finale"} onClick={() => setStatusFilter("Finale")} label="Finale" />
                    <FilterButton active={statusFilter === "nc"} onClick={() => setStatusFilter("nc")} label="⚠️ NC" />
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredClients.map((prospect) => (
                    <Link key={prospect.id} href={`/clients/${prospect.id}`} className="group outline-none">
                        <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer overflow-hidden bg-white ring-1 ring-slate-100/50">
                            <CardContent className="p-7 space-y-6">
                                {/* Top Line: Status & Assigned */}
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-2">
                                        <Badge className={cn(
                                            "px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border-none rounded-lg",
                                            prospect.status === "Finale" ? "bg-emerald-500 text-white" :
                                                prospect.status === "Rappel" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-400"
                                        )}>
                                            {prospect.status}
                                        </Badge>
                                        {prospect.isNC && (
                                            <Badge className="bg-rose-100 text-rose-500 border-none p-1.5 rounded-lg animate-pulse" title="Non-Conforme">
                                                <AlertTriangle size={12} />
                                            </Badge>
                                        )}
                                        {prospect.isAIQualified && (
                                            <Badge className="bg-primary/10 text-primary border-none p-1.5 rounded-lg flex items-center gap-1 animate-in zoom-in duration-500" title="Qualifié par IA">
                                                <Sparkles size={12} className="animate-pulse" />
                                                <span className="text-[8px] font-black uppercase tracking-tighter">IA Qualified</span>
                                            </Badge>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">ID: {prospect.id}</span>
                                </div>

                                {/* Main Body */}
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl font-bold text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        {prospect.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-lg font-bold text-slate-800 truncate group-hover:text-primary transition-colors">{prospect.name}</h3>
                                        <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mt-0.5">{prospect.industry}</p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-3 py-4 border-y border-slate-50">
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                        <Phone size={14} className="text-slate-300" />
                                        <span>{prospect.phone}</span>
                                    </div>
                                    {prospect.nextRecall && (
                                        <div className="flex items-center gap-3 text-xs font-bold text-amber-600 bg-amber-50/50 p-2 rounded-xl border border-amber-100/50">
                                            <Clock size={14} className="text-amber-400" />
                                            <span>Rappel : {formatDate(prospect.nextRecall)}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex justify-between items-center pt-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 text-[10px] font-bold ring-1 ring-slate-100">
                                            {prospect.assignedAgentName?.charAt(0) || "A"}
                                        </div>
                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">{prospect.assignedAgentName || "NON ASSIGNÉ"}</span>
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {filteredClients.length === 0 && (
                <div className="py-24 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-slate-200 shadow-xl">
                        <Users size={48} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-700">Aucun Prospect Trouvé</h3>
                        <p className="text-slate-400 font-medium max-w-sm mx-auto">
                            Ajustez vos filtres ou effectuez une nouvelle recherche pour trouver vos dossiers.
                        </p>
                    </div>
                    <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-2" onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}>
                        Réinitialiser les filtres
                    </Button>
                </div>
            )}

            {/* New Prospect Modal Placeholder */}
            {isModalOpen && <NewClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

function ProspectStat({ value, label, icon: Icon, color }: any) {
    const colors: any = {
        slate: "bg-slate-50 text-slate-500 border-slate-100",
        amber: "bg-amber-50 text-amber-500 border-amber-100",
        emerald: "bg-emerald-50 text-emerald-500 border-emerald-100",
        rose: "bg-rose-50 text-rose-500 border-rose-100",
    };

    return (
        <Card className="rounded-[1.5rem] border-none shadow-sm p-6 flex items-center gap-5 transition-all cursor-default relative overflow-hidden bg-white hover:shadow-md">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border", colors[color])}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-2xl font-bold text-slate-800 leading-none">{value}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">{label}</p>
            </div>
        </Card>
    );
}

function FilterButton({ active, label, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-5 h-12 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border",
                active
                    ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-200"
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
            )}
        >
            {label}
        </button>
    );
}
