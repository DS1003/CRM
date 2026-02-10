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
    CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockClients, mockProjects, mockCommunications, mockDocuments } from "@/lib/mock-data";
import { cn, formatDate, formatCurrency } from "@/lib/utils";

type TabType = "Overview" | "Contacts" | "Documents" | "Communications" | "Projects" | "Payments";

export default function ClientDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState<TabType>("Overview");

    const client = mockClients.find(c => c.id === id) || mockClients[0];
    const clientProjects = mockProjects.filter(p => p.clientId === client.id);
    const clientComms = mockCommunications.filter(c => c.clientId === client.id);
    const clientDocs = mockDocuments.filter(d => d.clientId === client.id);

    const tabs: TabType[] = ["Overview", "Contacts", "Documents", "Communications", "Projects", "Payments"];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                    <ChevronLeft size={16} />
                    Back to Clients
                </button>

                <div className="flex justify-between items-start">
                    <div className="flex gap-6 items-center">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm">
                            <Building size={40} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
                                <Badge variant={client.type === "Client" ? "default" : "secondary"}>
                                    {client.type}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1"><MapPin size={14} /> {client.address}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="flex items-center gap-1 font-semibold text-primary">{client.industry}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2">
                            <ExternalLink size={16} />
                            Public Portal
                        </Button>
                        <Button className="gap-2">
                            <PlusCircle size={16} />
                            New Action
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MoreVertical size={20} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Quick View */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                            <Briefcase size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400">Total Projects</p>
                            <p className="text-xl font-bold">{client.projectsCount}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                            <DollarSign size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400">Lifetime Value</p>
                            <p className="text-xl font-bold">$342,000</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400">Total Hours</p>
                            <p className="text-xl font-bold">1,840h</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-rose-50 text-rose-600">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400">Since</p>
                            <p className="text-xl font-bold">Jan 2023</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all relative",
                            activeTab === tab
                                ? "text-primary border-b-2 border-primary"
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === "Overview" && (
                        <div className="space-y-6">
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle className="text-lg">Business Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {client.name} is a key strategic partner in the {client.industry} sector.
                                        They have consistently shown high engagement across structural validation and CAD project phases.
                                        Currently, they are expanding their infrastructure in the North East region.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase font-bold text-slate-400">Risk Level</span>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500 w-[15%]"></div>
                                                </div>
                                                <span className="text-xs font-bold text-emerald-600">Low</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase font-bold text-slate-400">Growth Potential</span>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary w-[85%]"></div>
                                                </div>
                                                <span className="text-xs font-bold text-primary">High</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="border-slate-200">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm flex items-center gap-2"><Briefcase size={16} className="text-primary" /> Active Deals</CardTitle>
                                        <Badge variant="outline">2 Active</Badge>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold">Cloud Infrastructure Phase 2</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">$150,000</p>
                                            </div>
                                            <Badge variant="secondary">Negotiation</Badge>
                                        </div>
                                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold">Annual Security Audit</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">$45,000</p>
                                            </div>
                                            <Badge variant="secondary">Qualified</Badge>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-slate-200">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Project Milestones</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                                            <div>
                                                <p className="text-xs font-bold">Permit Approval Received</p>
                                                <p className="text-[10px] text-slate-400">2 days ago • Site #42</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 w-2 h-2 rounded-full bg-slate-200"></div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400">Groundbreaking Ceremony</p>
                                                <p className="text-[10px] text-slate-400 italic">Scheduled for next week</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === "Projects" && (
                        <div className="grid grid-cols-1 gap-4">
                            {clientProjects.map(project => (
                                <Card key={project.id} className="border-slate-200 group hover:border-primary/30 transition-all cursor-pointer">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary">
                                                    <Building size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm">{project.name}</h4>
                                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{project.status}</p>
                                                </div>
                                            </div>
                                            <Badge variant={project.status === "Delayed" ? "warning" : "success"}>{project.progress}%</Badge>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${project.progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400">
                                            <span>DUE: {project.endDate}</span>
                                            <span className="text-primary">VALUE: {formatCurrency(project.budget)}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            <Button variant="outline" className="w-full border-dashed h-24 text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 flex-col gap-2">
                                <Plus size={20} />
                                Start New Project for {client.name}
                            </Button>
                        </div>
                    )}

                    {activeTab === "Communications" && (
                        <div className="space-y-4">
                            {clientComms.map(comm => (
                                <Card key={comm.id} className="border-slate-200 hover:shadow-sm transition-all">
                                    <CardContent className="p-4 flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center",
                                                comm.type === "Email" ? "bg-blue-50 text-blue-500" : "bg-emerald-50 text-emerald-500"
                                            )}>
                                                {comm.type === "Email" ? <Mail size={18} /> : <MessageSquare size={18} />}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-sm truncate">{comm.subject || `Message with ${comm.sender}`}</h4>
                                                <span className="text-[10px] text-slate-400">{formatDate(comm.timestamp)}</span>
                                            </div>
                                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                                {comm.content}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Placeholders for other tabs for the prototype demo */}
                    {["Contacts", "Documents", "Payments"].includes(activeTab) && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                <PlusCircle size={32} />
                            </div>
                            <h4 className="font-bold text-slate-400 tracking-widest uppercase text-sm">No {activeTab} yet</h4>
                            <p className="text-xs mt-1">This module is ready for production integration.</p>
                            <Button variant="outline" className="mt-6 gap-2 h-9 text-xs">
                                <Plus size={14} /> Add First {activeTab.slice(0, -1)}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Right Sidebar - Info Sidebar */}
                <div className="space-y-6">
                    <Card className="border-slate-200 bg-slate-50/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-widest text-slate-400 font-bold">Primary Contact</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-lg text-primary shadow-sm">
                                    {client.contactPerson.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-base">{client.contactPerson}</h4>
                                    <p className="text-xs text-slate-400">Chief Project Coordinator</p>
                                </div>
                            </div>
                            <div className="space-y-3 pt-4 border-t border-slate-200">
                                <div className="flex items-center gap-3 text-xs text-slate-600">
                                    <Mail size={14} className="text-slate-400" />
                                    <span>{client.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-600">
                                    <Phone size={14} className="text-slate-400" />
                                    <span>{client.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-600">
                                    <MapPin size={14} className="text-slate-400" />
                                    <span>{client.address}</span>
                                </div>
                            </div>
                            <Button variant="secondary" className="w-full h-9 text-xs font-bold gap-2">
                                <MessageSquare size={14} /> Send Quick Message
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-none bg-slate-900 text-white shadow-xl">
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-primary/20 text-primary-foreground border-none text-[8px] tracking-widest">ADVANCED AI</Badge>
                            </div>
                            <CardTitle className="text-white text-base">Key Insights</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Predictive LTV</p>
                                <p className="text-lg font-bold text-emerald-400">$1.2M <span className="text-[10px] text-slate-500 font-normal">Next 18m</span></p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Renewal Probability</p>
                                <p className="text-lg font-bold text-amber-400">92%</p>
                            </div>
                            <div className="pt-2">
                                <p className="text-xs text-slate-400 italic font-medium leading-relaxed">
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
