import { Client, Project, SaleLead, Communication, Document, User, Ticket } from "@/types";

export const mockUsers: User[] = [
    { id: "1", name: "Alex Rivera", email: "alex@company.com", role: "Admin", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: "2", name: "Sarah Chen", email: "sarah@company.com", role: "Ventes", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: "3", name: "Marco Rossi", email: "marco@company.com", role: "Chef de projet", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: "4", name: "Elena Schmidt", email: "elena@company.com", role: "Direction", avatar: "https://i.pravatar.cc/150?u=4" },
];

export const mockClients: Client[] = [
    {
        id: "c1",
        name: "Acme Corp",
        type: "Client",
        industry: "Industrie",
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
        industry: "Technologie",
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
        name: "Centre Commercial Bridgeport",
        clientId: "c3",
        clientName: "Skyline Construction",
        status: "In Progress",
        progress: 65,
        startDate: "2023-06-01",
        endDate: "2024-08-15",
        budget: 2500000,
        spent: 1625000,
        manager: "Marco Rossi",
        description: "Complexe commercial multi-niveaux avec espaces de vente et bureaux.",
    },
    {
        id: "p2",
        name: "Villa Résidentielle Oakwood",
        clientId: "c3",
        clientName: "Skyline Construction",
        status: "Delayed",
        progress: 40,
        startDate: "2023-09-10",
        endDate: "2024-05-20",
        budget: 850000,
        spent: 420000,
        manager: "Marco Rossi",
        description: "Villa résidentielle de luxe écologique dans le quartier d'Oakwood.",
    },
    {
        id: "p3",
        name: "Infrastructure Tech Hub",
        clientId: "c2",
        clientName: "Global Tech Solutions",
        status: "Planning",
        progress: 5,
        startDate: "2024-03-01",
        endDate: "2025-01-15",
        budget: 1200000,
        spent: 0,
        manager: "Sarah Chen",
        description: "Mise à niveau de la salle des serveurs et de l'infrastructure réseau.",
    },
];

export const mockSaleLeads: SaleLead[] = [
    { id: "l1", title: "Migration Cloud", value: 150000, stage: "Négociation", probability: 75, expectedClose: "2024-03-15", clientId: "c2", clientName: "Global Tech Solutions" },
    { id: "l2", title: "Audit de Sécurité", value: 45000, stage: "Qualification", probability: 50, expectedClose: "2024-04-01", clientId: "c1", clientName: "Acme Corp" },
    { id: "l3", title: "Implémentation Nouveau CRM", value: 85000, stage: "Nouveau", probability: 20, expectedClose: "2024-05-10", clientId: "c2", clientName: "Global Tech Solutions" },
];

export const mockCommunications: Communication[] = [
    { id: "m1", clientId: "c1", type: "Email", sender: "John Doe", recipient: "Sarah Chen", subject: "Révision de contrat", content: "Bonjour Sarah, nous avons examiné la dernière version du contrat...", timestamp: "2024-02-08T09:00:00Z", status: "Received" },
    { id: "m2", clientId: "c2", type: "WhatsApp", sender: "Jane Smith", recipient: "Sarah Chen", content: "Pouvons-nous nous appeler rapidement cet après-midi ?", timestamp: "2024-02-09T11:20:00Z", status: "Received" },
    { id: "m3", clientId: "c1", type: "Note Interne", sender: "Sarah Chen", recipient: "Équipe", content: "Suivi avec Acme concernant la visite du site prévue la semaine prochaine.", timestamp: "2024-02-07T16:45:00Z", status: "Sent" },
];

export const mockDocuments: Document[] = [
    { id: "d1", name: "Contrat_V2_Final.pdf", category: "Contrat", version: "2.0", uploadDate: "2024-01-20", size: "1.2 MB", type: "PDF", clientId: "c1" },
    { id: "d2", name: "Plan_Site_Bridgeport.dwg", category: "Plan", version: "1.5", uploadDate: "2024-01-25", size: "15.4 MB", type: "CAD", projectId: "p1" },
    { id: "d3", name: "Facture_JANV_2024.pdf", category: "Facture", version: "1.0", uploadDate: "2024-02-01", size: "450 KB", type: "PDF", clientId: "c1" },
];

export const mockTickets: Ticket[] = [
    {
        id: "T-101",
        clientId: "c1",
        clientName: "Acme Corp",
        subject: "Erreur de facturation - Janvier",
        description: "Le client signale une double facturation sur le service de maintenance de janvier.",
        priority: "High",
        status: "Open",
        type: "Payment",
        channel: "Email",
        department: "BO",
        assignedTo: "Gestionnaire BO",
        createdAt: "2024-02-10T08:00:00Z",
        slaDeadline: "2024-02-11T08:00:00Z",
        qualification: "Facturation",
        internalNotes: ["Appel reçu ce matin", "Vérification en cours avec la comptabilité"],
        timeline: [
            { id: "e1", type: "status_change", content: "Ticket ouvert", author: "Système", timestamp: "2024-02-10T08:00:00Z", statusTo: "Open" },
            { id: "e2", type: "note", content: "Dossier transmis au service financier", author: "Alex Rivera", timestamp: "2024-02-10T09:30:00Z" }
        ],
        isArchived: false
    },
    {
        id: "T-102",
        clientId: "c2",
        clientName: "Global Tech Solutions",
        subject: "Problème accès serveur VPN",
        description: "L'équipe technique du client ne parvient pas à se connecter au serveur de fichiers via VPN.",
        priority: "Medium",
        status: "In Progress",
        type: "Technical",
        channel: "Phone",
        department: "Serv Tech",
        assignedTo: "Support Technique",
        createdAt: "2024-02-11T10:00:00Z",
        slaDeadline: "2024-02-13T10:00:00Z",
        qualification: "Accès Technique",
        internalNotes: ["Le pare-feu semble bloquer les ports", "Diagnostic en cours avec Sarah"],
        timeline: [
            { id: "e3", type: "status_change", content: "Ticket ouvert", author: "Système", timestamp: "2024-02-11T10:00:00Z", statusTo: "Open" },
            { id: "e4", type: "status_change", content: "Passage en cours de traitement", author: "Marco Rossi", timestamp: "2024-02-11T11:00:00Z", statusFrom: "Open", statusTo: "In Progress" }
        ],
        isArchived: false
    },
    {
        id: "T-103",
        clientId: "c1",
        clientName: "Acme Corp",
        subject: "Panne structurelle signalée - Secteur Nord",
        description: "Fissure importante détectée sur le pilier B-14 lors de l'inspection hebdomadaire.",
        priority: "High",
        status: "Escalated",
        type: "NC",
        channel: "BO",
        department: "Serv Tech",
        assignedTo: "Expert Structure",
        createdAt: "2024-02-09T14:00:00Z",
        slaDeadline: "2024-02-10T14:00:00Z",
        qualification: "Urgence Technique",
        internalNotes: ["Périmètre de sécurité mis en place", "Expertise technique requise"],
        timeline: [
            { id: "e5", type: "status_change", content: "Ticket ouvert", author: "Système", timestamp: "2024-02-09T14:00:00Z", statusTo: "Open" },
            { id: "e6", type: "escalation", content: "Délai SLA dépassé - Critique", author: "Système IA", timestamp: "2024-02-10T14:00:00Z", statusFrom: "In Progress", statusTo: "Escalated" }
        ],
        isArchived: false
    }
];
