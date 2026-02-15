"use client";

import React, { useState, useEffect } from "react";
import { X, Building2, Calendar, User, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp } from "@/context/AppContext";
import { Dialog } from "@/components/ui/Dialog";
import { Project } from "@/types";

interface EditProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project;
}

export function EditProjectModal({ isOpen, onClose, project }: EditProjectModalProps) {
    const { updateProject } = useApp();
    const [formData, setFormData] = useState({
        name: project.name,
        clientName: project.clientName,
        budget: project.budget,
        manager: project.manager,
        progress: project.progress,
        status: project.status,
    });

    useEffect(() => {
        setFormData({
            name: project.name,
            clientName: project.clientName,
            budget: project.budget,
            manager: project.manager,
            progress: project.progress,
            status: project.status,
        });
    }, [project]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProject(project.id, formData);
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-lg rounded-[2rem] p-0 overflow-hidden border-none shadow-xl"
        >
            <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-xl font-bold tracking-tight uppercase">Modifier Projet</h2>
                    <p className="text-slate-400 text-[10px] mt-1 font-bold uppercase tracking-wider">Mise à jour technique : {project.name}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-white">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Project Name</label>
                    <div className="relative">
                        <Building2 size={16} className="absolute left-3 top-3 text-slate-400" />
                        <Input
                            required
                            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Budget ($)</label>
                        <div className="relative">
                            <DollarSign size={16} className="absolute left-3 top-3 text-slate-400" />
                            <Input
                                required
                                type="number"
                                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Progression (%)</label>
                        <Input
                            type="number"
                            min="0"
                            max="100"
                            className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                            value={formData.progress}
                            onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Project Manager</label>
                    <div className="relative">
                        <User size={16} className="absolute left-3 top-3 text-slate-400" />
                        <Input
                            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                            value={formData.manager}
                            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                        />
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>Annuler</Button>
                    <Button type="submit" className="flex-1 bg-slate-900 text-white font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all">
                        Mettre à jour
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
