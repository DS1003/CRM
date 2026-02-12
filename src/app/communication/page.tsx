"use client";

import React from "react";
import {
    MessageSquare,
    Mail,
    Smartphone,
    FileEdit,
    Search,
    Plus,
    ArrowRight,
    User,
    MoreVertical,
    Paperclip,
    ArrowUpRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockCommunications } from "@/lib/mock-data";
import { cn, formatDate } from "@/lib/utils";

export default function CommunicationPage() {
    const [activeTab, setActiveTab] = React.useState<"All" | "Email" | "WhatsApp" | "Internal Note">("All");

    const filteredComms = activeTab === "All"
        ? mockCommunications
        : mockCommunications.filter(c => c.type === activeTab);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Email": return <Mail size={16} className="text-blue-500" />;
            case "WhatsApp": return <Smartphone size={16} className="text-emerald-500" />;
            case "Internal Note": return <FileEdit size={16} className="text-amber-500" />;
            default: return <MessageSquare size={16} />;
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-160px)] space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Communication Hub</h1>
                    <p className="text-muted-foreground mt-1">Unified view of all omnichannel interactions and internal notes.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-white/50 border-slate-200">
                        <Mail size={16} />
                        Integrate Email
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-white/50 border-slate-200">
                        <Smartphone size={16} />
                        Setup WhatsApp
                    </Button>
                    <Button size="sm" className="gap-2 bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20">
                        <Plus size={16} />
                        New Message
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
                {/* Left Sidebar - Channels */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="card-premium">
                        <CardContent className="p-4 space-y-2">
                            <div className="flex items-center justify-between mb-2 px-3 pt-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Channels</span>
                                <Badge variant="success" className="h-2 w-2 p-0 rounded-full animate-pulse"></Badge>
                            </div>
                            <div className="space-y-1">
                                {[
                                    { label: "All Communications", icon: MessageSquare, value: "All" },
                                    { label: "Email (Outlook)", icon: Mail, value: "Email" },
                                    { label: "WhatsApp Business", icon: Smartphone, value: "WhatsApp" },
                                    { label: "Internal Team Notes", icon: FileEdit, value: "Internal Note" },
                                ].map((item) => (
                                    <button
                                        key={item.value}
                                        onClick={() => setActiveTab(item.value as any)}
                                        className={cn(
                                            "flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                                            activeTab === item.value
                                                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        <item.icon size={18} className={cn("transition-colors", activeTab === item.value ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} />
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="card-premium !bg-slate-900 !border-slate-800 text-white overflow-hidden relative group">
                        <div className="absolute -top-10 -right-10 p-12 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                            <ArrowUpRight size={120} />
                        </div>
                        <CardContent className="p-6 relative z-10">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-primary mb-2 block">AI Assistant</span>
                            <h4 className="text-lg font-bold leading-tight">3 Communications require immediate response.</h4>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">I can draft suggested replies based on previous contract history and tone analysis.</p>
                            <Button className="w-full mt-4 bg-white/10 text-white hover:bg-white/20 border-white/10 border text-xs font-bold h-9">
                                Draft with NexAI
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Dynamic Communication Feed */}
                <div className="lg:col-span-3 flex flex-col space-y-4 overflow-hidden h-full">
                    <div className="flex gap-4 items-center bg-white p-2 rounded-2xl border border-slate-200 shadow-sm px-4">
                        <Search size={18} className="text-slate-400" />
                        <Input placeholder="Search threads, subject, content or sender..." className="border-none shadow-none focus-visible:ring-0 bg-transparent h-10 text-sm" />
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-4 custom-scrollbar">
                        {filteredComms.map((comm) => (
                            <Card key={comm.id} className="card-premium group hover:border-primary/30 transition-all cursor-pointer overflow-hidden border-slate-200/60 bg-white">
                                <CardContent className="p-0">
                                    <div className="flex">
                                        <div className={cn(
                                            "w-14 flex flex-col items-center pt-6 bg-slate-50/50 border-r border-slate-100/50 transition-colors",
                                            comm.type === "Email" ? "group-hover:bg-blue-50/30" :
                                                comm.type === "WhatsApp" ? "group-hover:bg-emerald-50/30" :
                                                    "group-hover:bg-amber-50/30"
                                        )}>
                                            <div className={cn(
                                                "p-2 rounded-lg transition-transform group-hover:scale-110",
                                                comm.type === "Email" ? "bg-blue-100/50 text-blue-600" :
                                                    comm.type === "WhatsApp" ? "bg-emerald-100/50 text-emerald-600" :
                                                        "bg-amber-100/50 text-amber-600"
                                            )}>
                                                {getTypeIcon(comm.type)}
                                            </div>
                                        </div>
                                        <div className="flex-1 p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                                                        <User size={20} className="text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 text-sm">{comm.sender}</h4>
                                                        <p className="text-[11px] text-slate-500 font-medium">{comm.recipient}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{formatDate(comm.timestamp)}</span>
                                                    <div className="flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Badge variant="secondary" className="text-[9px] uppercase tracking-tighter h-5 px-1.5 border-slate-200 bg-slate-50">
                                                            Ref: #C1-P1
                                                        </Badge>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-slate-100">
                                                            <MoreVertical size={14} className="text-slate-400" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {comm.subject && <h5 className="font-bold text-sm mb-1 text-slate-800">{comm.subject}</h5>}
                                            <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed max-w-3xl">
                                                {comm.content}
                                            </p>

                                            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                                <div className="flex gap-2">
                                                    {comm.attachment && (
                                                        <Badge variant="outline" className="gap-1.5 py-1 px-2 border-slate-200 bg-slate-50/50 shadow-sm text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
                                                            <Paperclip size={10} />
                                                            <span className="text-[9px] font-bold truncate max-w-[150px]">{comm.attachment}</span>
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900">
                                                        Mark Resolved
                                                    </Button>
                                                    <Button size="sm" className="h-7 text-[10px] font-bold uppercase tracking-widest gap-2 bg-slate-900 text-white shadow-sm hover:bg-slate-800">
                                                        Reply
                                                        <ArrowRight size={10} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {filteredComms.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 text-slate-300 border-2 border-dashed border-slate-100 rounded-3xl m-4">
                                <MessageSquare size={48} className="opacity-10 mb-4" />
                                <p className="text-xs font-bold uppercase tracking-widest opacity-40">No communications found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
