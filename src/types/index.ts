export type UserRole = "Admin" | "Ventes" | "Chef de projet" | "Direction" | "Légal" | "DAO" | "Sales" | "Construction" | "Project Manager" | "Legal" | "CAD" | "BO" | "Serv Tech";

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
    stage: "Nouveau" | "Qualification" | "Proposition" | "Négociation" | "Contrat Signé" | "Perdu" | "Prospect" | "Qualifié" | "Livré" | "Qualified" | "Negotiation" | "Contract Signed" | "Delivered";
    probability: number;
    expectedClose: string;
    clientId: string;
    clientName: string;
}

export interface Communication {
    id: string;
    clientId: string;
    type: "Email" | "WhatsApp" | "Lettre" | "Note Interne" | "Letter" | "Internal Note";
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
    category: "Contrat" | "Facture" | "Permis" | "Plan" | "Lettre" | "Contract" | "Invoice" | "Permit" | "Letter";
    version: string;
    uploadDate: string;
    size: string;
    type: string;
    clientId?: string;
    projectId?: string;
}

export type TicketStatus = "Open" | "Assigned" | "In Progress" | "Waiting Client" | "Escalated" | "Resolved" | "Closed" | "Archived";
export type TicketPriority = "Low" | "Medium" | "High";
export type TicketType = "Complaint" | "Technical" | "NC" | "Document" | "Payment";
export type TicketChannel = "Email" | "WhatsApp" | "Phone" | "BO";

export interface TicketTimelineEvent {
    id: string;
    type: "status_change" | "note" | "communication" | "escalation";
    content: string;
    author: string;
    timestamp: string;
    statusFrom?: TicketStatus;
    statusTo?: TicketStatus;
}

export interface Ticket {
    id: string;
    clientId: string;
    clientName: string;
    subject: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    type: TicketType;
    channel: TicketChannel;
    department: "BO" | "Serv Tech";
    assignedTo: string;
    createdAt: string;
    slaDeadline: string;
    qualification?: string;
    internalNotes: string[];
    timeline: TicketTimelineEvent[];
    resolutionSummary?: string;
    resolutionAction?: string;
    satisfaction?: boolean;
    finalComment?: string;
    isArchived: boolean;
}
