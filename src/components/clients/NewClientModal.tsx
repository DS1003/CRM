"use client";

import React, { useState } from "react";
import { X, Building, Mail, Phone, MapPin, Tag, UserPlus, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp } from "@/context/AppContext";
import { Dialog, DialogFooter } from "@/components/ui/Dialog";
import { User } from "@/types";
import { cn } from "@/lib/utils";

interface NewClientModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NewClientModal({ isOpen, onClose }: NewClientModalProps) {
    const { addClient, user: currentUser } = useApp();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        industry: "Construction",
        address: "",
        contactPerson: "",
        assignedAgentId: currentUser?.id || "",
        assignedAgentName: currentUser?.name || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addClient({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            industry: formData.industry,
            address: formData.address,
            contactPerson: formData.contactPerson,
            type: "Prospect",
            status: "En attente",
            projectsCount: 0,
            lastInteraction: new Date().toISOString(),
            assignedAgentId: formData.assignedAgentId,
            assignedAgentName: formData.assignedAgentName
        });
        onClose();
        setFormData({
            name: "", email: "", phone: "", industry: "Construction",
            address: "", contactPerson: "", assignedAgentId: currentUser?.id || "", assignedAgentName: currentUser?.name || ""
        });
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-2xl rounded-[2rem] p-0 overflow-hidden border-none shadow-xl"
        >
            <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                    <UserPlus size={140} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-primary">Saisie Dossier</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight uppercase">Nouveau Prospect</h2>
                    <p className="text-slate-400 text-xs mt-1.5 font-medium opacity-80">Initialisation d'une nouvelle fiche dans le pipeline.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block ml-1 font-sans">Informations Prospect</label>
                        <div className="space-y-4">
                            <div className="relative group">
                                <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                                <Input
                                    required
                                    placeholder="Raison Sociale / Société"
                                    className="h-12 pl-12 bg-slate-50 border border-slate-100 rounded-xl font-semibold focus:border-primary/30 transition-all outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="relative group">
                                <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <Input
                                    required
                                    placeholder="Secteur (Ex: BTP, Immobilier)"
                                    className="h-14 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-primary/30 focus:bg-white transition-all outline-none"
                                    value={formData.industry}
                                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Person */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block ml-1">Contact Référent</label>
                        <div className="space-y-4">
                            <div className="relative group">
                                <Zap size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <Input
                                    required
                                    placeholder="Nom du contact"
                                    className="h-14 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-primary/30 focus:bg-white transition-all outline-none"
                                    value={formData.contactPerson}
                                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                />
                            </div>
                            <div className="relative group">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                                <Input
                                    required
                                    type="email"
                                    placeholder="Email de contact"
                                    className="h-12 pl-12 bg-slate-50 border border-slate-100 rounded-xl font-semibold focus:border-primary/30 transition-all outline-none"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block ml-1">Localisation & Tel</label>
                        <div className="space-y-4">
                            <div className="relative group">
                                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Numéro de téléphone"
                                    className="h-14 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-primary/30 focus:bg-white transition-all outline-none"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div className="relative group">
                                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Adresse complète"
                                    className="h-14 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-primary/30 focus:bg-white transition-all outline-none"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Agent Assignment Info */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block ml-1 font-sans">Assignation Pilotage</label>
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-primary font-bold text-lg shadow-sm">
                                {formData.assignedAgentName.charAt(0)}
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Agent Assigné</p>
                                <p className="text-base font-bold text-slate-700 uppercase tracking-tight leading-none mt-1">{formData.assignedAgentName}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 flex gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        className="flex-1 h-12 rounded-xl font-bold text-slate-400 hover:text-slate-600 transition-all"
                        onClick={onClose}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 h-12 rounded-xl bg-slate-900 text-white font-bold uppercase tracking-wider shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all"
                    >
                        Créer le Prospect
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
