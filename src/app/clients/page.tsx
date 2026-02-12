"use client";

import React, { useState } from "react";
import {
    Search,
    Filter,
    Plus,
    MoreVertical,
    Mail,
    Phone,
    Building,
    Calendar,
    ChevronRight,
    MapPin,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import { NewClientModal } from "@/components/clients/NewClientModal";

export default function ClientsPage() {
    const { clients } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredClients = clients.filter(
        (client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Clients & Prospects</h1>
                    <p className="text-muted-foreground mt-1">Gérez votre base de données clients et les interactions avec les prospects.</p>
                </div>
                <Button className="gap-2 bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-bold" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} />
                    Nouveau Client
                </Button>
            </div>

            {/* Controls */}
            <div className="flex gap-4 items-center bg-white/60 backdrop-blur-md p-2 rounded-2xl border border-slate-100 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.05)] px-4 mx-1">
                <Search size={18} className="text-slate-400" />
                <Input
                    placeholder="Rechercher des clients, secteurs ou contacts..."
                    className="border-none shadow-none focus-visible:ring-0 bg-transparent text-slate-700 placeholder:text-slate-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 gap-2 font-medium">
                    <Filter size={16} />
                    Filtrer
                </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredClients.map((client) => (
                    <Link key={client.id} href={`/clients/${client.id}`} className="group block">
                        <Card className="card-premium h-full group-hover:border-primary/20 group-hover:bg-white/80 transition-all cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                                <ArrowUpRight className="text-primary" size={20} />
                            </div>

                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:from-primary/10 group-hover:to-primary/5 group-hover:text-primary transition-all shadow-sm">
                                        <Building size={24} />
                                    </div>
                                    <Badge variant={client.status === "Active" ? "success" : "secondary"} className="mt-1">
                                        {client.status === "Active" ? "Actif" : "Prospect"}
                                    </Badge>
                                </div>
                                <div className="mt-5">
                                    <CardTitle className="text-xl font-bold text-slate-800">{client.name}</CardTitle>
                                    <CardDescription className="font-semibold text-primary text-xs uppercase tracking-wider mt-1">{client.industry}</CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3 py-2">
                                    <div className="flex items-center text-sm text-slate-500 gap-3 group-hover:text-slate-700 transition-colors">
                                        <Mail size={14} className="text-slate-400" />
                                        <span className="truncate">{client.email}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500 gap-3 group-hover:text-slate-700 transition-colors">
                                        <Phone size={14} className="text-slate-400" />
                                        <span>{client.phone}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500 gap-3 group-hover:text-slate-700 transition-colors">
                                        <MapPin size={14} className="text-slate-400" />
                                        <span className="truncate">{client.address || "Aucune adresse"}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Projets Actifs</span>
                                        <span className="font-black text-lg text-slate-800">{client.projectsCount}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Dernier Contact</span>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mt-1">
                                            <Calendar size={12} className="text-slate-400" />
                                            {client.lastInteraction}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}

                {/* No Results Empty State */}
                {filteredClients.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="text-slate-300" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">Aucun client trouvé</h3>
                        <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">
                            Nous n'avons trouvé aucun client correspondant à "{searchTerm}". Essayez d'ajouter un nouveau client.
                        </p>
                        <Button className="mt-6 gap-2 font-bold" variant="outline" onClick={() => setIsModalOpen(true)}>
                            <Plus size={16} /> Ajouter un client
                        </Button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <NewClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </div>
            )}
        </div>
    );
}
