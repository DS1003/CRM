"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Building,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ChevronLeft,
    Briefcase,
    MessageSquare,
    Plus,
    Clock,
    CheckCircle2,
    ArrowUpRight,
    User,
    AlertTriangle,
    Zap,
    History,
    MoreHorizontal,
    Pencil,
    CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn, formatDate } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { QualifyInteractionModal } from "@/components/clients/QualifyInteractionModal";
import { EditProspectModal } from "@/components/clients/EditProspectModal";
import { Trash2 } from "lucide-react";

export default function ProspectDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { clients, motifs, convertToClient, deleteClient } = useApp();
    const [isQualifyModalOpen, setIsQualifyModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const prospect = clients.find(c => c.id === id);

    if (!prospect) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <User size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Prospect Introuvable</h2>
                <Button variant="ghost" onClick={() => router.push('/clients')}>Retour à la liste</Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Nav Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <button
                    onClick={() => router.push('/clients')}
                    className="flex items-center gap-3 text-xs font-bold text-slate-400 hover:text-slate-900 transition-all group tracking-wider"
                >
                    <div className="w-7 h-7 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:-translate-x-1 transition-transform">
                        <ChevronLeft size={14} />
                    </div>
                    RETOUR
                </button>
                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        className="h-11 px-6 bg-white hover:bg-rose-50 text-rose-500 border border-slate-200 font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex gap-3"
                        onClick={() => {
                            if (confirm(`Voulez-vous vraiment supprimer le dossier de ${prospect.name} ?`)) {
                                deleteClient(prospect.id);
                                router.push('/clients');
                            }
                        }}
                    >
                        <Trash2 size={16} />
                        Supprimer
                    </Button>
                    <Button
                        onClick={() => setIsEditModalOpen(true)}
                        className="h-11 px-8 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex gap-3"
                    >
                        <Pencil size={16} />
                        Modifier
                    </Button>
                    <Button
                        onClick={() => setIsQualifyModalOpen(true)}
                        className="h-11 px-8 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex gap-3"
                    >
                        <Zap size={16} className="text-primary fill-primary" />
                        Qualifier
                    </Button>

                    {prospect.type === "Prospect" && (
                        <Button
                            onClick={() => {
                                setIsConverting(true);
                                setTimeout(() => {
                                    convertToClient(prospect.id);
                                    setIsConverting(false);
                                    setIsSuccess(true);
                                    setTimeout(() => setIsSuccess(false), 3000);
                                }, 1500);
                            }}
                            disabled={isConverting || isSuccess}
                            className={cn(
                                "h-11 px-8 font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all flex gap-3 items-center group overflow-hidden relative",
                                isSuccess
                                    ? "bg-emerald-500 text-white shadow-emerald-200 scale-105"
                                    : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                            )}
                        >
                            {isConverting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Conversion...
                                </div>
                            ) : isSuccess ? (
                                <div className="flex items-center gap-2 animate-in zoom-in duration-300">
                                    <CheckCircle size={18} />
                                    Client Converti !
                                </div>
                            ) : (
                                <>
                                    <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                                    Transformer en Client
                                </>
                            )}
                            {/* Shine effect */}
                            {!isConverting && !isSuccess && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                            )}
                        </Button>
                    )}

                    <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-white border border-slate-100 shadow-sm">
                        <MoreHorizontal size={18} className="text-slate-400" />
                    </Button>
                </div>
            </div>

            {/* Profile Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    {/* Main Info Card */}
                    <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
                        <div className="bg-slate-900 p-10 text-white relative">
                            {/* NC Badge */}
                            {prospect.isNC && (
                                <div className="absolute top-8 right-8 bg-rose-500 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
                                    <AlertTriangle size={12} /> NON-CONFORME
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row items-center md:items-center gap-8 relative z-10">
                                <div className="w-24 h-24 rounded-2xl bg-white text-slate-900 flex items-center justify-center text-3xl font-bold shadow-xl relative">
                                    {prospect.name.charAt(0)}
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-xl flex items-center justify-center border-4 border-slate-900">
                                        <Building size={14} className="text-white" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{prospect.name}</h1>
                                        <Badge className={cn(
                                            "capitalize px-3 py-1 text-[9px] font-bold tracking-wider rounded-lg border-none",
                                            prospect.type === "Client" ? "bg-primary text-white" :
                                                prospect.status === "Finale" ? "bg-emerald-500 text-white" :
                                                    prospect.status === "Rappel" ? "bg-amber-500 text-white" : "bg-slate-700 text-slate-300"
                                        )}>
                                            {prospect.type === "Client" ? "Client Officiel" : prospect.status}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-5 text-slate-400 font-semibold text-[11px] justify-center md:justify-start uppercase tracking-tight">
                                        <span className="flex items-center gap-2 font-sans">{prospect.address || "SANS ADRESSE"}</span>
                                        <span className="flex items-center gap-2 font-sans opacity-60">•</span>
                                        <span className="flex items-center gap-2 font-sans">{prospect.industry}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CardContent className="p-8 md:p-12 bg-white grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coordonnées Directes</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-slate-700 font-bold text-sm group cursor-pointer hover:text-primary transition-colors">
                                        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                            <Mail size={16} />
                                        </div>
                                        {prospect.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-700 font-bold text-sm group cursor-pointer hover:text-primary transition-colors">
                                        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                            <Phone size={16} />
                                        </div>
                                        {prospect.phone}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Assignation Agent</p>
                                <div className="flex items-center gap-3 p-2.5 pr-5 bg-slate-50 rounded-xl border border-slate-100 w-fit">
                                    <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-primary border border-slate-100">
                                        {prospect.assignedAgentName?.charAt(0) || "A"}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">{prospect.assignedAgentName || "NON ASSIGNÉ"}</p>
                                        <p className="text-[9px] font-semibold text-slate-400">Agent Référent</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Temps de Rappel</p>
                                {prospect.nextRecall ? (
                                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-2">
                                        <div className="flex items-center gap-2 text-amber-600 font-black text-xs">
                                            <Clock size={16} /> RAPPEL PROGRAMMÉ
                                        </div>
                                        <p className="text-sm font-bold text-amber-800">{formatDate(prospect.nextRecall)}</p>
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <p className="text-xs font-bold text-slate-400 italic">Aucun rappel planifié</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Interaction History (Timeline) */}
                    <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white">
                        <CardHeader className="p-7 border-b border-slate-50">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center">
                                        <History size={20} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-bold text-slate-800">Interactions</CardTitle>
                                        <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider font-sans">Historique chronologique</p>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="px-2.5 py-0.5 text-[9px] font-bold rounded-lg border-none shadow-none">
                                    {prospect.interactions.length} FLUX
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            {prospect.interactions.length > 0 ? (
                                <div className="relative space-y-12 before:absolute before:left-[1.65rem] before:top-4 before:bottom-0 before:w-0.5 before:bg-slate-100">
                                    {prospect.interactions.map((interaction, idx) => {
                                        const motif = motifs.find(m => m.id === interaction.motifId);
                                        return (
                                            <div key={interaction.id} className="relative pl-16 group">
                                                {/* Dot/Icon */}
                                                <div className={cn(
                                                    "absolute left-0 top-0 w-14 h-14 rounded-2xl bg-white border-2 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300 z-10",
                                                    interaction.channel === "Appel" ? "border-primary/20 text-primary" :
                                                        interaction.channel === "Email" ? "border-amber-200 text-amber-500" : "border-emerald-200 text-emerald-500"
                                                )}>
                                                    {interaction.channel === "Appel" ? <Phone size={22} /> :
                                                        interaction.channel === "Email" ? <Mail size={22} /> : <MapPin size={22} />}
                                                </div>

                                                <div className="space-y-3 pt-2">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <div className="flex items-center gap-3">
                                                                <h4 className="text-lg font-black text-slate-800 tracking-tight">{motif?.label || "Qualification Standard"}</h4>
                                                                <Badge className="bg-slate-100 text-slate-500 border-none text-[9px] font-black uppercase font-black uppercase tracking-widest">
                                                                    MKT : {interaction.agentName}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">{formatDate(interaction.date)}</p>
                                                        </div>
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                                                                <ArrowUpRight size={16} className="text-slate-400" />
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    <div className="p-6 rounded-[1.5rem] bg-slate-50/50 border border-slate-100 group-hover:bg-white group-hover:shadow-xl transition-all duration-500">
                                                        <p className="text-slate-600 text-sm font-medium leading-relaxed italic">
                                                            "{interaction.comment}"
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                                        <MessageSquare size={40} />
                                    </div>
                                    <div>
                                        <h4 className="text-slate-400 font-black uppercase tracking-widest">Aucune interaction</h4>
                                        <p className="text-slate-300 text-xs mt-1">Commencez par qualifier une première interaction avec ce prospect.</p>
                                    </div>
                                    <Button
                                        onClick={() => setIsQualifyModalOpen(true)}
                                        variant="outline"
                                        className="mt-4 border-2 border-slate-100 rounded-xl font-bold"
                                    >
                                        QUALIFIER MAINTENANT
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Info Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* NexAI Analysis Card */}
                    <Card className="rounded-[2rem] bg-slate-900 border-none text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12 transition-transform group-hover:scale-110">
                            <Zap size={120} />
                        </div>
                        <CardHeader className="relative z-10 px-8 pt-8">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse" />
                                <span className="text-[9px] font-bold uppercase tracking-wider text-primary/80">NexAI Predictive</span>
                            </div>
                            <CardTitle className="text-xl font-bold tracking-tight leading-none">Diagnostic Intelligence</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6 relative z-10">
                            <div className="p-5 rounded-[1.5rem] bg-white/5 border border-white/10 space-y-4">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Potentiel Conversion</span>
                                        <span className="text-xl font-black text-emerald-400">88%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-400 w-[88%] shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed italic border-l-2 border-primary pl-4">
                                    "Basé sur les motifs précédents, ce prospect montre une forte appétence pour le module Construction. Engagement optimal détecté lors des appels du lundi matin."
                                </p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions Recommandées</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                        <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <ArrowUpRight size={16} />
                                        </div>
                                        <span className="text-xs font-bold">Proposer le pack BIM 3D</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <span className="text-xs font-bold">Vérifier conformité TVA</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <QuickStatCard label="Appels" value="12" sub="Ce mois" icon={Phone} />
                        <QuickStatCard label="Emails" value="45" sub="Ce mois" icon={Mail} color="amber" />
                    </div>
                </div>
            </div>

            {/* Modal */}
            <QualifyInteractionModal
                isOpen={isQualifyModalOpen}
                onClose={() => setIsQualifyModalOpen(false)}
                prospectId={prospect.id}
                prospectName={prospect.name}
            />

            <EditProspectModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                prospect={prospect}
            />
        </div>
    );
}

function QuickStatCard({ label, value, sub, icon: Icon, color = "primary" }: any) {
    const colorClasses: any = {
        primary: "text-slate-900 bg-slate-50",
        amber: "text-amber-600 bg-amber-50",
    };

    return (
        <Card className="rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", colorClasses[color])}>
                <Icon size={18} />
            </div>
            <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-800">{value}</span>
                    <span className="text-[10px] font-semibold text-slate-400">{sub}</span>
                </div>
            </div>
        </Card>
    );
}
