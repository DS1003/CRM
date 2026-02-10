export type UserRole = "Admin" | "Sales" | "Construction" | "Project Manager" | "Direction" | "Legal" | "CAD";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

export interface Client {
    id: string;
    name: string;
    type: "Prospect" | "Client";
    industry: string;
    status: "Active" | "Inactive" | "Pending";
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
    lastInteraction: string;
    projectsCount: number;
}

export interface Project {
    id: string;
    name: string;
    clientId: string;
    clientName: string;
    status: "Planning" | "In Progress" | "On Hold" | "Completed" | "Delayed";
    progress: number;
    startDate: string;
    endDate: string;
    budget: number;
    spent: number;
    manager: string;
    description: string;
}

export interface SaleLead {
    id: string;
    title: string;
    value: number;
    stage: "Prospect" | "Qualified" | "Negotiation" | "Contract Signed" | "Delivered";
    probability: number;
    expectedClose: string;
    clientId: string;
    clientName: string;
}

export interface Communication {
    id: string;
    clientId: string;
    type: "Email" | "WhatsApp" | "Letter" | "Internal Note";
    sender: string;
    recipient: string;
    subject?: string;
    content: string;
    timestamp: string;
    status: "Sent" | "Received" | "Draft";
    attachment?: string;
}

export interface Document {
    id: string;
    name: string;
    category: "Contract" | "Invoice" | "Permit" | "Plan" | "Letter";
    version: string;
    uploadDate: string;
    size: string;
    type: string;
    clientId?: string;
    projectId?: string;
}
