"use client";

import React, { useState } from "react";
import {
    Settings,
    Plus,
    Search,
    Clock,
    MessageSquare,
    AlertTriangle,
    CheckCircle2,
    Save,
    Trash2
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { AddMotifModal } from "@/components/admin/AddMotifModal";
import { EditMotifModal } from "@/components/admin/EditMotifModal";
import { Motif } from "@/types";

export default function MotifsAdminPage() {
    const { motifs, deleteMotif } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMotif, setSelectedMotif] = useState<Motif | null>(null);

    const filteredMotifs = motifs.filter(m =>
        m.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md">
                            <Settings size={18} />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Paramétrage Motifs</h1>
                        <Badge className="bg-slate-100 text-slate-500 border-none font-bold text-[10px] h-6 px-2.5 rounded-lg flex items-center">{motifs.length} MOTIFS</Badge>
                    </div>
                    <p className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider pl-1 font-sans">
                        Configuration des règles métier par interaction
                    </p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="h-11 px-8 bg-slate-900 text-white font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all flex gap-3"
                >
                    <Plus size={18} />
                    Nouveau Motif
                </Button>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
                <div className="flex-1 relative group">
                    <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Rechercher un motif (ex: Rappel, NC...)"
                        className="h-12 pl-12 bg-white border-slate-200 rounded-xl font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredMotifs.map((motif) => (
                    <Card key={motif.id} className="rounded-3xl border-none shadow-sm bg-white overflow-hidden group hover:shadow-xl transition-all border border-slate-100">
                        <CardContent className="p-0">
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{motif.label}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">ID: {motif.id}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary"
                                        onClick={() => {
                                            setSelectedMotif(motif);
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        <Save size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 rounded-lg hover:bg-rose-50 hover:text-rose-500"
                                        onClick={() => {
                                            if (confirm("Supprimer ce motif ?")) deleteMotif(motif.id);
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                            <div className="p-6 bg-slate-50/30 grid grid-cols-2 gap-6 pb-10">
                                <Attribute label="Statut Défaut" value={motif.defaultStatus} icon={CheckCircle2} color="primary" />
                                <Attribute label="Rappel Requis" value={motif.recallRequired ? "OUI" : "NON"} icon={Clock} color={motif.recallRequired ? "amber" : "slate"} />
                                <Attribute label="Ticket BO" value={motif.ticketRequired ? "OUI" : "NON"} icon={MessageSquare} color={motif.ticketRequired ? "blue" : "slate"} />
                                <Attribute label="Non-Conforme" value={motif.markNC ? "OUI" : "NON"} icon={AlertTriangle} color={motif.markNC ? "rose" : "slate"} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <AddMotifModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {selectedMotif && (
                <EditMotifModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    motif={selectedMotif}
                />
            )}
        </div>
    );
}

function Attribute({ label, value, icon: Icon, color }: any) {
    const colors: any = {
        primary: "bg-primary/10 text-primary border-primary/20",
        amber: "bg-amber-100 text-amber-600 border-amber-200",
        blue: "bg-blue-100 text-blue-600 border-blue-200",
        rose: "bg-rose-100 text-rose-600 border-rose-200",
        slate: "bg-slate-100 text-slate-400 border-slate-200",
    };

    return (
        <div className="space-y-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block ml-1">{label}</span>
            <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border", colors[color])}>
                <Icon size={14} />
                {value}
            </div>
        </div>
    );
}
