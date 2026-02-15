"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { mockClients, mockSaleLeads, mockProjects, mockTickets, mockMotifs } from "@/lib/mock-data";
import {
    Ticket, TicketStatus, TicketPriority, TicketType, TicketChannel, TicketTimelineEvent,
    Client, SaleLead, Project, Notification, User, Motif, Interaction, InteractionChannel, ProspectStatus
} from "@/types";

interface AppContextType {
    user: User | null;
    login: (email: string, role: string) => void;
    logout: () => void;
    notifications: Notification[];
    markNotificationAsRead: (id: string) => void;
    clearAllNotifications: () => void;
    updateRole: (role: string) => void;
    clients: Client[];
    leads: SaleLead[];
    projects: Project[];
    motifs: Motif[];
    staff: User[];
    addClient: (client: Omit<Client, "id" | "interactions" | "lastInteraction"> & { lastInteraction?: string }) => void;
    updateClient: (id: string, updates: Partial<Client>) => void;
    deleteClient: (id: string) => void;
    addLead: (lead: Omit<SaleLead, "id">) => void;
    updateLead: (id: string, updates: Partial<SaleLead>) => void;
    deleteLead: (id: string) => void;
    addProject: (project: Omit<Project, "id">) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    convertToClient: (id: string) => void;
    qualifyInteraction: (data: {
        prospectId: string;
        channel: InteractionChannel;
        motifId: string;
        comment: string;
        recallDate?: string;
    }) => void;
    stats: {
        totalRevenue: number;
        activeProjects: number;
        clientCount: number;
        leadCount: number;
    };
    tickets: Ticket[];
    addTicket: (ticket: Omit<Ticket, "id" | "timeline" | "internalNotes" | "isArchived">) => void;
    updateTicket: (id: string, updates: Partial<Ticket>) => void;
    deleteTicket: (id: string) => void;
    simulateEscalation: () => void;
    triggerAutomatedTicket: (event: {
        type: "NC" | "Reclamation" | "Tech" | "DocRequest" | "MailBO";
        clientId: string;
        clientName: string;
        details?: string;
    }) => void;
    addMotif: (motif: Omit<Motif, "id">) => void;
    updateMotif: (id: string, updates: Partial<Motif>) => void;
    deleteMotif: (id: string) => void;
    addAgent: (agent: Omit<User, "id">) => void;
    updateAgent: (id: string, updates: Partial<User>) => void;
    deleteAgent: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [clients, setClients] = useState<Client[]>([]);
    const [leads, setLeads] = useState<SaleLead[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [motifs, setMotifs] = useState<Motif[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: "1", title: "Nouveau Signal Business", description: "Opportunité TechCorp identifiée par l'IA.", time: "il y a 2m", type: "lead", read: false },
        { id: "2", title: "Étape Atteinte", description: "Fondations terminées pour le projet Oasis.", time: "il y a 45m", type: "project", read: false },
        { id: "3", title: "Audit Système", description: "Le rapport de sécurité mensuel est prêt.", time: "il y a 2h", type: "system", read: true },
    ]);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [staff, setStaff] = useState<User[]>([]);

    useEffect(() => {
        // Hydrate auth state
        const savedUser = localStorage.getItem("nexcare_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        // Hydrate mock data
        setClients(mockClients as Client[]);
        setLeads(mockSaleLeads as SaleLead[]);
        setProjects(mockProjects as Project[]);
        setTickets(mockTickets as Ticket[]);
        setMotifs(mockMotifs as Motif[]);

        // Load agents from mock or local
        const initialStaff = [
            { id: "U1", name: "Amine El Amrani", email: "amine@nexcare.ma", role: "Admin", avatar: "A" },
            { id: "U2", name: "Sarah Benkirane", email: "sarah@nexcare.ma", role: "Supervisor", avatar: "S" },
            { id: "U3", name: "Youssef Tazi", email: "youssef@nexcare.ma", role: "MKT", avatar: "Y" },
            { id: "U4", name: "Layla Mansouri", email: "layla@nexcare.ma", role: "Sales", avatar: "L" },
            { id: "U5", name: "Kamal Daoudi", email: "kamal@nexcare.ma", role: "BO", avatar: "K" },
        ];
        setStaff(initialStaff as User[]);
    }, []);

    // Periodic SLA Check (Auto-Escalation)
    useEffect(() => {
        const interval = setInterval(() => {
            simulateEscalation();
        }, 30000); // Every 30 seconds
        return () => clearInterval(interval);
    }, [tickets]);

    const login = (email: string, role: string) => {
        const newUser: User = {
            id: `U-${Math.random().toString(36).substr(2, 5)}`.toUpperCase(),
            name: "Utilisateur Démo",
            email,
            role: role as any,
            avatar: "UD"
        };
        setUser(newUser);
        localStorage.setItem("nexcare_user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("nexcare_user");
    };

    const markNotificationAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    const updateRole = (role: string) => {
        if (user) {
            const updatedUser = { ...user, role: role as any };
            setUser(updatedUser);
            localStorage.setItem("nexcare_user", JSON.stringify(updatedUser));
        }
    };

    const addClient = (newClient: Omit<Client, "id" | "interactions" | "lastInteraction"> & { lastInteraction?: string }) => {
        const initialInteractions: Interaction[] = [];

        if (newClient.isAIQualified) {
            initialInteractions.push({
                id: Math.random().toString(36).substr(2, 9),
                date: new Date().toISOString(),
                channel: "Email", // Simulation bot
                motifId: "m1", // Nouveau Prospect
                comment: "Qualification automatique effectuée par NexAI. Lead validé avec score élevé.",
                agentName: "NexAI Assistant"
            });
        }

        const client: Client = {
            ...newClient,
            id: Math.random().toString(36).substr(2, 9),
            interactions: initialInteractions,
            isNC: newClient.isNC || false,
            isAIQualified: newClient.isAIQualified || false,
            lastInteraction: newClient.lastInteraction || new Date().toISOString()
        } as Client;
        setClients((prev) => [client, ...prev]);
        setNotifications(prev => [{
            id: Math.random().toString(36).substr(2, 9),
            title: "Prospect Créé",
            description: `${newClient.name} a été ajouté à la base.`,
            time: "À l'instant",
            type: "system",
            read: false
        }, ...prev]);
    };

    const updateClient = (id: string, updates: Partial<Client>) => {
        setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    };

    const convertToClient = (id: string) => {
        const prospect = clients.find(c => c.id === id);
        if (!prospect) return;

        const conversionInteraction: Interaction = {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString(),
            channel: "Terrain",
            motifId: "m3", // Rendez-vous fixé / Signé
            comment: "Dossier converti en client officiellement. 🎉",
            agentName: user?.name || "Système"
        };

        updateClient(id, {
            type: "Client",
            status: "Signé",
            lastInteraction: conversionInteraction.date,
            interactions: [conversionInteraction, ...prospect.interactions]
        });

        setNotifications(prev => [{
            id: Math.random().toString(36).substr(2, 9),
            title: "Transformation Client 🎉",
            description: `${prospect.name} est désormais un client officiel de NexCare !`,
            time: "À l'instant",
            type: "system",
            read: false
        }, ...prev]);
    };

    const deleteClient = (id: string) => {
        setClients((prev) => prev.filter((c) => c.id !== id));
    };

    const addLead = (newLead: Omit<SaleLead, "id">) => {
        const lead = { ...newLead, id: Math.random().toString(36).substr(2, 9) } as SaleLead;
        setLeads((prev) => [lead, ...prev]);
        setNotifications(prev => [{
            id: Math.random().toString(36).substr(2, 9),
            title: "Opportunité Capturée",
            description: `Un nouveau deal pour ${newLead.title} a été ajouté.`,
            time: "À l'instant",
            type: "lead",
            read: false
        }, ...prev]);
    };

    const updateLead = (id: string, updates: Partial<SaleLead>) => {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
    };

    const deleteLead = (id: string) => {
        setLeads((prev) => prev.filter((l) => l.id !== id));
    };

    const addProject = (newProject: Omit<Project, "id">) => {
        const project = { ...newProject, id: Math.random().toString(36).substr(2, 9) } as Project;
        setProjects((prev) => [project, ...prev]);
    };

    const updateProject = (id: string, updates: Partial<Project>) => {
        setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    };

    const deleteProject = (id: string) => {
        setProjects((prev) => prev.filter((p) => p.id !== id));
    };

    const qualifyInteraction = (data: {
        prospectId: string;
        channel: InteractionChannel;
        motifId: string;
        comment: string;
        recallDate?: string;
    }) => {
        const prospect = clients.find(c => c.id === data.prospectId);
        const motif = motifs.find(m => m.id === data.motifId);

        if (!prospect || !motif) return;

        const newInteraction: Interaction = {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString(),
            channel: data.channel,
            motifId: data.motifId,
            comment: data.comment,
            agentName: user?.name || "Agent"
        };

        const updatedProspect: Client = {
            ...prospect,
            status: motif.defaultStatus,
            isNC: motif.markNC ? true : prospect.isNC,
            nextRecall: motif.recallRequired ? data.recallDate : undefined,
            lastInteraction: newInteraction.date,
            interactions: [newInteraction, ...prospect.interactions]
        };

        updateClient(data.prospectId, updatedProspect);

        // Automated Ticket Creation
        if (motif.ticketRequired) {
            triggerAutomatedTicket({
                type: motif.markNC ? "NC" : "Tech",
                clientId: prospect.id,
                clientName: prospect.name,
                details: `Ticket auto-généré via interaction : ${motif.label}. Commentaire : ${data.comment}`
            });
        }

        // Notification
        setNotifications(prev => [{
            id: Math.random().toString(36).substr(2, 9),
            title: "Qualification Terminée",
            description: `Interaction qualifiée pour ${prospect.name} (${motif.label}).`,
            time: "À l'instant",
            type: "system",
            read: false
        }, ...prev]);
    };

    const addTicket = (newTicket: Omit<Ticket, "id" | "timeline" | "internalNotes" | "isArchived">) => {
        const ticketId = `T-${Math.floor(Math.random() * 900) + 100}`;
        const ticket: Ticket = {
            ...newTicket as Ticket,
            id: ticketId,
            timeline: [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    type: "status_change",
                    content: "Nouveau ticket créé dans le système",
                    author: user?.name || "Système",
                    timestamp: new Date().toISOString(),
                    statusTo: "Open"
                }
            ],
            internalNotes: [],
            isArchived: false
        };
        setTickets((prev) => [ticket, ...prev]);
    };

    const updateTicket = (id: string, updates: Partial<Ticket>) => {
        setTickets((prev) => prev.map((t) => {
            if (t.id === id) {
                const newTimeline = [...t.timeline];
                if (updates.status && updates.status !== t.status) {
                    newTimeline.push({
                        id: Math.random().toString(36).substr(2, 9),
                        type: "status_change",
                        content: `Statut passé de ${t.status} à ${updates.status}`,
                        author: user?.name || "Système",
                        timestamp: new Date().toISOString(),
                        statusFrom: t.status,
                        statusTo: updates.status
                    });
                }
                return { ...t, ...updates, timeline: newTimeline };
            }
            return t;
        }));
    };

    const deleteTicket = (id: string) => {
        setTickets((prev) => prev.filter((t) => t.id !== id));
    };

    const simulateEscalation = () => {
        setTickets((prev) => prev.map((t) => {
            const isOverdue = new Date(t.slaDeadline) < new Date();
            const protectStatuses: TicketStatus[] = ["Closed", "Resolved", "Archived", "Escalated"];
            if (isOverdue && !protectStatuses.includes(t.status)) {
                const newTimeline: TicketTimelineEvent[] = [...t.timeline, {
                    id: Math.random().toString(36).substr(2, 9),
                    type: "escalation",
                    content: "Délai de traitement (SLA) dépassé. Ticket escaladé automatiquement.",
                    author: "Système IA",
                    timestamp: new Date().toISOString(),
                    statusFrom: t.status,
                    statusTo: "Escalated"
                }];
                return { ...t, status: "Escalated", timeline: newTimeline };
            }
            return t;
        }));
    };

    const triggerAutomatedTicket = (event: {
        type: "NC" | "Reclamation" | "Tech" | "DocRequest" | "MailBO";
        clientId: string;
        clientName: string;
        details?: string;
    }) => {
        const deadline = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        addTicket({
            clientId: event.clientId,
            clientName: event.clientName,
            subject: `Alerte Automatique: ${event.type}`,
            description: event.details || "Alerte générée par le système.",
            priority: "High",
            status: "Open",
            type: event.type === "NC" ? "NC" : "Technical",
            channel: "BO",
            department: "BO",
            assignedTo: "Gestionnaire BO",
            createdAt: new Date().toISOString(),
            slaDeadline: deadline,
            internalNotes: [],
            resolutionSummary: "",
            resolutionAction: "",
            satisfaction: undefined,
            finalComment: ""
        } as any);
    };

    const addMotif = (newMotif: Omit<Motif, "id">) => {
        const motif = { ...newMotif, id: `M-${Math.random().toString(36).substr(2, 5)}`.toUpperCase() } as Motif;
        setMotifs(prev => [...prev, motif]);
    };

    const updateMotif = (id: string, updates: Partial<Motif>) => {
        setMotifs(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    };

    const deleteMotif = (id: string) => {
        setMotifs(prev => prev.filter(m => m.id !== id));
    };

    const addAgent = (newAgent: Omit<User, "id">) => {
        const agent = { ...newAgent, id: `U-${Math.random().toString(36).substr(2, 5)}`.toUpperCase() } as User;
        setStaff(prev => [...prev, agent]);
    };

    const updateAgent = (id: string, updates: Partial<User>) => {
        setStaff(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    };

    const deleteAgent = (id: string) => {
        setStaff(prev => prev.filter(a => a.id !== id));
    };

    const stats = {
        totalRevenue: leads.reduce((acc, lead) => acc + (lead.stage === "Contrat Signé" ? lead.value : 0), 0) + 3400000,
        activeProjects: projects.filter(p => p.status === "In Progress" || p.status === "Planning").length,
        clientCount: clients.length,
        leadCount: leads.length,
    };

    return (
        <AppContext.Provider value={{
            user, login, logout, notifications, markNotificationAsRead, clearAllNotifications, updateRole,
            clients, leads, projects, motifs, staff, addClient, updateClient, deleteClient, addLead, updateLead, deleteLead, addProject, updateProject, deleteProject, convertToClient,
            qualifyInteraction, stats, tickets, addTicket, updateTicket, deleteTicket, simulateEscalation, triggerAutomatedTicket,
            addMotif, updateMotif, deleteMotif, addAgent, updateAgent, deleteAgent
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) throw new Error("useApp must be used within an AppProvider");
    return context;
}
