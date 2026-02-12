"use client";

import React from "react";
import {
    ShieldCheck,
    FileCheck,
    FileWarning,
    Clock,
    History,
    Layers,
    Search,
    Filter,
    Eye,
    Download,
    CheckCircle2,
    XCircle,
    ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockDocuments } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function CADModulePage() {
    const cadPlans = mockDocuments.filter(doc => doc.category === "Plan" || doc.type === "CAD");

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">CAO & Validation Technique</h1>
                    <p className="text-muted-foreground mt-1">Examinez, versionnez et approuvez les plans structurels techniques.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 bg-white/50 border-slate-200">
                        <History size={18} />
                        Historique des Versions
                    </Button>
                    <Button className="gap-2 bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 font-bold">
                        Téléverser DWG / BCF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCardSimple
                    label="En attente"
                    value="8"
                    icon={Clock}
                    color="text-amber-500"
                    bgColor="bg-amber-50"
                />
                <StatsCardSimple
                    label="Validés T1"
                    value="142"
                    icon={CheckCircle2}
                    color="text-emerald-500"
                    bgColor="bg-emerald-50"
                />
                <StatsCardSimple
                    label="Rejetés / Révision"
                    value="12"
                    icon={XCircle}
                    color="text-rose-500"
                    bgColor="bg-rose-50"
                />
            </div>

            <Card className="card-premium">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Répertoire des Plans Techniques</CardTitle>
                        <CardDescription>Tous les plans structurels validés et en attente liés aux projets.</CardDescription>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative w-64">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <Input placeholder="Rechercher des plans..." className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors text-sm" />
                        </div>
                        <Button variant="outline" size="sm" className="h-10 border-slate-200 text-slate-600">
                            <Filter size={16} className="mr-2" />
                            Filtrer
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b text-left text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                <th className="py-4 pl-4">Identification du Plan</th>
                                <th className="py-4">Projet</th>
                                <th className="py-4">Version</th>
                                <th className="py-4">Statut</th>
                                <th className="py-4">Taille</th>
                                <th className="py-4 pr-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {cadPlans.map((plan) => (
                                <tr key={plan.id} className="group hover:bg-slate-50/80 transition-colors">
                                    <td className="py-5 pl-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                                                <Layers size={20} />
                                            </div>
                                            <div>
                                                <span className="font-bold text-sm block text-slate-800">{plan.name}</span>
                                                <span className="text-[10px] text-slate-400 uppercase tracking-tight font-bold">ID: #CAO-{plan.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5">
                                        <span className="text-xs font-bold text-slate-600">Centre Comm. Bridgeport</span>
                                    </td>
                                    <td className="py-5">
                                        <Badge variant="secondary" className="font-bold text-[10px] px-2 py-0.5 border-slate-200 text-slate-500 bg-white shadow-sm">
                                            V{plan.version}
                                        </Badge>
                                    </td>
                                    <td className="py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                            <span className="text-xs font-bold text-emerald-600">Validé</span>
                                        </div>
                                    </td>
                                    <td className="py-5 text-xs font-bold text-slate-400">{plan.size}</td>
                                    <td className="py-5 pr-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white hover:shadow-sm rounded-full">
                                                <Eye size={16} className="text-slate-500" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white hover:shadow-sm rounded-full">
                                                <Download size={16} className="text-slate-500" />
                                            </Button>
                                            <Button variant="outline" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-emerald-50/50">
                                                Re-valider
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-premium border-none bg-slate-50 shadow-sm border border-slate-100">
                    <CardHeader>
                        <CardTitle className="text-lg">Détection de Collision par IA</CardTitle>
                        <CardDescription>Analyse automatisée de l'intégrité structurelle et des interférences.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 bg-white rounded-2xl border border-rose-100 flex items-center justify-between group cursor-pointer hover:border-rose-300 transition-all shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                                        <FileWarning size={24} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-sm text-slate-800">Interférence majeure : CVC vs poutre</h5>
                                        <p className="text-xs text-slate-500 mt-1 font-medium">Projet Bridgeport - Section B2</p>
                                    </div>
                                </div>
                                <Badge variant="destructive" className="animate-pulse font-bold tracking-wider text-[10px]">CRITIQUE</Badge>
                            </div>

                            <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-emerald-300 transition-all shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-sm text-slate-800">Validation Intégrité : Réseau Plomberie</h5>
                                        <p className="text-xs text-slate-500 mt-1 font-medium">Villa Oakwood - Rez-de-chaussée</p>
                                    </div>
                                </div>
                                <Badge variant="success" className="font-bold tracking-wider text-[10px]">RAS</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="card-premium overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-lg">Commentaires de Version Récents</CardTitle>
                        <CardDescription>Retours des directeurs techniques et des ingénieurs terrain.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-50">
                            <div className="p-6 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shadow-md group-hover:scale-110 transition-transform">MR</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold text-slate-900">Marco Rossi</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">il y a 2h</span>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                            "La révision sur la V2 semble corriger les problèmes de charge portante vus la semaine dernière. OK pour validation."
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center text-[10px] font-bold group-hover:scale-110 transition-transform">JS</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold text-slate-900">Jane Smith</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">Hier</span>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                            "Besoin de clarifier le passage des gaines électriques sur l'aile sud. La V1.5 montre encore l'ancien tracé."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatsCardSimple({ label, value, icon: Icon, color, bgColor }: any) {
    return (
        <Card className="card-premium border-none shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
                <div className={cn("p-4 rounded-2xl flex items-center justify-center shadow-sm", bgColor, color)}>
                    <Icon size={24} />
                </div>
                <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
                    <h3 className="text-3xl font-bold mt-1 tracking-tight text-slate-900">{value}</h3>
                </div>
            </CardContent>
        </Card>
    );
}
