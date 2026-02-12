"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { mockClients, mockSaleLeads, mockProjects } from "@/lib/mock-data";

// Define Types (Should arguably be in types/index.ts, but keeping here for speed)
export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    industry: string;
    status: "Active" | "Inactive" | "Lead";
    lastInteraction: string; // ISO Date
    projectsCount: number;
    totalRevenue: number;
    address?: string;
}

export interface SaleLead {
    id: string;
    title: string;
    clientName: string;
    value: number;
    stage: "New" | "Qualification" | "Proposal" | "Negotiation" | "Contract Signed" | "Lost";
    probability: number;
    expectedCloseDate: string;
}

export interface Project {
    id: string;
    name: string;
    clientName: string;
    status: "Planning" | "In Progress" | "Delayed" | "Completed" | "On Hold";
    progress: number;
    startDate: string;
    endDate: string;
    budget: number;
    manager: string;
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [clients, setClients] = useState<Client[]>([]);
    const [leads, setLeads] = useState<SaleLead[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: "1", title: "New Deal Signal", description: "TechCorp potential identified by AI.", time: "2m ago", type: "lead", read: false },
        { id: "2", title: "Milestone Reached", description: "Foundation work completed for Oasis.", time: "45m ago", type: "project", read: false },
        { id: "3", title: "System Audit", description: "Monthly security report is ready.", time: "2h ago", type: "system", read: true },
    ]);

    useEffect(() => {
        // Hydrate auth state
        const savedUser = localStorage.getItem("modernys_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        // Hydrate mock data
        setClients(mockClients as any[]);
        setLeads(mockSaleLeads as any[]);
        setProjects(mockProjects as any[]);
    }, []);

    const login = (email: string, role: string) => {
        const newUser: User = {
            id: "1",
            name: "Alex Rivera",
            email,
            role: role.charAt(0).toUpperCase() + role.slice(1),
            avatar: "AR"
        };
        setUser(newUser);
        localStorage.setItem("modernys_user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("modernys_user");
    };

    const markNotificationAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    const addClient = (newClient: Omit<Client, "id">) => {
        const client = { ...newClient, id: Math.random().toString(36).substr(2, 9) };
        setClients((prev) => [client, ...prev]);
        // Trigger notification
        setNotifications(prev => [{
            id: Math.random().toString(36).substr(2, 9),
            title: "New Client Added",
            description: `${newClient.name} has been enrolled in the ecosystem.`,
            time: "Just now",
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
            title: "Opportunity Captured",
            description: `Potential deal for ${newLead.title} added to pipeline.`,
            time: "Just now",
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
            title: "Site Initiated",
            description: `Project ${newProject.name} is now in planning phase.`,
            time: "Just now",
            type: "project",
            read: false
        }, ...prev]);
    };

    // Derived Stats
    const stats = {
        totalRevenue: leads.reduce((acc, lead) => acc + (lead.stage === "Contract Signed" ? lead.value : 0), 0) + 3400000,
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
            clients,
            leads,
            projects,
            addClient,
            updateClient,
            deleteClient,
            addLead,
            addProject,
            stats
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
