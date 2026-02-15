"use client";

import React, { useState } from "react";
import {
    X,
    MessageSquare,
    Phone,
    Mail,
    MapPin,
    Calendar,
    CheckCircle2,
    AlertTriangle,
    Clock,
    User,
    ChevronDown,
    Zap
} from "lucide-react";
import { Dialog, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp } from "@/context/AppContext";
import { InteractionChannel, Motif } from "@/types";
import { cn } from "@/lib/utils";

interface QualifyInteractionModalProps {
    isOpen: boolean;
    onClose: () => void;
    prospectId: string;
    prospectName: string;
}

export function QualifyInteractionModal({ isOpen, onClose, prospectId, prospectName }: QualifyInteractionModalProps) {
    const { motifs, qualifyInteraction } = useApp();
    const [channel, setChannel] = useState<InteractionChannel>("Appel");
    const [selectedMotifId, setSelectedMotifId] = useState<string>("");
    const [comment, setComment] = useState("");
    const [recallDate, setRecallDate] = useState("");

    const selectedMotif = motifs.find(m => m.id === selectedMotifId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMotifId) return;

        qualifyInteraction({
            prospectId,
            channel,
            motifId: selectedMotifId,
            comment,
            recallDate: selectedMotif?.recallRequired ? recallDate : undefined
        });

        onClose();
        // Reset form
        setSelectedMotifId("");
        setComment("");
        setRecallDate("");
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-xl rounded-[2rem] p-0 overflow-hidden border-none shadow-xl"
        >
            <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                    <Zap size={140} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-primary">Qualification</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">{prospectName}</h2>
                    <p className="text-slate-400 text-xs mt-1.5 font-medium opacity-80">Enregistrement et mise à jour du workflow.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-white">
                {/* Canal Selection */}
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block ml-1">Canal de communication</label>
                    <div className="grid grid-cols-3 gap-3">
                        <ChannelButton
                            active={channel === "Appel"}
                            onClick={() => setChannel("Appel")}
                            icon={Phone}
                            label="Appel"
                        />
                        <ChannelButton
                            active={channel === "Email"}
                            onClick={() => setChannel("Email")}
                            icon={Mail}
                            label="Email"
                        />
                        <ChannelButton
                            active={channel === "Terrain"}
                            onClick={() => setChannel("Terrain")}
                            icon={MapPin}
                            label="Terrain"
                        />
                    </div>
                </div>

                {/* Motif Selection */}
                <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block ml-1 font-sans">Motif de l'interaction</label>
                    <div className="relative">
                        <select
                            required
                            value={selectedMotifId}
                            onChange={(e) => setSelectedMotifId(e.target.value)}
                            className="w-full h-12 pl-5 pr-12 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-700 appearance-none focus:border-primary/30 transition-all outline-none"
                        >
                            <option value="">Sélectionner un motif...</option>
                            {motifs.map(m => (
                                <option key={m.id} value={m.id}>{m.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>

                    {/* Motif Impact Preview */}
                    {selectedMotif && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-[10px] font-semibold text-primary italic">
                                <CheckCircle2 size={12} /> Statut final: {selectedMotif.defaultStatus}
                            </div>
                            {selectedMotif.recallRequired && (
                                <div className="flex items-center gap-2 text-[10px] font-semibold text-amber-600 italic">
                                    <Clock size={12} /> Rappel obligatoire
                                </div>
                            )}
                            {selectedMotif.ticketRequired && (
                                <div className="flex items-center gap-2 text-[10px] font-semibold text-blue-600 italic">
                                    <MessageSquare size={12} /> Création ticket
                                </div>
                            )}
                            {selectedMotif.markNC && (
                                <div className="flex items-center gap-2 text-[10px] font-semibold text-rose-600 italic">
                                    <AlertTriangle size={12} /> Marquage NC
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Comment & Recall */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block ml-1 font-sans">Commentaire agent</label>
                        <textarea
                            required
                            placeholder="Détails de l'échange..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 focus:border-primary/30 transition-all outline-none resize-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block ml-1 font-sans">Prochain Rappel</label>
                        <Input
                            type="datetime-local"
                            disabled={!selectedMotif?.recallRequired}
                            value={recallDate}
                            onChange={(e) => setRecallDate(e.target.value)}
                            required={selectedMotif?.recallRequired}
                            className="h-12 bg-slate-50 border border-slate-100 rounded-xl font-bold flex-row-reverse"
                        />
                        {!selectedMotif?.recallRequired && (
                            <p className="text-[9px] text-slate-400 italic mt-2 ml-1">Non requis.</p>
                        )}
                    </div>
                </div>

                <div className="pt-4 flex gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        className="flex-1 h-12 rounded-xl font-bold text-slate-400 hover:text-slate-600"
                        onClick={onClose}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        disabled={!selectedMotifId}
                        className="flex-1 h-12 rounded-xl bg-slate-900 text-white font-bold uppercase tracking-wider shadow-lg shadow-slate-200"
                    >
                        Valider
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}

function ChannelButton({ active, onClick, icon: Icon, label }: any) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all",
                active
                    ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-200"
                    : "bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600"
            )}
        >
            <Icon size={18} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
        </button>
    );
}

function Badge({ children, className }: any) {
    return (
        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
            {children}
        </span>
    );
}
