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
    FolderOpen
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
                    <h1 className="text-3xl font-bold tracking-tight">Document Management</h1>
                    <p className="text-muted-foreground mt-1">Securely store, organize, and version enterprise assets.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-6 px-6 py-2 bg-white rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2">
                            <HardDrive size={18} className="text-primary" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Storage Used</span>
                                <span className="text-sm font-bold">1.2 GB / 50 GB</span>
                            </div>
                        </div>
                    </div>
                    <Button className="gap-2">
                        <Plus size={18} />
                        Upload Document
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar - Categories */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="border-slate-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-widest text-slate-400">Library</CardTitle>
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
                                        <item.icon size={18} className={cn("transition-colors", item.color)} />
                                        <span className="font-semibold text-slate-700 group-hover:text-primary transition-colors">{item.label}</span>
                                    </div>
                                    <Badge variant="secondary" className="bg-slate-100 text-[10px] h-5 min-w-[20px] justify-center">{item.count}</Badge>
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-none bg-primary/5 border border-primary/10 overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <FileCheck size={18} className="text-primary" />
                                <span className="text-xs font-bold text-primary">Compliance Status</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Legal Review</span>
                                    <span className="font-bold text-emerald-600">PASSED</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Financial Audit</span>
                                    <span className="font-bold text-emerald-600">PASSED</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Doc Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex gap-4 items-center bg-white p-2 rounded-xl border border-slate-200 shadow-sm px-4">
                        <Search size={18} className="text-slate-400" />
                        <Input placeholder="Search documents by name, project, or client ID..." className="border-none shadow-none focus-visible:ring-0 bg-transparent" />
                        <div className="h-6 w-px bg-slate-100"></div>
                        <Button variant="ghost" size="sm" className="gap-2 text-slate-400">
                            <Filter size={16} />
                            Filters
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockDocuments.map((doc) => (
                            <Card key={doc.id} className="group hover:border-primary/40 transition-all cursor-pointer overflow-hidden border-slate-200 flex flex-col">
                                <div className="h-40 bg-slate-50 flex items-center justify-center p-8 group-hover:bg-primary/5 transition-colors">
                                    <FileText size={64} className="text-slate-300 group-hover:text-primary/30 transition-colors" />
                                </div>
                                <CardContent className="p-4 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-primary transition-colors">{doc.name}</h4>
                                        <Badge variant="outline" className="text-[9px] font-bold uppercase">{doc.type}</Badge>
                                    </div>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-4">{doc.category}</p>

                                    <div className="mt-auto space-y-4 pt-4 border-t border-slate-100">
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

                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" className="flex-1 h-9 text-[10px] font-bold uppercase tracking-widest gap-2">
                                                <Eye size={12} />
                                                Preview
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-9 w-9 p-0 text-slate-400 hover:text-primary hover:bg-primary/5">
                                                <Download size={16} />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-9 w-9 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50">
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <Card className="border-2 border-dashed border-slate-200 bg-slate-50/30 flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all">
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
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
