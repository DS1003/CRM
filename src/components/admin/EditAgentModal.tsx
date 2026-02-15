"use client";

import React, { useState, useEffect } from "react";
import { Shield, Mail, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp } from "@/context/AppContext";
import { Dialog } from "@/components/ui/Dialog";
import { User, UserRole } from "@/types";

interface EditAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
    agent: User;
}

export function EditAgentModal({ isOpen, onClose, agent }: EditAgentModalProps) {
    const { updateAgent } = useApp();
    const [formData, setFormData] = useState({
        name: agent.name,
        email: agent.email,
        role: agent.role as UserRole,
    });

    useEffect(() => {
        setFormData({
            name: agent.name,
            email: agent.email,
            role: agent.role as UserRole,
        });
    }, [agent]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateAgent(agent.id, formData);
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-md rounded-[2rem] p-0 overflow-hidden border-none shadow-xl"
        >
            <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                    <Shield size={140} />
                </div>
                <div className="relative z-10">
                    <h2 className="text-xl font-bold tracking-tight uppercase">Modifier Profil Agent</h2>
                    <p className="text-slate-400 text-[10px] mt-1 font-bold uppercase tracking-wider">Mise à jour des habilitations : {agent.name}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
                <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block ml-1">Identité & Role</label>
                    <div className="space-y-4">
                        <div className="relative group">
                            <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                            <Input
                                required
                                placeholder="Nom complet"
                                className="h-12 pl-12 bg-slate-50 border-slate-100 rounded-xl font-semibold outline-none"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="relative group">
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                            <Input
                                required
                                type="email"
                                placeholder="Email professionnel"
                                className="h-12 pl-12 bg-slate-50 border-slate-100 rounded-xl font-semibold outline-none"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <select
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 h-12 text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                        >
                            <option value="MKT">Agent Marketing (MKT)</option>
                            <option value="Sales">Agent Commercial (Sales)</option>
                            <option value="BO">Agent Back-Office (BO)</option>
                            <option value="Supervisor">Superviseur</option>
                            <option value="Admin">Administrateur</option>
                        </select>
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
