"use client";

import React from "react";
import { Dialog, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Project, Client } from "@/types";
import { mockClients, mockUsers } from "@/lib/mock-data";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Project>) => void;
    initialData?: Project;
}

export function ProjectModal({ isOpen, onClose, onSubmit, initialData }: ProjectModalProps) {
    const [formData, setFormData] = React.useState<Partial<Project>>({
        name: "",
        clientId: mockClients[0].id,
        status: "Planning",
        progress: 0,
        budget: 0,
        spent: 0,
        manager: mockUsers.find(u => u.role === "Project Manager")?.name || "",
        description: "",
        startDate: "",
        endDate: "",
        ...initialData
    });

    React.useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: "",
                clientId: mockClients[0].id,
                status: "Planning",
                progress: 0,
                budget: 0,
                spent: 0,
                manager: mockUsers.find(u => u.role === "Project Manager")?.name || "",
                description: "",
                startDate: "",
                endDate: ""
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedClient = mockClients.find(c => c.id === formData.clientId);
        onSubmit({
            ...formData,
            clientName: selectedClient?.name || ""
        });
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Edit Project" : "Initiate New Project"}
            description="Set up technical operations and milestones for this site."
            className="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. City Center Mall - Phase 1"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="client">Assigned Client</Label>
                        <Select
                            id="client"
                            value={formData.clientId}
                            onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                        >
                            {mockClients.map(client => (
                                <option key={client.id} value={client.id}>
                                    {client.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="manager">Project Manager</Label>
                        <Select
                            id="manager"
                            value={formData.manager}
                            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                        >
                            {mockUsers.filter(u => u.role === "Project Manager" || u.role === "Admin").map(user => (
                                <option key={user.id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="status">Current Status</Label>
                        <Select
                            id="status"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        >
                            <option value="Planning">Planning</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="progress">Progress (%)</Label>
                        <Input
                            id="progress"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.progress}
                            onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="budget">Total Budget ($)</Label>
                        <Input
                            id="budget"
                            type="number"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="spent">Spent to Date ($)</Label>
                        <Input
                            id="spent"
                            type="number"
                            value={formData.spent}
                            onChange={(e) => setFormData({ ...formData, spent: Number(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="endDate">Estimated Completion</Label>
                        <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Detailed scope of work and technical requirements..."
                        rows={3}
                    />
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {initialData ? "Save Changes" : "Initiate Project"}
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
}
