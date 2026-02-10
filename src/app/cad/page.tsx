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
    XCircle
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
                    <h1 className="text-3xl font-bold tracking-tight">CAD & Technical Validation</h1>
                    <p className="text-muted-foreground mt-1">Review, version, and approve technical structural plans.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <History size={18} />
                        Version History
                    </Button>
                    <Button className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
                        Upload DWG / BCF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCardSimple
                    label="Pending Approval"
                    value="8"
                    icon={Clock}
                    color="text-amber-500"
                    bgColor="bg-amber-50"
                />
                <StatsCardSimple
                    label="Validated Q1"
                    value="142"
                    icon={CheckCircle2}
                    color="text-emerald-500"
                    bgColor="bg-emerald-50"
                />
                <StatsCardSimple
                    label="Rejected/Revision"
                    value="12"
                    icon={XCircle}
                    color="text-rose-500"
                    bgColor="bg-rose-50"
                />
            </div>

            <Card className="border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Technical Plans Repository</CardTitle>
                        <CardDescription>All validated and pending structural plans linked to projects.</CardDescription>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative w-64">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <Input placeholder="Search plans..." className="pl-10 h-9 bg-slate-50" />
                        </div>
                        <Button variant="outline" size="sm" className="h-9">
                            <Filter size={16} className="mr-2" />
                            Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b text-left text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                <th className="py-4">Plan Identification</th>
                                <th className="py-4">Project</th>
                                <th className="py-4">Version</th>
                                <th className="py-4">Status</th>
                                <th className="py-4">Size</th>
                                <th className="py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {cadPlans.map((plan) => (
                                <tr key={plan.id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                                                <Layers size={20} />
                                            </div>
                                            <div>
                                                <span className="font-bold text-sm block">{plan.name}</span>
                                                <span className="text-[10px] text-slate-400 uppercase tracking-tight">ID: #CAD-{plan.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5">
                                        <span className="text-xs font-semibold text-slate-600">Bridgeport Comm. Center</span>
                                    </td>
                                    <td className="py-5">
                                        <Badge variant="secondary" className="font-bold text-[10px] px-2 py-0 border-slate-200 text-slate-500 bg-white shadow-sm">
                                            V{plan.version}
                                        </Badge>
                                    </td>
                                    <td className="py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                            <span className="text-xs font-bold text-emerald-600">Validated</span>
                                        </div>
                                    </td>
                                    <td className="py-5 text-xs text-slate-400">{plan.size}</td>
                                    <td className="py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-200">
                                                <Eye size={16} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-200">
                                                <Download size={16} />
                                            </Button>
                                            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                                                Re-Validate
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
                <Card className="border-none bg-slate-50 shadow-sm border border-slate-100">
                    <CardHeader>
                        <CardTitle className="text-lg">AI Collision Detection</CardTitle>
                        <CardDescription>Automated structural integrity and interference analysis.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 bg-white rounded-xl border border-rose-100 flex items-center justify-between group cursor-pointer hover:border-rose-300 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                                        <FileWarning size={24} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-sm">Hard Interference: HVAC vs structural beam</h5>
                                        <p className="text-xs text-slate-500 mt-1">Bridgeport Project - Section B2</p>
                                    </div>
                                </div>
                                <Badge variant="destructive" className="animate-pulse">Critical</Badge>
                            </div>

                            <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-sm">Integrity Pass: Plumbing Layout</h5>
                                        <p className="text-xs text-slate-500 mt-1">Oakwood Villa - Ground Floor</p>
                                    </div>
                                </div>
                                <Badge variant="success">All Clear</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md overflow-hidden bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Version Comments</CardTitle>
                        <CardDescription>Feedback from technical directors and field engineers.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-50">
                            <div className="p-6 hover:bg-slate-50/50 transition-colors">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">MR</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold">Marco Rossi</span>
                                            <span className="text-[10px] text-slate-400">2h ago</span>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed italic">
                                            "The revision on V2 seems to address the bearing load issues we saw last week. Proceed with validation."
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 hover:bg-slate-50/50 transition-colors">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 border border-slate-300 flex items-center justify-center text-[10px] font-bold">JS</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold">Jane Smith</span>
                                            <span className="text-[10px] text-slate-400">Yesterday</span>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed italic">
                                            "Need to clarify the electrical conduit routing on the South Wing. V1.5 is still showing the old path."
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
        <Card className="border-none shadow-sm bg-background hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
                <div className={cn("p-4 rounded-2xl flex items-center justify-center", bgColor, color)}>
                    <Icon size={24} />
                </div>
                <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                    <h3 className="text-3xl font-bold mt-1 tracking-tight">{value}</h3>
                </div>
            </CardContent>
        </Card>
    );
}
