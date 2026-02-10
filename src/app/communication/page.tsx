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
    Paperclip
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
                    <h1 className="text-3xl font-bold tracking-tight">Communication Hub</h1>
                    <p className="text-muted-foreground mt-1">Unified view of all omnichannel interactions and internal notes.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Mail size={16} />
                        Integrate Email
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Smartphone size={16} />
                        Setup WhatsApp
                    </Button>
                    <Button size="sm" className="gap-2">
                        <Plus size={16} />
                        New Message
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
                {/* Left Sidebar - Channels */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-slate-200">
                        <CardContent className="p-4 space-y-2">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Channels</span>
                                <Badge variant="success" className="h-2 w-2 p-0 rounded-full"></Badge>
                            </div>
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
                                        "flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                                        activeTab === item.value
                                            ? "bg-primary text-white shadow-md shadow-primary/20"
                                            : "text-slate-600 hover:bg-slate-50"
                                    )}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-none bg-slate-900 text-white overflow-hidden shadow-lg">
                        <CardContent className="p-6">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">AI Assistant</span>
                            <h4 className="mt-2 font-bold leading-tight">3 Communications require immediate response.</h4>
                            <p className="text-xs text-slate-400 mt-2">I can draft suggested replies based on previous contract history.</p>
                            <Button className="w-full mt-4 bg-white text-slate-900 hover:bg-slate-100 border-none text-xs font-bold h-9">
                                Draft with NexAI
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Dynamic Communication Feed */}
                <div className="lg:col-span-3 flex flex-col space-y-4 overflow-hidden">
                    <div className="flex gap-4 items-center bg-white p-2 rounded-xl border border-slate-200 shadow-sm px-4">
                        <Search size={18} className="text-slate-400" />
                        <Input placeholder="Search threads, content or sender..." className="border-none shadow-none focus-visible:ring-0 bg-transparent" />
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {filteredComms.map((comm) => (
                            <Card key={comm.id} className="border-slate-200 group hover:shadow-md transition-all cursor-pointer overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex">
                                        <div className={cn(
                                            "w-12 flex flex-col items-center pt-6 bg-slate-50/50 border-r border-slate-100",
                                            comm.type === "Email" ? "border-l-4 border-l-blue-500" :
                                                comm.type === "WhatsApp" ? "border-l-4 border-l-emerald-500" :
                                                    "border-l-4 border-l-amber-500"
                                        )}>
                                            {getTypeIcon(comm.type)}
                                        </div>
                                        <div className="flex-1 p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
                                                        <User size={20} className="text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900">{comm.sender}</h4>
                                                        <p className="text-xs text-slate-400">{comm.recipient}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className="text-[10px] font-bold text-slate-400">{formatDate(comm.timestamp)}</span>
                                                    <div className="flex gap-1">
                                                        <Badge variant="secondary" className="text-[9px] uppercase tracking-tighter h-5">
                                                            Ref: #C1-P1
                                                        </Badge>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                                            <MoreVertical size={14} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {comm.subject && <h5 className="font-bold text-sm mb-2 text-slate-700">{comm.subject}</h5>}
                                            <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                                                {comm.content}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                                <div className="flex gap-2">
                                                    {comm.attachment && (
                                                        <Badge variant="outline" className="gap-1.5 py-1 px-2 border-slate-200 bg-white shadow-sm text-slate-500">
                                                            <Paperclip size={12} />
                                                            <span className="text-[10px] font-bold">{comm.attachment}</span>
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest">
                                                        Mark as Resolved
                                                    </Button>
                                                    <Button size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest gap-2">
                                                        Reply Thread
                                                        <ArrowRight size={12} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {filteredComms.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 text-slate-300">
                                <MessageSquare size={48} className="opacity-10 mb-4" />
                                <p className="text-sm font-bold uppercase tracking-widest opacity-20">No communications found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
