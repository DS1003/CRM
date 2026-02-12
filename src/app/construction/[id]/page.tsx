"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Building2,
    ChevronLeft,
    Calendar,
    Clock,
    CheckCircle2,
    AlertTriangle,
    HardHat,
    MapPin,
    TrendingUp,
    FileText,
    MessageSquare,
    Users,
    Camera,
    Layers,
    ArrowRight,
    MoreVertical,
    Plus,
    History,
    Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockProjects, mockDocuments, mockCommunications } from "@/lib/mock-data";
import { cn, formatDate, formatCurrency } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

type ProjectTab = "Statut" | "Chronologie" | "Documents & CAO" | "Tickets" | "Photos" | "SAV";

export default function ProjectDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { triggerAutomatedTicket } = useApp();
    const [activeTab, setActiveTab] = React.useState<ProjectTab>("Statut");

    const project = mockProjects.find(p => p.id === id) || mockProjects[0];
    const projectDocs = mockDocuments.filter(d => d.projectId === project.id);

    const tabs: ProjectTab[] = ["Statut", "Chronologie", "Documents & CAO", "Tickets", "Photos", "SAV"];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* breadcrumb */}
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                    <ChevronLeft size={16} />
                    Retour au Hub Construction
                </button>

                <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                        <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg",
                            project.status === "Delayed" ? "bg-rose-500" : "bg-primary"
                        )}>
                            <Building2 size={32} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
                                <Badge variant={project.status === "Delayed" ? "warning" : "success"}>
                                    {project.status === "In Progress" ? "En cours" :
                                        project.status === "Delayed" ? "Retardé" :
                                            project.status === "Completed" ? "Terminé" : project.status}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground mt-1 flex items-center gap-2 font-medium">
                                <MapPin size={14} className="text-slate-400" />
                                Chantier Global #42 • <span className="text-primary font-bold">{project.clientName}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 bg-white/50 border-slate-200">
                            <Activity size={16} />
                            Rapport de Santé
                        </Button>
                        <Button className="gap-2 bg-slate-900 border-none">
                            <HardHat size={16} />
                            Pointage sur site
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MoreVertical size={20} />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-sm bg-white overflow-hidden group border border-slate-100">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progression</span>
                            <span className="text-2xl font-bold text-primary">{project.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div
                                className={cn(
                                    "h-full transition-all duration-1000",
                                    project.status === "Delayed" ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]" : "bg-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                                )}
                                style={{ width: `${project.progress}%` }}
                            ></div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-tighter">Phase : Intégration Structurelle</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white border border-slate-100">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Budget Consommé</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(project.spent)}</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-slate-400 font-bold">Total : {formatCurrency(project.budget / 1000000)}M</span>
                            <Badge variant="outline" className="text-[9px] h-4 py-0 flex items-center bg-slate-50 border-slate-200 font-bold uppercase">
                                {Math.round((project.spent / project.budget) * 100)}% Utilisé
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white border border-slate-100">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Équipe Assignée</span>
                        </div>
                        <div className="flex -space-x-3 mt-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-100 shadow-sm transition-transform hover:scale-110 cursor-pointer">
                                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Membre équipe" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                                +2
                            </div>
                        </div>
                        <p className="text-[10px] text-primary mt-4 uppercase font-bold tracking-tighter cursor-pointer hover:underline transition-all">Gérer les Ressources</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white overflow-hidden border border-slate-100">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Santé du Projet</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "p-3 rounded-xl shadow-sm",
                                project.status === "Delayed" ? "bg-rose-50 text-rose-500 border border-rose-100" : "bg-emerald-50 text-emerald-500 border border-emerald-100"
                            )}>
                                {project.status === "Delayed" ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
                            </div>
                            <div>
                                <h4 className="font-bold text-lg leading-none text-slate-900">{project.status === "Delayed" ? "Risque Élevé" : "Stable"}</h4>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-bold">Score Audit IA : 8.4</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-hide py-2 gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-6 py-2 text-[11px] font-bold uppercase tracking-widest transition-all relative flex-shrink-0",
                            activeTab === tab
                                ? "text-primary bg-primary/5 rounded-xl"
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === "Statut" && (
                        <div className="space-y-6">
                            <Card className="card-premium">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-slate-900">Résumé Exécutif du Projet</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                                        {project.description} Actuellement en phase structurelle. La préparation du site et la validation des fondations sont terminées à 100%.
                                        L'accent est désormais mis sur les éléments structurels verticaux et le plan technique CAO pour l'intégration électrique.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t font-semibold">
                                        <div className="space-y-4">
                                            <h5 className="text-[10px] uppercase font-black tracking-widest text-slate-400">Prochain Jalon Critique</h5>
                                            <div className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group hover:border-primary/30 transition-all cursor-default">
                                                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                                                    <Layers size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-900">Validation Structure Toiture</p>
                                                    <p className="text-[10px] text-slate-400 mt-0.5 font-bold">PRÉVU : 12 Avril 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h5 className="text-[10px] uppercase font-black tracking-widest text-slate-400">Contact Principal</h5>
                                            <div className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group hover:border-primary/30 transition-all cursor-default">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-300 shadow-sm">
                                                    <img src={`https://i.pravatar.cc/150?u=12`} alt="Manager" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-900">{project.manager}</p>
                                                    <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase">Conducteur de Travaux Principal</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="card-premium">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Alertes Critiques</CardTitle>
                                        {project.status === "Delayed" && <Badge variant="destructive" className="animate-pulse">Active</Badge>}
                                    </CardHeader>
                                    <CardContent>
                                        {project.status === "Delayed" ? (
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3 p-4 bg-rose-50/50 rounded-2xl border border-rose-100 group hover:bg-rose-50 transition-colors">
                                                    <AlertTriangle size={16} className="text-rose-500 mt-0.5 shrink-0" />
                                                    <p className="text-[11px] text-rose-700 font-bold leading-relaxed">
                                                        La validation CAO du réseau CVC a 4 jours de retard. Le travail structurel sur la Section B2 est actuellement suspendu.
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-8 text-slate-300">
                                                <CheckCircle2 size={32} className="opacity-20 mb-2" />
                                                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Aucune alerte critique</span>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card className="card-premium">
                                    <CardHeader>
                                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Mises à jour Récentes</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex gap-4 group cursor-default">
                                            <div className="w-1 h-10 bg-primary/20 rounded-full group-hover:bg-primary transition-colors"></div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800">CQ Fondations validé</p>
                                                <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold">Aujourd'hui • Marco R.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 group cursor-default">
                                            <div className="w-1 h-10 bg-slate-100 rounded-full group-hover:bg-slate-300 transition-colors"></div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-bold">Révision CAO V2.1 soumise</p>
                                                <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold">Hier • Sarah C.</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === "Documents & CAO" && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm px-8">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Répertoire du Projet</span>
                                <Button variant="ghost" size="sm" className="h-9 text-[10px] font-bold uppercase gap-2 hover:bg-slate-50 border-slate-200 border">
                                    <Plus size={14} /> Nouvelle Version
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projectDocs.map(doc => (
                                    <Card key={doc.id} className="card-premium hover:border-primary/40 transition-all cursor-pointer group">
                                        <CardContent className="p-4 flex gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors shadow-sm">
                                                <FileText size={24} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-sm truncate text-slate-800">{doc.name}</h4>
                                                <div className="flex items-center justify-between mt-2">
                                                    <Badge variant="secondary" className="text-[9px] px-1.5 h-4 uppercase tracking-tighter bg-white border border-slate-100 shadow-xs font-bold">V{doc.version}</Badge>
                                                    <span className="text-[10px] text-slate-400 font-bold">{doc.size}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "Chronologie" && (
                        <Card className="card-premium">
                            <CardContent className="p-8">
                                <div className="space-y-12">
                                    {[
                                        { date: "Juin 2023", title: "Initialisation du Projet", status: "Terminé", icon: CheckCircle2, color: "text-emerald-500" },
                                        { date: "Sept 2023", title: "Fondations & Terrassement", status: "Terminé", icon: CheckCircle2, color: "text-emerald-500" },
                                        { date: "Jan 2024", title: "Fin du Gros Œuvre", status: "En cours", icon: Clock, color: "text-blue-500" },
                                        { date: "Mai 2024", title: "Intégration Technique (MEP)", status: "En attente", icon: Layers, color: "text-slate-300" },
                                        { date: "Août 2024", title: "Validation Finale & Remis des Clés", status: "En attente", icon: FlagIcon, color: "text-slate-300" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="relative flex gap-8 group">
                                            {idx !== 4 && <div className="absolute left-[19px] top-10 w-0.5 h-16 bg-slate-100 group-last:hidden"></div>}
                                            <div className={cn("z-10 w-10 h-10 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center shadow-sm", item.color)}>
                                                <item.icon size={18} />
                                            </div>
                                            <div className="flex-1 pt-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">{item.date}</span>
                                                    <Badge variant="secondary" className="h-4 text-[8px] py-0 px-1.5 border-none bg-slate-100 text-slate-500 font-bold uppercase tracking-tight">{item.status}</Badge>
                                                </div>
                                                <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {["Tickets", "Photos", "SAV"].includes(activeTab) && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-300 bg-white rounded-3xl border border-slate-100 border-dashed m-1">
                            <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
                                <Activity size={32} className="opacity-20" />
                            </div>
                            <h4 className="font-bold text-slate-400 tracking-widest uppercase text-sm">Aucune donnée {activeTab}</h4>
                            <p className="text-[11px] mt-1 font-bold text-slate-400">Ces projections sont estimées basées sur les prochains jalons.</p>
                            <Button className="mt-8 gap-2 bg-slate-900 h-10 text-xs font-bold shadow-lg shadow-slate-900/10">
                                Initialiser les dossiers {activeTab}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    <Card className="card-premium">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-black">Actions Rapides</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 p-5 pt-2">
                            <Button variant="outline" className="w-full justify-start h-11 text-xs font-bold gap-3 hover:bg-slate-50 border-slate-100 shadow-sm transition-all group">
                                <Camera size={16} className="text-slate-300 group-hover:text-primary transition-colors" /> Téléverser Photos Site
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start h-11 text-xs font-bold gap-3 hover:bg-slate-50 border-slate-100 shadow-sm transition-all group"
                                onClick={() => triggerAutomatedTicket({
                                    type: "Tech",
                                    clientId: project.clientId,
                                    clientName: project.clientName,
                                    details: `Demande de revue CAO pour le projet ${project.name}`
                                })}
                            >
                                <Layers size={16} className="text-slate-300 group-hover:text-primary transition-colors" /> Demander Revue CAO
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start h-11 text-xs font-bold gap-3 hover:bg-slate-50 border-slate-100 shadow-sm transition-all group"
                                onClick={() => triggerAutomatedTicket({
                                    type: "DocRequest",
                                    clientId: project.clientId,
                                    clientName: project.clientName,
                                    details: `Demande de génération de documentation PDF pour le projet ${project.name}`
                                })}
                            >
                                <FileText size={16} className="text-slate-300 group-hover:text-primary transition-colors" /> Demander Doc. Projet
                            </Button>
                            <Button variant="outline" className="w-full justify-start h-11 text-xs font-bold gap-3 hover:bg-slate-50 border-slate-100 shadow-sm transition-all group">
                                <MessageSquare size={16} className="text-slate-300 group-hover:text-primary transition-colors" /> Notifier Participants
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="card-premium !bg-slate-900 !border-slate-800 text-white overflow-hidden relative group">
                        <div className="absolute -top-10 -right-10 p-12 opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110">
                            <TrendingUp size={120} />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-[11px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                <TrendingUp size={14} className="text-primary" />
                                Prévision IA Chronologie
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 p-6 pt-0 relative z-10">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-black">
                                    <span className="text-slate-400 uppercase tracking-wider">Livraison Prévue</span>
                                    <span className="text-amber-400">12 Sept. 2024</span>
                                </div>
                                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[10px] text-slate-300 font-bold leading-relaxed italic backdrop-blur-sm">
                                    "Le retard actuel sur la validation structurelle ajoute estimativement 12 jours à la remise finale."
                                </div>
                            </div>

                            <div className="space-y-3 pt-5 border-t border-white/10">
                                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">Évaluation du Risque</span>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5">
                                        <div className="h-full bg-rose-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                                    </div>
                                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">MOYEN-HAUT</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>);
}

function FlagIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
    );
}
