"use client";

import React, { useState, useEffect } from "react";
import { X, Building, Mail, Phone, MapPin, Tag, UserPlus, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp } from "@/context/AppContext";
import { Dialog, DialogFooter } from "@/components/ui/Dialog";
import { Client } from "@/types";

interface EditProspectModalProps {
    isOpen: boolean;
    onClose: () => void;
    prospect: Client;
}

export function EditProspectModal({ isOpen, onClose, prospect }: EditProspectModalProps) {
    const { updateClient } = useApp();
    const [formData, setFormData] = useState({
        name: prospect.name,
        email: prospect.email,
        phone: prospect.phone,
        industry: prospect.industry,
        address: prospect.address,
        contactPerson: prospect.contactPerson,
    });

    useEffect(() => {
        setFormData({
            name: prospect.name,
            email: prospect.email,
            phone: prospect.phone,
            industry: prospect.industry,
            address: prospect.address,
            contactPerson: prospect.contactPerson,
        });
    }, [prospect]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateClient(prospect.id, formData);
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-2xl rounded-[2rem] p-0 overflow-hidden border-none shadow-xl"
        >
            <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                    <Zap size={140} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">Modification Dossier</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight uppercase">Modifier : {prospect.name}</h2>
                    <p className="text-slate-400 text-xs mt-1.5 font-medium opacity-80">Mise à jour des informations structurelles du prospect.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block ml-1 font-sans">Informations de base</label>
                        <div className="space-y-4">
                            <div className="relative group">
                                <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                                <Input
                                    required
                                    placeholder="Nom / Société"
                                    className="h-12 pl-12 bg-slate-50 border border-slate-100 rounded-xl font-semibold"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="relative group">
                                <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <Input
                                    required
                                    placeholder="Secteur d'activité"
                                    className="h-12 pl-12 bg-slate-50 border border-slate-100 rounded-xl font-semibold"
                                    value={formData.industry}
                                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block ml-1 font-sans">Contact Direct</label>
                        <div className="space-y-4">
                            <div className="relative group">
                                <UserPlus size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                                <Input
                                    required
                                    placeholder="Nom du contact"
                                    className="h-12 pl-12 bg-slate-50 border border-slate-100 rounded-xl font-semibold"
                                    value={formData.contactPerson}
                                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                />
                            </div>
                            <div className="relative group">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                                <Input
                                    required
                                    type="email"
                                    placeholder="Email"
                                    className="h-12 pl-12 bg-slate-50 border border-slate-100 rounded-xl font-semibold"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block ml-1 font-sans">Coordonnées & Localisation</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative group">
                            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Téléphone"
                                className="h-12 pl-12 bg-slate-50 border border-slate-100 rounded-xl font-semibold"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="relative group">
                            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Adresse"
                                className="h-12 pl-12 bg-slate-50 border border-slate-100 rounded-xl font-semibold"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 flex gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        className="flex-1 h-12 rounded-xl font-bold text-slate-400"
                        onClick={onClose}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 h-12 rounded-xl bg-slate-900 text-white font-bold uppercase tracking-wider"
                    >
                        Mettre à jour
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
