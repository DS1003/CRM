"use client";

import React, { useState } from "react";
import {
    Building2,
    Search,
    Filter,
    Plus,
    CheckCircle2,
    AlertTriangle,
    HardHat,
    ChevronRight,
    TrendingUp,
    MapPin,
    ArrowUpRight,
    Calendar,
    Users,
    Trash2,
    Pencil
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import { cn, formatCurrency } from "@/lib/utils";
import { NewProjectModal } from "@/components/construction/NewProjectModal";
import { EditProjectModal } from "@/components/construction/EditProjectModal";
import { Project } from "@/types";

export default function ConstructionPage() {
    const { projects, deleteProject } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const activeCount = projects.filter(p => p.status === "In Progress" || p.status === "Planning").length;
    const completedCount = projects.filter(p => p.status === "Completed").length;
    const delayedCount = projects.filter(p => p.status === "Delayed").length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900">Hub Construction</h1>
                    <p className="text-muted-foreground mt-2 text-lg">Gestion opérationnelle et suivi des jalons techniques des chantiers.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="gap-2 bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm h-11 px-5">
                        <TrendingUp size={18} />
                        Prévisions
                    </Button>
                    <Button className="gap-2 bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 h-11 px-5 font-bold" onClick={() => setIsModalOpen(true)}>
                        <Plus size={18} />
                        Lancer un projet
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatusCard
                    label="Projets Actifs"
                    value={activeCount.toString()}
                    icon={HardHat}
                    color="text-primary"
                    bgColor="bg-blue-50"
                    borderColor="border-blue-100"
                    description="Projets actuellement en phase structurelle"
                    trend="+12%"
                />
                <StatusCard
                    label="Sites Terminés"
                    value={completedCount.toString()}
                    icon={CheckCircle2}
                    color="text-emerald-600"
                    bgColor="bg-emerald-50"
                    borderColor="border-emerald-100"
                    description="Sites ayant atteint tous les jalons KPI"
                    trend="+5%"
                />
                <StatusCard
                    label="À Risque"
                    value={delayedCount.toString()}
                    icon={AlertTriangle}
                    color="text-rose-600"
                    bgColor="bg-rose-50"
                    borderColor="border-rose-100"
                    description="Retards de validation technique détectés"
                    trend="-2%"
                />
            </div>

            <Card className="card-premium min-h-[600px]">
                <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-slate-50">
                    <div>
                        <CardTitle className="text-2xl text-slate-900">Registre Global des Projets</CardTitle>
                        <CardDescription className="mt-1">Suivi en temps réel de tous les chantiers actifs et en attente.</CardDescription>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative w-72">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <Input placeholder="Rechercher des sites, managers..." className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors text-sm font-medium" />
                        </div>
                        <Button variant="outline" size="sm" className="h-10 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold px-4">
                            <Filter size={16} className="mr-2" />
                            Filtres
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-4">
                        {projects.map((project) => (
                            <Link key={project.id} href={`/construction/${project.id}`}>
                                <div className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 transition-all group flex flex-col md:flex-row gap-6 cursor-pointer relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                                        <ArrowUpRight className="text-primary" size={24} />
                                    </div>

                                    <div className={cn(
                                        "w-20 h-20 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-lg",
                                        project.status === "Delayed" ? "bg-rose-500 shadow-rose-500/20" : "bg-slate-900 shadow-slate-900/20"
                                    )}>
                                        <Building2 size={32} />
                                    </div>

                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">{project.name}</h3>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-bold uppercase tracking-wide">
                                                        <MapPin size={12} className="text-slate-400" /> {project.clientName}
                                                    </p>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-bold uppercase tracking-wide">
                                                        <Users size={12} className="text-slate-400" /> {project.manager}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant={project.status === "Delayed" ? "warning" : "success"} className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 mr-4 border-none ring-1 ring-inset ring-black/5">
                                                {project.status === "In Progress" ? "En cours" :
                                                    project.status === "Delayed" ? "Retardé" :
                                                        project.status === "Completed" ? "Terminé" : project.status}
                                            </Badge>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-50 mr-2"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedProject(project);
                                                    setIsEditModalOpen(true);
                                                }}
                                            >
                                                <Pencil size={14} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:text-rose-500 mr-8"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    if (confirm("Supprimer ce projet ?")) deleteProject(project.id);
                                                }}
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>

                                        <div className="mt-2 flex flex-col md:flex-row md:items-center gap-8">
                                            <div className="flex-1 max-w-md">
                                                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2">
                                                    <span>Progression de la Phase</span>
                                                    <span className="text-slate-900">{project.progress}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn(
                                                            "h-full transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]",
                                                            project.status === "Delayed" ? "bg-rose-500 shadow-rose-500/50" : "bg-primary shadow-blue-500/50"
                                                        )}
                                                        style={{ width: `${project.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="flex gap-8 border-l border-slate-100 pl-8 ml-auto mr-auto md:mr-16">
                                                <div className="space-y-1">
                                                    <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 block">Date échéance</span>
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                                                        <Calendar size={12} className="text-slate-400" />
                                                        {project.endDate}
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 block transition-all group-hover:text-primary">Budget</span>
                                                    <span className="text-xs font-black block text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{formatCurrency(project.budget / 1000)}k</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            {selectedProject && (
                <EditProjectModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    project={selectedProject}
                />
            )}
        </div>
    );
}

function StatusCard({ label, value, icon: Icon, color, bgColor, borderColor, description, trend }: any) {
    return (
        <Card className="card-premium group hover:border-slate-200 transition-colors">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110 duration-300 border", bgColor, color, borderColor)}>
                        <Icon size={24} />
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-4xl font-black tracking-tight text-slate-900">{value}</span>
                        {trend && (
                            <Badge variant={trend.startsWith("+") ? "success" : "warning"} className="text-[9px] px-1.5 py-0 h-4 mt-1 border-none bg-slate-100 text-slate-500">
                                {trend}
                            </Badge>
                        )}
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">{label}</h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}
