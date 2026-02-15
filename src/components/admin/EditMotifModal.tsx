"use client";

import React, { useState, useEffect } from "react";
import { Settings, CheckCircle2, Clock, MessageSquare, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp } from "@/context/AppContext";
import { Dialog } from "@/components/ui/Dialog";
import { Motif } from "@/types";

interface EditMotifModalProps {
    isOpen: boolean;
    onClose: () => void;
    motif: Motif;
}

export function EditMotifModal({ isOpen, onClose, motif }: EditMotifModalProps) {
    const { updateMotif } = useApp();
    const [formData, setFormData] = useState({
        label: motif.label,
        recallRequired: motif.recallRequired,
        ticketRequired: motif.ticketRequired,
        markNC: motif.markNC,
    });

    useEffect(() => {
        setFormData({
            label: motif.label,
            recallRequired: motif.recallRequired,
            ticketRequired: motif.ticketRequired,
            markNC: motif.markNC,
        });
    }, [motif]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateMotif(motif.id, formData);
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-md rounded-[2rem] p-0 overflow-hidden border-none shadow-xl"
        >
            <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-xl font-bold tracking-tight uppercase">Modifier Motif</h2>
                    <p className="text-slate-400 text-[10px] mt-1 font-bold uppercase tracking-wider">Mise à jour des règles : {motif.label}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
                <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block ml-1">Libellé du Motif</label>
                    <Input
                        required
                        className="h-12 bg-slate-50 border-slate-100 rounded-xl font-semibold outline-none"
                        value={formData.label}
                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    />
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block ml-1">Paramètres Business</label>
                    <div className="grid grid-cols-1 gap-3">
                        <CheckboxItem
                            label="Rappel Requis"
                            icon={Clock}
                            checked={formData.recallRequired}
                            onChange={(v: boolean) => setFormData({ ...formData, recallRequired: v })}
                        />
                        <CheckboxItem
                            label="Ouvrir Ticket BO"
                            icon={MessageSquare}
                            checked={formData.ticketRequired}
                            onChange={(v: boolean) => setFormData({ ...formData, ticketRequired: v })}
                        />
                        <CheckboxItem
                            label="Marquer NC"
                            icon={AlertTriangle}
                            checked={formData.markNC}
                            onChange={(v: boolean) => setFormData({ ...formData, markNC: v })}
                        />
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <Button type="button" variant="ghost" className="flex-1 font-bold h-12 rounded-xl" onClick={onClose}>Annuler</Button>
                    <Button type="submit" className="flex-1 h-12 bg-slate-900 text-white font-bold uppercase tracking-wider rounded-xl">Enregistrer</Button>
                </div>
            </form>
        </Dialog>
    );
}

function CheckboxItem({ label, icon: Icon, checked, onChange }: { label: string, icon: any, checked: boolean, onChange: (v: boolean) => void }) {
    return (
        <div
            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${checked ? 'border-primary bg-primary/5' : 'border-slate-50 bg-slate-50/50'}`}
            onClick={() => onChange(!checked)}
        >
            <div className="flex items-center gap-3">
                <Icon size={16} className={checked ? 'text-primary' : 'text-slate-400'} />
                <span className={`text-sm font-bold ${checked ? 'text-slate-900' : 'text-slate-500'}`}>{label}</span>
            </div>
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${checked ? 'bg-primary border-primary' : 'border-slate-200'}`}>
                {checked && <CheckCircle2 size={12} className="text-white" />}
            </div>
        </div>
    );
}
