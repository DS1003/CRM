"use client";

import React, { useState } from "react";
import {
    Shield,
    Plus,
    Search,
    Mail,
    CheckCircle2,
    Calendar,
    Phone,
    Trash2,
    MoreVertical,
    Pencil
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { AddAgentModal } from "@/components/admin/AddAgentModal";
import { EditAgentModal } from "@/components/admin/EditAgentModal";
import { User } from "@/types";

export default function AgentsAdminPage() {
    const { staff, deleteAgent } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<User | null>(null);

    const filteredAgents = staff.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md">
                            <Shield size={18} />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Gestion Agents</h1>
                    </div>
                    <p className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider pl-1 font-sans">
                        Habilitations et affectations des équipes
                    </p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="h-11 px-8 bg-slate-900 text-white font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all flex gap-3"
                >
                    <Plus size={18} />
                    Nouvel Agent
                </Button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AgentSummary value={staff.length} label="Total Staff" color="slate" />
                <AgentSummary value={staff.filter(u => u.role === "Sales").length} label="Sales Force" color="emerald" />
                <AgentSummary value={staff.filter(u => u.role === "Supervisor").length} label="Encadrement" color="amber" />
            </div>

            {/* Controls */}
            <div className="flex gap-4">
                <div className="flex-1 relative group">
                    <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Rechercher un collaborateur..."
                        className="h-12 pl-12 bg-white border-slate-200 rounded-xl font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Agent List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAgents.map((agent) => (
                    <Card key={agent.id} className="rounded-3xl border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-white ring-1 ring-slate-100/50 group">
                        <CardContent className="p-7 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden font-black text-slate-300 text-xl">
                                        {agent.avatar ? (
                                            <img src={`https://ui-avatars.com/api/?name=${agent.name}&background=f1f5f9&color=64748b&bold=true`} alt={agent.name} className="w-full h-full object-cover" />
                                        ) : agent.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">{agent.name}</h3>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">{agent.role}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-50"
                                        onClick={() => {
                                            setSelectedAgent(agent);
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        <Pencil size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:text-rose-500"
                                        onClick={() => {
                                            if (confirm(`Supprimer l'accès de ${agent.name} ?`)) deleteAgent(agent.id);
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical size={16} className="text-slate-400" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3 py-4 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                    <Mail size={14} className="text-slate-300" />
                                    {agent.email}
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                    <CheckCircle2 size={14} className="text-emerald-400" />
                                    Actif
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <AddAgentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {selectedAgent && (
                <EditAgentModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    agent={selectedAgent}
                />
            )}
        </div>
    );
}

function AgentSummary({ value, label, color }: any) {
    const colors: any = {
        slate: "bg-slate-50 text-slate-600 border-slate-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
    };

    return (
        <Card className={cn("rounded-3xl border-none shadow-sm p-6 flex flex-col items-center justify-center gap-2 border", colors[color])}>
            <span className="text-3xl font-black tracking-tight">{value}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{label}</span>
        </Card>
    );
}
