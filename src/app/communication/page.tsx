"use client";

import React from "react";
import {
    MessageSquare,
    Mail,
    Smartphone,
    FileEdit,
    Search,
    Plus,
    ArrowRight,
    User,
    MoreVertical,
    Paperclip,
    ArrowUpRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockCommunications } from "@/lib/mock-data";
import { cn, formatDate } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

export default function CommunicationPage() {
    const { triggerAutomatedTicket } = useApp();
    const [activeTab, setActiveTab] = React.useState<"All" | "Email" | "WhatsApp" | "Note Interne">("All");

    const filteredComms = activeTab === "All"
        ? mockCommunications
        : mockCommunications.filter(c => c.type === activeTab);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Email": return <Mail size={16} className="text-blue-500" />;
            case "WhatsApp": return <Smartphone size={16} className="text-emerald-500" />;
            case "Note Interne": return <FileEdit size={16} className="text-amber-500" />;
            default: return <MessageSquare size={16} />;
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-160px)] space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Hub de Communication</h1>
                    <p className="text-muted-foreground mt-1">Vue unifiée de toutes les interactions omnicanales et notes internes.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-white/50 border-slate-200">
                        <Mail size={16} />
                        Intégrer Email
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-white/50 border-slate-200">
                        <Smartphone size={16} />
                        Configurer WhatsApp
                    </Button>
                    <Button size="sm" className="gap-2 bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20">
                        <Plus size={16} />
                        Nouveau Message
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
                {/* Left Sidebar - Channels */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="card-premium">
                        <CardContent className="p-4 space-y-2">
                            <div className="flex items-center justify-between mb-2 px-3 pt-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Canaux Actifs</span>
                                <Badge variant="success" className="h-2 w-2 p-0 rounded-full animate-pulse"></Badge>
                            </div>
                            <div className="space-y-1">
                                {[
                                    { label: "Toutes les Communications", icon: MessageSquare, value: "All" },
                                    { label: "Email (Outlook)", icon: Mail, value: "Email" },
                                    { label: "WhatsApp Business", icon: Smartphone, value: "WhatsApp" },
                                    { label: "Notes Internes d'Équipe", icon: FileEdit, value: "Note Interne" },
                                ].map((item) => (
                                    <button
                                        key={item.value}
                                        onClick={() => setActiveTab(item.value as any)}
                                        className={cn(
                                            "flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group text-left",
                                            activeTab === item.value
                                                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        <item.icon size={18} className={cn("transition-colors shrink-0", activeTab === item.value ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} />
                                        <span className="truncate">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="card-premium !bg-slate-900 !border-slate-800 text-white overflow-hidden relative group">
                        <div className="absolute -top-10 -right-10 p-12 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                            <ArrowUpRight size={120} />
                        </div>
                        <CardContent className="p-6 relative z-10">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-primary mb-2 block">Assistant IA</span>
                            <h4 className="text-lg font-bold leading-tight">3 communications nécessitent une réponse immédiate.</h4>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">Je peux rédiger des suggestions de réponse basées sur l'historique et l'analyse du ton.</p>
                            <Button className="w-full mt-4 bg-white/10 text-white hover:bg-white/20 border-white/10 border text-xs font-bold h-9">
                                Rédiger avec NexAI
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="card-premium border-dashed border-slate-200 bg-slate-50/50">
                        <CardContent className="p-4 space-y-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Simulations SAV</span>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full h-10 text-[10px] font-bold uppercase tracking-widest bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                                onClick={() => triggerAutomatedTicket({
                                    type: "MailBO",
                                    clientId: "c2",
                                    clientName: "Global Solutions",
                                    details: "Simulation: Courrier papier reçu au siège pour qualification."
                                })}
                            >
                                <Mail size={14} className="mr-2" />
                                Nouveau Mail BO
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Dynamic Communication Feed */}
                <div className="lg:col-span-3 flex flex-col space-y-4 overflow-hidden h-full">
                    <div className="flex gap-4 items-center bg-white p-2 rounded-2xl border border-slate-200 shadow-sm px-4">
                        <Search size={18} className="text-slate-400" />
                        <Input placeholder="Rechercher des fils, sujets, contenus ou expéditeurs..." className="border-none shadow-none focus-visible:ring-0 bg-transparent h-10 text-sm" />
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-4 custom-scrollbar">
                        {filteredComms.map((comm) => (
                            <Card key={comm.id} className="card-premium group hover:border-primary/30 transition-all cursor-pointer overflow-hidden border-slate-200/60 bg-white">
                                <CardContent className="p-0">
                                    <div className="flex">
                                        <div className={cn(
                                            "w-14 flex flex-col items-center pt-6 bg-slate-50/50 border-r border-slate-100/50 transition-colors shrink-0",
                                            comm.type === "Email" ? "group-hover:bg-blue-50/30" :
                                                comm.type === "WhatsApp" ? "group-hover:bg-emerald-50/30" :
                                                    "group-hover:bg-amber-50/30"
                                        )}>
                                            <div className={cn(
                                                "p-2 rounded-lg transition-transform group-hover:scale-110",
                                                comm.type === "Email" ? "bg-blue-100/50 text-blue-600" :
                                                    comm.type === "WhatsApp" ? "bg-emerald-100/50 text-emerald-600" :
                                                        "bg-amber-100/50 text-amber-600"
                                            )}>
                                                {getTypeIcon(comm.type)}
                                            </div>
                                        </div>
                                        <div className="flex-1 p-5 overflow-hidden">
                                            <div className="flex justify-between items-start mb-2 overflow-hidden">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                                                        <User size={20} className="text-slate-400" />
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <h4 className="font-bold text-slate-900 text-sm truncate">{comm.sender}</h4>
                                                        <p className="text-[11px] text-slate-500 font-medium truncate">{comm.recipient}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1 shrink-0">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{formatDate(comm.timestamp)}</span>
                                                    <div className="flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Badge variant="secondary" className="text-[9px] uppercase tracking-tighter h-5 px-1.5 border-slate-200 bg-slate-50">
                                                            Ref: #C1-P1
                                                        </Badge>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-slate-100">
                                                            <MoreVertical size={14} className="text-slate-400" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {comm.subject && <h5 className="font-bold text-sm mb-1 text-slate-800 truncate">{comm.subject}</h5>}
                                            <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed max-w-3xl">
                                                {comm.content}
                                            </p>

                                            <div className="flex items-center justify-between pt-3 border-t border-slate-50 gap-4">
                                                <div className="flex gap-2 overflow-hidden">
                                                    {comm.attachment && (
                                                        <Badge variant="outline" className="gap-1.5 py-1 px-2 border-slate-200 bg-slate-50/50 shadow-sm text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
                                                            <Paperclip size={10} className="shrink-0" />
                                                            <span className="text-[9px] font-bold truncate max-w-[120px]">{comm.attachment}</span>
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity shrink-0">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            triggerAutomatedTicket({
                                                                type: "Reclamation",
                                                                clientId: comm.clientId,
                                                                clientName: comm.sender,
                                                                details: comm.content
                                                            });
                                                        }}
                                                    >
                                                        Signaler Litige
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900">
                                                        Marquer comme résolu
                                                    </Button>
                                                    <Button size="sm" className="h-7 text-[10px] font-bold uppercase tracking-widest gap-2 bg-slate-900 text-white shadow-sm hover:bg-slate-800">
                                                        Répondre
                                                        <ArrowRight size={10} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {filteredComms.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 text-slate-300 border-2 border-dashed border-slate-100 rounded-3xl m-4">
                                <MessageSquare size={48} className="opacity-10 mb-4" />
                                <p className="text-xs font-bold uppercase tracking-widest opacity-40">Aucune communication trouvée</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
