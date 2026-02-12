"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Building,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ChevronLeft,
    Briefcase,
    FileText,
    MessageSquare,
    DollarSign,
    Plus,
    ExternalLink,
    MoreVertical,
    PlusCircle,
    Clock,
    CheckCircle2,
    ArrowUpRight,
    TrendingUp,
    User,
    AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockClients, mockProjects, mockCommunications, mockDocuments } from "@/lib/mock-data";
import { cn, formatDate, formatCurrency } from "@/lib/utils";

import { useApp } from "@/context/AppContext";

type TabType = "Vue d'ensemble" | "Contacts" | "Documents" | "Communications" | "Projets" | "Paiements";

export default function ClientDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { triggerAutomatedTicket } = useApp();
    const [activeTab, setActiveTab] = React.useState<TabType>("Vue d'ensemble");

    const client = mockClients.find(c => c.id === id) || mockClients[0];
    const clientProjects = mockProjects.filter(p => p.clientId === client.id);
    const clientComms = mockCommunications.filter(c => c.clientId === client.id);
    const clientDocs = mockDocuments.filter(d => d.clientId === client.id);

    const tabs: TabType[] = ["Vue d'ensemble", "Contacts", "Documents", "Communications", "Projets", "Paiements"];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col gap-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit font-medium group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Clients
                </button>

                <div className="flex justify-between items-start">
                    <div className="flex gap-6 items-center">
                        <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center text-primary border border-slate-100 shadow-xl shadow-slate-200/50">
                            <Building size={48} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-bold tracking-tight text-slate-900">{client.name}</h1>
                                <Badge variant={client.type === "Client" ? "default" : "secondary"} className="h-6 text-[10px] items-center px-2.5 uppercase tracking-widest font-bold">
                                    {client.type}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-6 mt-3 text-sm text-slate-500 font-medium">
                                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400" /> {client.address || "Adresse non renseignée"}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                <span className="flex items-center gap-1.5 font-bold text-primary"><Briefcase size={16} /> {client.industry}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 bg-white border-slate-200 shadow-sm text-slate-600 hover:text-slate-900">
                            <ExternalLink size={16} />
                            Espace Client
                        </Button>
                        <Button
                            className="gap-2 bg-rose-600 text-white shadow-lg shadow-rose-900/20 hover:bg-rose-700 border-none"
                            onClick={() => triggerAutomatedTicket({
                                type: "Reclamation",
                                clientId: client.id,
                                clientName: client.name,
                                details: `Incident signalé depuis la fiche client : ${client.name}`
                            })}
                        >
                            <AlertTriangle size={16} />
                            Signaler Incident
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-full">
                            <MoreVertical size={20} className="text-slate-400" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Quick View */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="card-premium py-2">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600 transform group-hover:scale-110 transition-transform duration-300">
                            <Briefcase size={22} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Projects</p>
                            <p className="text-2xl font-bold text-slate-900">{client.projectsCount}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="card-premium py-2">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 transform group-hover:scale-110 transition-transform duration-300">
                            <DollarSign size={22} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Lifetime Value</p>
                            <p className="text-2xl font-bold text-slate-900">$342,000</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="card-premium py-2">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-amber-50 text-amber-600 transform group-hover:scale-110 transition-transform duration-300">
                            <Clock size={22} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Hours</p>
                            <p className="text-2xl font-bold text-slate-900">1,840h</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="card-premium py-2">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-rose-50 text-rose-600 transform group-hover:scale-110 transition-transform duration-300">
                            <Calendar size={22} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Client Since</p>
                            <p className="text-2xl font-bold text-slate-900">Jan 2023</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-hide gap-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "pb-4 text-xs font-bold uppercase tracking-widest transition-all relative whitespace-nowrap",
                            activeTab === tab
                                ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {activeTab === "Vue d'ensemble" && (
                        <div className="space-y-8">
                            <Card className="card-premium">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-1 rounded-full bg-primary/40"></div>
                                        <CardTitle className="text-lg">Business Summary</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                        {client.name} is a key strategic partner in the {client.industry} sector.
                                        They have consistently shown high engagement across structural validation and CAD project phases.
                                        Currently, they are expanding their infrastructure in the North East region.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                                        <div className="space-y-2">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Risk Level</span>
                                            <div className="flex items-center gap-3">
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500 w-[15%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                                </div>
                                                <span className="text-xs font-bold text-emerald-600">Low</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Growth Potential</span>
                                            <div className="flex items-center gap-3">
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary w-[85%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                                </div>
                                                <span className="text-xs font-bold text-primary">High</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="card-premium">
                                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                                        <CardTitle className="text-sm flex items-center gap-2 font-bold uppercase tracking-wide text-slate-500"><Briefcase size={16} className="text-primary" /> Active Deals</CardTitle>
                                        <Badge variant="outline" className="text-[9px] font-bold">2 Active</Badge>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                                            <div>
                                                <p className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">Cloud Infrastructure Phase 2</p>
                                                <p className="text-[10px] text-slate-400 mt-1 font-bold">$150,000</p>
                                            </div>
                                            <Badge variant="secondary" className="bg-white text-slate-500 border border-slate-100 shadow-sm text-[9px]">Negotiation</Badge>
                                        </div>
                                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                                            <div>
                                                <p className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">Annual Security Audit</p>
                                                <p className="text-[10px] text-slate-400 mt-1 font-bold">$45,000</p>
                                            </div>
                                            <Badge variant="secondary" className="bg-white text-slate-500 border border-slate-100 shadow-sm text-[9px]">Qualified</Badge>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="card-premium">
                                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                                        <CardTitle className="text-sm flex items-center gap-2 font-bold uppercase tracking-wide text-slate-500"><CheckCircle2 size={16} className="text-emerald-500" /> Milestones</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-start gap-3 relative pb-4 border-l border-slate-100 ml-1 pl-4">
                                            <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800">Permit Approval Received</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">2 days ago • Site #42</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 relative pl-4 border-l border-slate-100 ml-1">
                                            <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-200 ring-4 ring-white"></div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400">Groundbreaking Ceremony</p>
                                                <p className="text-[10px] text-slate-400 italic mt-0.5">Scheduled for next week</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === "Projets" && (
                        <div className="grid grid-cols-1 gap-4">
                            {clientProjects.map(project => (
                                <Card key={project.id} className="card-premium group hover:border-primary/30 transition-all cursor-pointer">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                    <Building size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-slate-900">{project.name}</h4>
                                                    <Badge variant="outline" className="mt-1 text-[9px] uppercase tracking-widest border-slate-200 text-slate-500">{project.status}</Badge>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-slate-900">{project.progress}%</span>
                                                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Completion</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                                            <div className="h-full bg-primary" style={{ width: `${project.progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Due: <span className="text-slate-600">{project.endDate}</span></span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Value: <span className="text-primary">{formatCurrency(project.budget)}</span></span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            <Button variant="outline" className="w-full border-dashed h-24 text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 flex-col gap-2 rounded-2xl border-2 transition-all">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/20">
                                    <Plus size={20} />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest">Start New Project for {client.name}</span>
                            </Button>
                        </div>
                    )}

                    {activeTab === "Communications" && (
                        <div className="space-y-4">
                            {clientComms.map(comm => (
                                <Card key={comm.id} className="card-premium hover:shadow-md transition-all cursor-pointer">
                                    <CardContent className="p-5 flex gap-5">
                                        <div className="flex-shrink-0 pt-1">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                                                comm.type === "Email" ? "bg-blue-50 text-blue-500 border border-blue-100" : "bg-emerald-50 text-emerald-500 border border-emerald-100"
                                            )}>
                                                {comm.type === "Email" ? <Mail size={18} /> : <MessageSquare size={18} />}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-sm text-slate-900 truncate">{comm.subject || `Echange avec ${comm.sender}`}</h4>
                                                <div className="flex items-center gap-3">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            triggerAutomatedTicket({
                                                                type: "Reclamation",
                                                                clientId: client.id,
                                                                clientName: client.name,
                                                                details: `Litige signalé depuis communication : ${comm.content}`
                                                            });
                                                        }}
                                                    >
                                                        Signaler Litige
                                                    </Button>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{formatDate(comm.timestamp)}</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                                                {comm.content}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Placeholders for other tabs */}
                    {["Contacts", "Documents", "Paiements"].includes(activeTab) && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-300 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
                            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
                                <PlusCircle size={32} className="text-slate-300" />
                            </div>
                            <h4 className="font-bold text-slate-400 tracking-widest uppercase text-sm">Aucun(e) {activeTab} pour le moment</h4>
                            <p className="text-xs mt-1 text-slate-400">Ce module est prêt pour l'intégration production.</p>
                            <Button variant="outline" className="mt-6 gap-2 h-9 text-xs font-bold uppercase tracking-widest bg-white hover:bg-slate-50 text-slate-600 border-slate-200">
                                <Plus size={14} /> Ajouter {activeTab.slice(0, -1)}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Right Sidebar - Info Sidebar */}
                <div className="space-y-6">
                    <Card className="card-premium bg-slate-50/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                                <User size={16} /> Primary Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-white border-2 border-white flex items-center justify-center font-bold text-xl text-primary shadow-lg ring-1 ring-slate-100">
                                    {client.contactPerson.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-base text-slate-900">{client.contactPerson}</h4>
                                    <p className="text-xs text-slate-500 font-medium bg-slate-100 inline-block px-2 py-0.5 rounded-full mt-1">Chief Project Coordinator</p>
                                </div>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-slate-200">
                                <a href={`mailto:${client.email}`} className="flex items-center gap-3 text-xs font-medium text-slate-600 hover:text-primary transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center group-hover:border-primary/30 group-hover:text-primary transition-colors shadow-sm">
                                        <Mail size={14} />
                                    </div>
                                    <span>{client.email}</span>
                                </a>
                                <a href={`tel:${client.phone}`} className="flex items-center gap-3 text-xs font-medium text-slate-600 hover:text-primary transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center group-hover:border-primary/30 group-hover:text-primary transition-colors shadow-sm">
                                        <Phone size={14} />
                                    </div>
                                    <span>{client.phone}</span>
                                </a>
                                <div className="flex items-center gap-3 text-xs font-medium text-slate-600 group">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-400">
                                        <MapPin size={14} />
                                    </div>
                                    <span>{client.address}</span>
                                </div>
                            </div>
                            <Button className="w-full h-10 text-xs font-bold uppercase tracking-widest gap-2 bg-slate-900 text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800">
                                <MessageSquare size={14} /> Send Quick Message
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="card-premium !bg-slate-900 !border-slate-800 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                            <TrendingUp size={120} />
                        </div>
                        <CardHeader className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">NexAI Analysis</span>
                            </div>
                            <CardTitle className="text-white text-lg">Key Growth Insights</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 relative z-10">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1.5">Predictive LTV</p>
                                <div className="flex justify-between items-end">
                                    <p className="text-2xl font-bold text-emerald-400">$1.2M</p>
                                    <Badge className="bg-emerald-500/20 text-emerald-300 border-none text-[9px]">
                                        <ArrowUpRight size={10} className="mr-1" />+15% vs Avg
                                    </Badge>
                                </div>
                                <p className="text-[10px] text-slate-500 font-normal mt-1">Projected over next 18 months</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1.5">Renewal Probability</p>
                                <div className="flex items-center gap-3">
                                    <p className="text-2xl font-bold text-amber-400">92%</p>
                                    <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-400 w-[92%]"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2">
                                <p className="text-xs text-slate-400 italic font-medium leading-relaxed border-l-2 border-primary pl-3">
                                    "Client is showing high interest in structural upgrades. Strategic recommendation: Propose CAD validation bundle before Q3."
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}


