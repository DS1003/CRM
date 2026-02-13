"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { mockClients, mockSaleLeads, mockProjects, mockTickets } from "@/lib/mock-data";
import { Ticket, TicketStatus, TicketPriority, TicketType, TicketChannel, TicketTimelineEvent } from "@/types";

// Define Types
export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    industry: string;
    status: "Active" | "Inactive" | "Lead" | "Pending";
    lastInteraction: string; // ISO Date
    projectsCount: number;
    totalRevenue?: number;
    address?: string;
}

export interface SaleLead {
    id: string;
    title: string;
    clientName: string;
    value: number;
    stage: "Nouveau" | "Qualification" | "Proposition" | "Négociation" | "Contrat Signé" | "Perdu" | "Prospect" | "Qualifié" | "Livré" | "Qualified" | "Negotiation" | "Contract Signed" | "Delivered";
    probability: number;
    expectedCloseDate: string;
}

export interface Project {
    id: string;
    name: string;
    clientName: string;
    clientId?: string;
    status: "Planning" | "In Progress" | "Delayed" | "Completed" | "On Hold";
    progress: number;
    startDate: string;
    endDate: string;
    budget: number;
    spent?: number;
    manager: string;
    description?: string;
}

export interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    type: "lead" | "project" | "system";
    read: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
}

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
    addClient: (client: Omit<Client, "id">) => void;
    updateClient: (id: string, updates: Partial<Client>) => void;
    deleteClient: (id: string) => void;
    addLead: (lead: Omit<SaleLead, "id">) => void;
    addProject: (project: Omit<Project, "id">) => void;
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [clients, setClients] = useState<Client[]>([]);
    const [leads, setLeads] = useState<SaleLead[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: "1", title: "Nouveau Signal Business", description: "Opportunité TechCorp identifiée par l'IA.", time: "il y a 2m", type: "lead", read: false },
        { id: "2", title: "Étape Atteinte", description: "Fondations terminées pour le projet Oasis.", time: "il y a 45m", type: "project", read: false },
        { id: "3", title: "Audit Système", description: "Le rapport de sécurité mensuel est prêt.", time: "il y a 2h", type: "system", read: true },
    ]);
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        // Hydrate auth state
        const savedUser = localStorage.getItem("nexcare_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        // Hydrate mock data
        setClients(mockClients as any[]);
        setLeads(mockSaleLeads as any[]);
        setProjects(mockProjects as any[]);
        setTickets(mockTickets as any[]);
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
            id: "AFK1",
            name: "Astou Fall Kane",
            email,
            role: role.charAt(0).toUpperCase() + role.slice(1),
            avatar: "AF"
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
            const updatedUser = { ...user, role };
            setUser(updatedUser);
            localStorage.setItem("nexcare_user", JSON.stringify(updatedUser));
        }
    };

    const addClient = (newClient: Omit<Client, "id">) => {
        const client = { ...newClient, id: Math.random().toString(36).substr(2, 9) };
        setClients((prev) => [client, ...prev]);
        // Trigger notification
        setNotifications(prev => [{
            id: Math.random().toString(36).substr(2, 9),
            title: "Client Ajouté",
            description: `${newClient.name} a été intégré à l'écosystème.`,
            time: "À l'instant",
            type: "system",
            read: false
        }, ...prev]);
    };

    const updateClient = (id: string, updates: Partial<Client>) => {
        setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    };

    const deleteClient = (id: string) => {
        setClients((prev) => prev.filter((c) => c.id !== id));
    };

    const addLead = (newLead: Omit<SaleLead, "id">) => {
        const lead = { ...newLead, id: Math.random().toString(36).substr(2, 9) };
        setLeads((prev) => [lead, ...prev]);
        // Trigger notification
        setNotifications(prev => [{
            id: Math.random().toString(36).substr(2, 9),
            title: "Opportunité Capturée",
            description: `Un nouveau deal pour ${newLead.title} a été ajouté.`,
            time: "À l'instant",
            type: "lead",
            read: false
        }, ...prev]);
    };

    const addProject = (newProject: Omit<Project, "id">) => {
        const project = { ...newProject, id: Math.random().toString(36).substr(2, 9) };
        setProjects((prev) => [project, ...prev]);
        // Trigger notification
        setNotifications(prev => [{
            id: Math.random().toString(36).substr(2, 9),
            title: "Chantier Initié",
            description: `Le projet ${newProject.name} est en phase de planification.`,
            time: "À l'instant",
            type: "project",
            read: false
        }, ...prev]);
    };

    const addTicket = (newTicket: Omit<Ticket, "id" | "timeline" | "internalNotes" | "isArchived">) => {
        const ticketId = `T-${Math.floor(Math.random() * 900) + 100}`;
        const ticket: Ticket = {
            ...newTicket,
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
        setNotifications(prev => [{
            id: Math.random().toString(36).substr(2, 9),
            title: "Nouveau Ticket Créé",
            description: `Un ticket pour ${newTicket.clientName} a été ouvert (${newTicket.department}).`,
            time: "À l'instant",
            type: "system",
            read: false
        }, ...prev]);
    };

    const updateTicket = (id: string, updates: Partial<Ticket>) => {
        setTickets((prev) => prev.map((t) => {
            if (t.id === id) {
                const newTimeline = [...t.timeline];

                // Track status changes in timeline
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

                // Track internal notes in timeline
                if (updates.internalNotes && updates.internalNotes.length > (t.internalNotes?.length || 0)) {
                    const newNote = updates.internalNotes[updates.internalNotes.length - 1];
                    newTimeline.push({
                        id: Math.random().toString(36).substr(2, 9),
                        type: "note",
                        content: newNote,
                        author: user?.name || "Conseiller",
                        timestamp: new Date().toISOString()
                    });
                }

                return { ...t, ...updates, timeline: newTimeline };
            }
            return t;
        }));
    };

    const deleteTicket = (id: string) => {
        setTickets((prev) => prev.filter((t) => t.id !== id));
        setNotifications(prev => [{
            id: Math.random().toString(36).substr(2, 9),
            title: "Ticket Supprimé",
            description: `Le ticket ${id} a été retiré du système.`,
            time: "À l'instant",
            type: "system",
            read: false
        }, ...prev]);
    };

    const simulateEscalation = () => {
        setTickets((prev) => prev.map((t) => {
            const isOverdue = new Date(t.slaDeadline) < new Date();
            const protectStatuses: TicketStatus[] = ["Closed", "Resolved", "Archived", "Escalated"];
            if (isOverdue && !protectStatuses.includes(t.status)) {
                // Add escalation to timeline
                const newTimeline: TicketTimelineEvent[] = [...t.timeline, {
                    id: Math.random().toString(36).substr(2, 9),
                    type: "escalation",
                    content: "Délai de traitement (SLA) dépassé. Ticket escaladé automatiquement.",
                    author: "Système IA",
                    timestamp: new Date().toISOString(),
                    statusFrom: t.status,
                    statusTo: "Escalated"
                }];
                return { ...t, status: "Escalated" as TicketStatus, timeline: newTimeline };
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
        const priorityMap: Record<string, TicketPriority> = {
            NC: "High",
            Reclamation: "High",
            Tech: "Medium",
            DocRequest: "Low",
            MailBO: "Low",
        };

        const typeMap: Record<string, TicketType> = {
            NC: "NC",
            Reclamation: "Complaint",
            Tech: "Technical",
            DocRequest: "Document",
            MailBO: "Technical",
        };

        const channelMap: Record<string, TicketChannel> = {
            NC: "BO",
            Reclamation: "Email",
            Tech: "Phone",
            DocRequest: "BO",
            MailBO: "BO",
        };

        const deptMap: Record<string, "BO" | "Serv Tech"> = {
            NC: "BO",
            Reclamation: "BO",
            Tech: "Serv Tech",
            DocRequest: "BO",
            MailBO: "BO",
        };

        const subjectMap = {
            NC: "Alerte Non-Conformité détectée",
            Reclamation: "Réclamation Client à traiter",
            Tech: "Incident Technique signalé",
            DocRequest: "Demande de documentation projet",
            MailBO: "Courrier BO entrant à qualifier",
        };

        const deadlineOffset = event.type === "NC" || event.type === "Reclamation" ? 24 : 72; // hours
        const deadline = new Date(Date.now() + deadlineOffset * 60 * 60 * 1000).toISOString();

        addTicket({
            clientId: event.clientId,
            clientName: event.clientName,
            subject: subjectMap[event.type],
            description: event.details || "Alerte générée automatiquement par le système NexAI.",
            priority: priorityMap[event.type],
            status: "Open",
            type: typeMap[event.type],
            channel: channelMap[event.type],
            department: deptMap[event.type],
            assignedTo: deptMap[event.type] === "BO" ? "Gestionnaire BO" : "Support Technique",
            createdAt: new Date().toISOString(),
            slaDeadline: deadline,
            qualification: event.type,
            resolutionSummary: "",
            resolutionAction: "",
            satisfaction: undefined,
            finalComment: ""
        });
    };

    // Derived Stats
    const stats = {
        totalRevenue: leads.reduce((acc, lead) => acc + (lead.stage === "Contrat Signé" ? lead.value : 0), 0) + 3400000,
        activeProjects: projects.filter(p => p.status === "In Progress" || p.status === "Planning").length,
        clientCount: clients.length,
        leadCount: leads.length,
    };

    return (
        <AppContext.Provider value={{
            user,
            login,
            logout,
            notifications,
            markNotificationAsRead,
            clearAllNotifications,
            updateRole,
            clients,
            leads,
            projects,
            addClient,
            updateClient,
            deleteClient,
            addLead,
            addProject,
            stats,
            tickets,
            addTicket,
            updateTicket,
            deleteTicket,
            simulateEscalation,
            triggerAutomatedTicket
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
