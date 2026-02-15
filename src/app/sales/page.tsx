"use client";

import React, { useState, useMemo } from "react";
import {
    Plus,
    TrendingUp,
    Clock,
    MoreHorizontal,
    ArrowUpRight,
    Search,
    ChevronRight,
    ChevronLeft,
    Trash2,
    Calendar,
    DollarSign,
    Target,
    BarChart3,
    ArrowRightLeft,
    CheckCircle2,
    Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Dialog, DialogFooter } from "@/components/ui/Dialog";
import { useApp, SaleLead } from "@/context/AppContext";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { NewDealModal } from "@/components/sales/NewDealModal";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
    "Nouveau",
    "Qualification",
    "Proposition",
    "Négociation",
    "Contrat Signé"
] as const;

type StageType = typeof STAGES[number];

export default function SalesPage() {
    const { leads, updateLead, deleteLead, clients } = useApp();
    const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<SaleLead | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Calculate dynamic stats
    const stats = useMemo(() => {
        const total = leads.reduce((acc, l) => acc + l.value, 0);
        const weighted = leads.reduce((acc, l) => acc + (l.value * (l.probability / 100)), 0);
        const signed = leads.filter(l => l.stage === "Contrat Signé").length;
        const conversion = leads.length > 0 ? (signed / leads.length) * 100 : 0;

        return {
            total,
            weighted,
            avgDeal: leads.length > 0 ? total / leads.length : 0,
            conversion: Math.round(conversion)
        };
    }, [leads]);

    const filteredLeads = useMemo(() => {
        return leads.filter(l =>
            l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.clientName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [leads, searchTerm]);

    const handleMoveStage = (leadId: string, currentStage: StageType, direction: 'forward' | 'backward') => {
        const currentIndex = STAGES.indexOf(currentStage);
        let nextIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;

        if (nextIndex >= 0 && nextIndex < STAGES.length) {
            const nextStage = STAGES[nextIndex];
            // Auto-adjust probability based on stage
            const probMap: Record<StageType, number> = {
                "Nouveau": 10,
                "Qualification": 30,
                "Proposition": 50,
                "Négociation": 75,
                "Contrat Signé": 100
            };
            updateLead(leadId, { stage: nextStage, probability: probMap[nextStage] });
        }
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Voulez-vous vraiment supprimer cette opportunité ?")) {
            deleteLead(id);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-800">Pipeline Commercial</h1>
                    <p className="text-slate-400 text-xs mt-1 flex items-center gap-2 font-medium">
                        <TrendingUp size={14} className="text-emerald-500" />
                        Suivi dynamique des opportunités et prévisions de revenus.
                    </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            placeholder="Rechercher un deal..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-10 bg-white/50 border-slate-200/60 text-xs font-medium focus:bg-white transition-all rounded-xl shadow-none"
                        />
                    </div>
                    <Button
                        onClick={() => setIsNewDealModalOpen(true)}
                        className="h-10 px-6 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-slate-200"
                    >
                        <Plus size={16} className="mr-2" />
                        Nouveau Deal
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <LeadStatCard title="Valeur Pipeline" value={formatCurrency(stats.total)} trend="+12.5%" icon={BarChart3} />
                <LeadStatCard title="Valeur Pondérée" value={formatCurrency(stats.weighted)} trend="+8.2%" icon={DollarSign} color="amber" />
                <LeadStatCard title="Panier Moyen" value={formatCurrency(stats.avgDeal)} trend="-2.1%" icon={Target} color="blue" />
                <LeadStatCard title="Taux de Conv." value={`${stats.conversion}%`} trend="+5.4%" icon={CheckCircle2} color="emerald" />
            </div>

            {/* Kanban Board Container */}
            <div className="w-full">
                <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x">
                    {STAGES.map((stage) => {
                        const stageLeads = filteredLeads.filter(l => l.stage === stage);
                        const stageValue = stageLeads.reduce((acc, l) => acc + l.value, 0);

                        return (
                            <div key={stage} className="min-w-[320px] max-w-[320px] flex flex-col gap-5 snap-start">
                                {/* Column Header */}
                                <div className="flex items-center justify-between px-2">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            stage === "Contrat Signé" ? "bg-emerald-500" :
                                                stage === "Négociation" ? "bg-amber-500" :
                                                    stage === "Proposition" ? "bg-blue-500" : "bg-slate-300"
                                        )} />
                                        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stage}</h3>
                                        <span className="bg-slate-100 text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded-full">
                                            {stageLeads.length}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400">
                                        {formatCurrency(stageValue / 1000)}k
                                    </span>
                                </div>

                                {/* Column Content */}
                                <div className="flex flex-col gap-3 min-h-[500px] p-2 bg-slate-50/40 rounded-[2rem] border border-slate-100/50">
                                    <AnimatePresence mode="popLayout">
                                        {stageLeads.map((lead) => (
                                            <motion.div
                                                key={lead.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Card
                                                    className="group bg-white border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden"
                                                    onClick={() => { setSelectedLead(lead); setIsDetailModalOpen(true); }}
                                                >
                                                    <CardContent className="p-5 space-y-5">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="text-sm font-semibold text-slate-800 line-clamp-1 group-hover:text-primary transition-colors">{lead.title}</h4>
                                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{lead.clientName}</p>
                                                            </div>
                                                            <button
                                                                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-all ml-2"
                                                                onClick={(e) => handleDelete(lead.id, e)}
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>

                                                        <div className="flex justify-between items-end">
                                                            <div className="space-y-1.5">
                                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                                    <Clock size={12} className="opacity-60" />
                                                                    <span className="text-[9px] font-bold text-slate-400/80 tracking-tight">
                                                                        {lead.expectedCloseDate ? formatDate(lead.expectedCloseDate) : "À DEFINIR"}
                                                                    </span>
                                                                </div>
                                                                <span className="text-[15px] font-bold text-slate-900">{formatCurrency(lead.value)}</span>
                                                            </div>
                                                            <div className="flex flex-col items-end gap-1.5">
                                                                <div className="flex gap-1">
                                                                    {STAGES.indexOf(stage) > 0 && (
                                                                        <button
                                                                            title="Précédent"
                                                                            className="w-6 h-6 flex items-center justify-center bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 transition-all"
                                                                            onClick={(e) => { e.stopPropagation(); handleMoveStage(lead.id, stage as StageType, 'backward'); }}
                                                                        >
                                                                            <ChevronLeft size={12} />
                                                                        </button>
                                                                    )}
                                                                    {STAGES.indexOf(stage) < STAGES.length - 1 && (
                                                                        <button
                                                                            title="Suivant"
                                                                            className="w-6 h-6 flex items-center justify-center bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 transition-all font-bold"
                                                                            onClick={(e) => { e.stopPropagation(); handleMoveStage(lead.id, stage as StageType, 'forward'); }}
                                                                        >
                                                                            <ChevronRight size={12} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                                <div className={cn(
                                                                    "text-[8px] font-bold px-2 py-0.5 rounded-full",
                                                                    lead.probability > 70 ? "bg-emerald-50 text-emerald-600 rounded" :
                                                                        lead.probability > 30 ? "bg-amber-50 text-amber-600 rounded" : "bg-slate-100 text-slate-500 rounded"
                                                                )}>
                                                                    {lead.probability}%
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {/* Quick action at bottom of col */}
                                    <button
                                        onClick={() => setIsNewDealModalOpen(true)}
                                        className="mt-2 py-4 border-2 border-dashed border-slate-200/50 rounded-[1.5rem] flex flex-col items-center justify-center gap-1.5 text-slate-300 hover:border-slate-300 hover:text-slate-400 transition-all group"
                                    >
                                        <Plus size={16} />
                                        <span className="text-[9px] font-bold uppercase tracking-widest">Nouveau deal</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Lead Detail Dialog */}
            <Dialog
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                className="max-w-2xl rounded-3xl"
            >
                {selectedLead && (
                    <div className="py-6 space-y-8">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <Badge className="bg-primary/10 text-primary border-none text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                                    Opportunité Commerciale
                                </Badge>
                                <h2 className="text-xl font-bold text-slate-800">{selectedLead.title}</h2>
                                <p className="text-slate-500 text-sm font-medium">{selectedLead.clientName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Valeur Potentielle</p>
                                <p className="text-2xl font-black text-slate-900">{formatCurrency(selectedLead.value)}</p>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-2 gap-8 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Étape Actuelle</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <span className="text-sm font-bold text-slate-800">{selectedLead.stage}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Probabilité</p>
                                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                                        <div className="h-full bg-primary" style={{ width: `${selectedLead.probability}%` }} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-600">{selectedLead.probability}% de chance de succès</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Date prévisionnelle</p>
                                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                                        <Calendar size={14} className="text-slate-400" />
                                        {selectedLead.expectedCloseDate ? formatDate(selectedLead.expectedCloseDate) : "Non définie"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-slate-800 uppercase tracking-widest border-l-4 border-primary pl-3">Transactions rapides</p>
                            <div className="grid grid-cols-3 gap-3">
                                <Button variant="outline" className="h-12 text-[10px] font-bold uppercase tracking-wider rounded-xl border-slate-200" onClick={() => setIsDetailModalOpen(false)}>
                                    Fermer
                                </Button>
                                <Button className="h-12 col-span-2 bg-slate-900 font-bold uppercase tracking-wider rounded-xl shadow-lg ring-4 ring-slate-900/5 transition-all">
                                    Ouvrir Dossier Client
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>

            <NewDealModal isOpen={isNewDealModalOpen} onClose={() => setIsNewDealModalOpen(false)} />
        </div>
    );
}

function LeadStatCard({ title, value, trend, icon: Icon, color = "blue" }: any) {
    const isPositive = trend.startsWith("+");

    const colorClasses = {
        blue: "text-blue-500 bg-blue-50/50 border-blue-100",
        emerald: "text-emerald-500 bg-emerald-50/50 border-emerald-100",
        amber: "text-amber-500 bg-amber-50/50 border-amber-100",
        rose: "text-rose-500 bg-rose-50/50 border-rose-100"
    };

    return (
        <Card className="card-premium overflow-hidden border-slate-100 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 relative">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
                        <h3 className="text-xl font-bold text-slate-800">{value}</h3>
                    </div>
                    <div className={cn("p-2.5 rounded-xl border", (colorClasses as any)[color])}>
                        <Icon size={18} />
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <span className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded",
                        isPositive ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"
                    )}>
                        {trend}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">vs mois dernier</span>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full -z-10 opacity-50" />
            </CardContent>
        </Card>
    );
}
