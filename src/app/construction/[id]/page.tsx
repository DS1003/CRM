"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Building2,
    ChevronLeft,
    Calendar,
    Clock,
    CheckCircle2,
    AlertTriangle,
    HardHat,
    MapPin,
    TrendingUp,
    FileText,
    MessageSquare,
    Users,
    Camera,
    Layers,
    ArrowRight,
    MoreVertical,
    Plus,
    History,
    Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockProjects, mockDocuments, mockCommunications } from "@/lib/mock-data";
import { cn, formatDate, formatCurrency } from "@/lib/utils";

type ProjectTab = "Status" | "Timeline" | "Documents & CAD" | "Tickets" | "Photos" | "SAV";

export default function ProjectDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState<ProjectTab>("Status");

    const project = mockProjects.find(p => p.id === id) || mockProjects[0];
    const projectDocs = mockDocuments.filter(d => d.projectId === project.id);

    const tabs: ProjectTab[] = ["Status", "Timeline", "Documents & CAD", "Tickets", "Photos", "SAV"];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* breadcrumb */}
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                    <ChevronLeft size={16} />
                    Back to Construction Hub
                </button>

                <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                        <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg",
                            project.status === "Delayed" ? "bg-rose-500" : "bg-primary"
                        )}>
                            <Building2 size={32} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
                                <Badge variant={project.status === "Delayed" ? "warning" : "success"}>
                                    {project.status}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground mt-1 flex items-center gap-2">
                                <MapPin size={14} className="text-slate-400" />
                                Global Site #42 • <span className="text-primary font-semibold">{project.clientName}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2">
                            <Activity size={16} />
                            Health Report
                        </Button>
                        <Button className="gap-2">
                            <HardHat size={16} />
                            On-Site Check-in
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MoreVertical size={20} />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-sm bg-white overflow-hidden group">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                            <span className="text-2xl font-bold text-primary">{project.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={cn(
                                    "h-full transition-all duration-1000",
                                    project.status === "Delayed" ? "bg-rose-500" : "bg-primary"
                                )}
                                style={{ width: `${project.progress}%` }}
                            ></div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-tighter">Phase: Structural Integration</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Budget Spent</span>
                        </div>
                        <h3 className="text-2xl font-bold">{formatCurrency(project.spent)}</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-slate-400">Total: {formatCurrency(project.budget / 1000000)}M</span>
                            <Badge variant="outline" className="text-[9px] h-4 py-0 flex items-center bg-slate-50 border-slate-200">
                                {Math.round((project.spent / project.budget) * 100)}% Used
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Team Assigned</span>
                        </div>
                        <div className="flex -space-x-3 mt-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Team Member" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                                +2
                            </div>
                        </div>
                        <p className="text-[10px] text-primary mt-4 uppercase font-bold tracking-tighter cursor-pointer hover:underline">Manage Resources</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Health</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "p-3 rounded-xl",
                                project.status === "Delayed" ? "bg-rose-50 text-rose-500" : "bg-emerald-50 text-emerald-500"
                            )}>
                                {project.status === "Delayed" ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
                            </div>
                            <div>
                                <h4 className="font-bold text-lg leading-none">{project.status === "Delayed" ? "High Risk" : "Stable"}</h4>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">AI Audit Score: 8.4</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-hide py-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all relative flex-shrink-0",
                            activeTab === tab
                                ? "text-primary bg-primary/5 rounded-lg"
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === "Status" && (
                        <div className="space-y-6">
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle className="text-lg">Project Executive Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                        {project.description} Currently in the structural phase. Site prep and foundation validation are 100% complete.
                                        Focus is now on vertical structural elements and CAD technical layout for electrical integration.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t font-semibold">
                                        <div className="space-y-4">
                                            <h5 className="text-[10px] uppercase font-black tracking-widest text-slate-400">Next Critical Milestone</h5>
                                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                                                    <Layers size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs">Roof Structure Validation</p>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">EST: April 12, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h5 className="text-[10px] uppercase font-black tracking-widest text-slate-400">Primary Contact</h5>
                                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                                                    <img src={`https://i.pravatar.cc/150?u=12`} alt="Manager" />
                                                </div>
                                                <div>
                                                    <p className="text-xs">{project.manager}</p>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">Senior Site Manager</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="border-slate-200">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Critical Alerts</CardTitle>
                                        {project.status === "Delayed" && <Badge variant="destructive" className="animate-pulse">Active</Badge>}
                                    </CardHeader>
                                    <CardContent>
                                        {project.status === "Delayed" ? (
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3 p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                                                    <AlertTriangle size={16} className="text-rose-500 mt-0.5" />
                                                    <p className="text-[11px] text-rose-700 font-medium leading-relaxed">
                                                        CAD validation for HVAC routing is 4 days overdue. Structural work on Section B2 is currently paused.
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-8 text-slate-300">
                                                <CheckCircle2 size={32} className="opacity-20 mb-2" />
                                                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">No critical alerts</span>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card className="border-slate-200">
                                    <CardHeader>
                                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Recent Updates</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="w-1 h-full bg-primary/20 rounded-full"></div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800">Foundation QC signed off</p>
                                                <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold">Today • Marco R.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="w-1 h-full bg-slate-100 rounded-full"></div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium">CAD V2.1 revision submitted</p>
                                                <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold">Yesterday • Sarah C.</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === "Documents & CAD" && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm px-6">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project Repository</span>
                                <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase gap-2">
                                    <Plus size={14} /> Add New Version
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projectDocs.map(doc => (
                                    <Card key={doc.id} className="border-slate-200 hover:border-primary/40 transition-all cursor-pointer group">
                                        <CardContent className="p-4 flex gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                                <FileText size={24} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-sm truncate">{doc.name}</h4>
                                                <div className="flex items-center justify-between mt-2">
                                                    <Badge variant="secondary" className="text-[9px] px-1.5 h-4 uppercase tracking-tighter">V{doc.version}</Badge>
                                                    <span className="text-[10px] text-slate-400 font-bold">{doc.size}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "Timeline" && (
                        <Card className="border-slate-200">
                            <CardContent className="p-8">
                                <div className="space-y-12">
                                    {[
                                        { date: "June 2023", title: "Project Initiation", status: "Completed", icon: CheckCircle2, color: "text-emerald-500" },
                                        { date: "Sept 2023", title: "Foundation & Groundwork", status: "Completed", icon: CheckCircle2, color: "text-emerald-500" },
                                        { date: "Jan 2024", title: "Structural Shell Completion", status: "In Progress", icon: Clock, color: "text-blue-500" },
                                        { date: "May 2024", title: "Technical Integration (MEP)", status: "Pending", icon: Layers, color: "text-slate-300" },
                                        { date: "Aug 2024", title: "Final Validation & Handover", status: "Pending", icon: FlagIcon, color: "text-slate-300" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="relative flex gap-8 group">
                                            {idx !== 4 && <div className="absolute left-[19px] top-10 w-0.5 h-16 bg-slate-100 group-last:hidden"></div>}
                                            <div className={cn("z-10 w-10 h-10 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center", item.color)}>
                                                <item.icon size={18} />
                                            </div>
                                            <div className="flex-1 pt-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">{item.date}</span>
                                                    <Badge variant="secondary" className="h-4 text-[8px] py-0 px-1 border-none bg-slate-100 text-slate-500 font-bold uppercase">{item.status}</Badge>
                                                </div>
                                                <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {["Tickets", "Photos", "SAV"].includes(activeTab) && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                                <Activity size={32} className="opacity-20" />
                            </div>
                            <h4 className="font-bold text-slate-400 tracking-widest uppercase text-sm">No {activeTab} Data Found</h4>
                            <p className="text-xs mt-1">This projection is estimated based on future milestones.</p>
                            <Button className="mt-8 gap-2 bg-slate-900 h-9 text-xs">
                                Initialize {activeTab} Records
                            </Button>
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    <Card className="border-slate-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-widest text-slate-400 font-bold">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start h-10 text-xs font-bold gap-3 hover:bg-slate-50 border-slate-200">
                                <Camera size={16} className="text-slate-400" /> Upload Site Photos
                            </Button>
                            <Button variant="outline" className="w-full justify-start h-10 text-xs font-bold gap-3 hover:bg-slate-50 border-slate-200">
                                <Layers size={16} className="text-slate-400" /> Request CAD Review
                            </Button>
                            <Button variant="outline" className="w-full justify-start h-10 text-xs font-bold gap-3 hover:bg-slate-50 border-slate-200">
                                <FileText size={16} className="text-slate-400" /> Generate Status PDF
                            </Button>
                            <Button variant="outline" className="w-full justify-start h-10 text-xs font-bold gap-3 hover:bg-slate-50 border-slate-200">
                                <MessageSquare size={16} className="text-slate-400" /> Notify Stakeholders
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-none bg-slate-50 shadow-sm border border-slate-100">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <TrendingUp size={14} className="text-primary" />
                                AI Timeline Forecast
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-slate-500">Projected Delivery</span>
                                    <span className="text-amber-600">Sept 12, 2024</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-[10px] text-amber-700 font-medium leading-relaxed italic">
                                    "Current structural validation backlog adds 12 days to the estimated handover date."
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-slate-200">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Risk Assessment</span>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-rose-500 w-[65%]"></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-rose-600">MEDIUM-HIGH</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function FlagIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
    );
}
