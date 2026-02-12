"use client";

import React from "react";
import {
    FileText,
    Search,
    Filter,
    Plus,
    Download,
    Eye,
    Trash2,
    FileCheck,
    FileClock,
    HardDrive,
    FolderOpen,
    MoreVertical
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockDocuments } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DocumentsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Document Management</h1>
                    <p className="text-muted-foreground mt-1">Securely store, organize, and version enterprise assets.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-6 px-6 py-2 bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 bottom-0 left-0 bg-primary/10 w-[2.4%]"></div>
                        <div className="flex items-center gap-2">
                            <HardDrive size={18} className="text-primary" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Storage Used</span>
                                <span className="text-sm font-bold text-slate-900">1.2 GB / 50 GB</span>
                            </div>
                        </div>
                    </div>
                    <Button className="gap-2 bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all">
                        <Plus size={18} />
                        Upload Document
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar - Categories */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="card-premium">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs uppercase tracking-widest text-slate-400 font-bold">Library</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 space-y-1">
                            {[
                                { label: "All Documents", count: 42, icon: FolderOpen, color: "text-slate-500" },
                                { label: "Contracts", count: 12, icon: FileText, color: "text-blue-500" },
                                { label: "Invoices", count: 18, icon: FileText, color: "text-emerald-500" },
                                { label: "Permits", count: 5, icon: FileText, color: "text-amber-500" },
                                { label: "Internal Letters", count: 7, icon: FileText, color: "text-rose-500" },
                            ].map((item) => (
                                <button key={item.label} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all text-sm group">
                                    <div className="flex items-center gap-3">
                                        <item.icon size={18} className={cn("transition-colors", item.color, "group-hover:scale-110 duration-300")} />
                                        <span className="font-semibold text-slate-700 group-hover:text-primary transition-colors">{item.label}</span>
                                    </div>
                                    <Badge variant="secondary" className="bg-slate-100/50 text-slate-500 text-[10px] h-5 min-w-[20px] justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">{item.count}</Badge>
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="card-premium border-none bg-primary/5 border border-primary/10 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <FileCheck size={100} />
                        </div>
                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <FileCheck size={18} />
                                </div>
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">Compliance Status</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-white/50 border border-white/20">
                                    <span className="text-slate-500 font-semibold">Legal Review</span>
                                    <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50/50 text-[10px] font-bold">PASSED</Badge>
                                </div>
                                <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-white/50 border border-white/20">
                                    <span className="text-slate-500 font-semibold">Financial Audit</span>
                                    <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50/50 text-[10px] font-bold">PASSED</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Doc Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex gap-4 items-center bg-white p-2 rounded-xl border border-slate-200 shadow-sm px-4">
                        <Search size={18} className="text-slate-400" />
                        <Input placeholder="Search documents by name, project, or client ID..." className="border-none shadow-none focus-visible:ring-0 bg-transparent h-10 text-sm" />
                        <div className="h-6 w-px bg-slate-100"></div>
                        <Button variant="ghost" size="sm" className="gap-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest hover:text-slate-900">
                            <Filter size={14} />
                            Filters
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockDocuments.map((doc) => (
                            <Card key={doc.id} className="card-premium group hover:shadow-lg transition-all cursor-pointer overflow-hidden border-slate-200/60 bg-white flex flex-col h-full transform hover:-translate-y-1 duration-300">
                                <div className="relative h-48 bg-slate-50/50 flex items-center justify-center p-8 overflow-hidden group-hover:bg-primary/5 transition-colors border-b border-slate-100">
                                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                                    <FileText size={64} className="text-slate-200 group-hover:text-primary/40 transition-all duration-500 group-hover:scale-110 drop-shadow-sm" />
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white text-slate-500">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2 gap-2">
                                        <h4 className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-primary transition-colors" title={doc.name}>{doc.name}</h4>
                                        <Badge variant="outline" className="text-[9px] font-bold uppercase shrink-0 border-slate-200 text-slate-500">{doc.type}</Badge>
                                    </div>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-4 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                        {doc.category}
                                    </p>

                                    <div className="mt-auto space-y-4 pt-4 border-t border-slate-50">
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Uploaded</span>
                                                <span className="text-[11px] font-semibold text-slate-600">{doc.uploadDate}</span>
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Size</span>
                                                <span className="text-[11px] font-semibold text-slate-600">{doc.size}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <Button size="sm" className="flex-1 h-8 text-[10px] font-bold uppercase tracking-widest gap-2 bg-slate-900 text-white shadow-sm hover:bg-slate-800">
                                                <Eye size={12} />
                                                Preview
                                            </Button>
                                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-slate-400 hover:text-primary hover:bg-primary/5 hover:border-primary/20">
                                                <Download size={14} />
                                            </Button>
                                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200">
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <Card className="border-2 border-dashed border-slate-200 bg-slate-50/30 flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all h-full min-h-[320px]">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-300 mb-4 group-hover:bg-white group-hover:text-primary group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-2 border border-slate-100">
                                <Plus size={32} />
                            </div>
                            <h4 className="font-bold text-sm text-slate-600 group-hover:text-primary transition-colors">Drop files here</h4>
                            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">or click to browse local storage</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
