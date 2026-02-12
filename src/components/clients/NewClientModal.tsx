"use client";

import React, { useState } from "react";
import { X, Building, Mail, Phone, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp } from "@/context/AppContext";

interface NewClientModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NewClientModal({ isOpen, onClose }: NewClientModalProps) {
    const { addClient } = useApp();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        industry: "",
        address: "",
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addClient({
            ...formData,
            status: "Active",
            projectsCount: 0,
            totalRevenue: 0,
            lastInteraction: new Date().toISOString().split("T")[0],
        });
        onClose();
        setFormData({ name: "", email: "", phone: "", company: "", industry: "", address: "" });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
                <div className="flex justify-between items-center p-6 border-b border-slate-50 bg-slate-50/50">
                    <h2 className="text-xl font-bold text-slate-800">Nouveau Client</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-200/50">
                        <X size={20} className="text-slate-400" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Société / Nom</label>
                        <div className="relative">
                            <Building size={16} className="absolute left-3 top-3 text-slate-400" />
                            <Input
                                required
                                placeholder="Ex: Modernys Construction"
                                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Email</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                                <Input
                                    required
                                    type="email"
                                    placeholder="contact@client.com"
                                    className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Téléphone</label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                                <Input
                                    placeholder="+33 6 00 00 00 00"
                                    className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Secteur d'activité</label>
                        <div className="relative">
                            <Tag size={16} className="absolute left-3 top-3 text-slate-400" />
                            <Input
                                placeholder="Industrie, Tech, Immobilier..."
                                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                value={formData.industry}
                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Adresse</label>
                        <div className="relative">
                            <MapPin size={16} className="absolute left-3 top-3 text-slate-400" />
                            <Input
                                placeholder="Numéro, rue, code postal, ville"
                                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>Annuler</Button>
                        <Button type="submit" className="flex-1 bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                            Créer le profil
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
