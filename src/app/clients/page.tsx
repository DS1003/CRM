"use client";

import React from "react";
import {
    Users,
    Search,
    Filter,
    Plus,
    MoreVertical,
    Mail,
    Phone,
    Building,
    Calendar,
    ChevronRight,
    MapPin
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockClients } from "@/lib/mock-data";

export default function ClientsPage() {
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredClients = mockClients.filter(
        (client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Clients & Prospects</h1>
                    <p className="text-muted-foreground mt-1">Manage your customer database and lead interactions.</p>
                </div>
                <Button className="gap-2">
                    <Plus size={18} />
                    New Client
                </Button>
            </div>

            <div className="flex gap-4 items-center bg-white p-2 rounded-xl border border-slate-200 shadow-sm px-4">
                <Search size={18} className="text-slate-400" />
                <Input
                    placeholder="Search clients, industries, or contacts..."
                    className="border-none shadow-none focus-visible:ring-0 bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="h-6 w-px bg-slate-100 mx-2"></div>
                <Button variant="ghost" size="sm" className="text-slate-500 gap-2">
                    <Filter size={16} />
                    Filter
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredClients.map((client) => (
                    <Link key={client.id} href={`/clients/${client.id}`}>
                        <Card className="group hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer border-slate-200">
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <Building size={24} />
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical size={16} />
                                    </Button>
                                </div>
                                <div className="mt-4">
                                    <CardTitle className="text-xl">{client.name}</CardTitle>
                                    <CardDescription className="font-medium text-primary">{client.industry}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-slate-600 gap-3">
                                        <Mail size={16} className="text-slate-400" />
                                        <span className="truncate">{client.email}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-slate-600 gap-3">
                                        <Phone size={16} className="text-slate-400" />
                                        <span>{client.phone}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-slate-600 gap-3">
                                        <MapPin size={16} className="text-slate-400" />
                                        <span className="truncate">{client.address}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Projects</span>
                                        <span className="font-bold text-slate-900">{client.projectsCount}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Last Contact</span>
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                                            <Calendar size={14} className="text-slate-400" />
                                            {client.lastInteraction}
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full mt-6 bg-slate-50 text-slate-900 hover:bg-primary hover:text-white border-none shadow-none font-bold uppercase tracking-widest text-[10px] h-10 group/btn transition-all">
                                    View Full Profile
                                    <ChevronRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
