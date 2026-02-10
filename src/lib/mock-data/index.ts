import { Client, Project, SaleLead, Communication, Document, User } from "@/types";

export const mockUsers: User[] = [
    { id: "1", name: "Alex Rivera", email: "alex@company.com", role: "Admin", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: "2", name: "Sarah Chen", email: "sarah@company.com", role: "Sales", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: "3", name: "Marco Rossi", email: "marco@company.com", role: "Project Manager", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: "4", name: "Elena Schmidt", email: "elena@company.com", role: "Direction", avatar: "https://i.pravatar.cc/150?u=4" },
];

export const mockClients: Client[] = [
    {
        id: "c1",
        name: "Acme Corp",
        type: "Client",
        industry: "Manufacturing",
        status: "Active",
        contactPerson: "John Doe",
        email: "john@acme.com",
        phone: "+1 555-0101",
        address: "123 Industrial Way, New York, NY",
        lastInteraction: "2024-02-05T10:00:00Z",
        projectsCount: 3,
    },
    {
        id: "c2",
        name: "Global Tech Solutions",
        type: "Prospect",
        industry: "Technology",
        status: "Active",
        contactPerson: "Jane Smith",
        email: "jane@globaltech.com",
        phone: "+1 555-0102",
        address: "456 Innovation Blvd, San Francisco, CA",
        lastInteraction: "2024-02-08T14:30:00Z",
        projectsCount: 0,
    },
    {
        id: "c3",
        name: "Skyline Construction",
        type: "Client",
        industry: "Construction",
        status: "Active",
        contactPerson: "Mike Ross",
        email: "mike@skyline.com",
        phone: "+1 555-0103",
        address: "789 Builder Lane, Chicago, IL",
        lastInteraction: "2024-02-07T09:15:00Z",
        projectsCount: 5,
    },
];

export const mockProjects: Project[] = [
    {
        id: "p1",
        name: "Bridgeport Commercial Center",
        clientId: "c3",
        clientName: "Skyline Construction",
        status: "In Progress",
        progress: 65,
        startDate: "2023-06-01",
        endDate: "2024-08-15",
        budget: 2500000,
        spent: 1625000,
        manager: "Marco Rossi",
        description: "Multi-level commercial complex with retail and office spaces.",
    },
    {
        id: "p2",
        name: "Oakwood Residential Villa",
        clientId: "c3",
        clientName: "Skyline Construction",
        status: "Delayed",
        progress: 40,
        startDate: "2023-09-10",
        endDate: "2024-05-20",
        budget: 850000,
        spent: 420000,
        manager: "Marco Rossi",
        description: "Luxury eco-friendly residential villa in Oakwood district.",
    },
    {
        id: "p3",
        name: "Tech Hub Infrastructure",
        clientId: "c2",
        clientName: "Global Tech Solutions",
        status: "Planning",
        progress: 5,
        startDate: "2024-03-01",
        endDate: "2025-01-15",
        budget: 1200000,
        spent: 0,
        manager: "Sarah Chen",
        description: "Server room and networking infrastructure upgrade.",
    },
];

export const mockSaleLeads: SaleLead[] = [
    { id: "l1", title: "Cloud Migration", value: 150000, stage: "Negotiation", probability: 75, expectedClose: "2024-03-15", clientId: "c2", clientName: "Global Tech Solutions" },
    { id: "l2", title: "Security Audit", value: 45000, stage: "Qualified", probability: 50, expectedClose: "2024-04-01", clientId: "c1", clientName: "Acme Corp" },
    { id: "l3", title: "New CRM Implementation", value: 85000, stage: "Prospect", probability: 20, expectedClose: "2024-05-10", clientId: "c2", clientName: "Global Tech Solutions" },
];

export const mockCommunications: Communication[] = [
    { id: "m1", clientId: "c1", type: "Email", sender: "John Doe", recipient: "Sarah Chen", subject: "Contract Revision", content: "Hi Sarah, we've reviewed the latest draft of the contract. We have a few questions regarding section 4.2...", timestamp: "2024-02-08T09:00:00Z", status: "Received" },
    { id: "m2", clientId: "c2", type: "WhatsApp", sender: "Jane Smith", recipient: "Sarah Chen", content: "Can we hop on a quick call this afternoon?", timestamp: "2024-02-09T11:20:00Z", status: "Received" },
    { id: "m3", clientId: "c1", type: "Internal Note", sender: "Sarah Chen", recipient: "Team", content: "Follow up with Acme regarding the site visit scheduled for next week.", timestamp: "2024-02-07T16:45:00Z", status: "Sent" },
];

export const mockDocuments: Document[] = [
    { id: "d1", name: "Contract_V2_Final.pdf", category: "Contract", version: "2.0", uploadDate: "2024-01-20", size: "1.2 MB", type: "PDF", clientId: "c1" },
    { id: "d2", name: "Site_Plan_Bridgeport.dwg", category: "Plan", version: "1.5", uploadDate: "2024-01-25", size: "15.4 MB", type: "CAD", projectId: "p1" },
    { id: "d3", name: "Invoice_JAN_2024.pdf", category: "Invoice", version: "1.0", uploadDate: "2024-02-01", size: "450 KB", type: "PDF", clientId: "c1" },
];
