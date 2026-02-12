"use client";

import React from "react";
import { Dialog, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { SaleLead, Client } from "@/types";
import { mockClients } from "@/lib/mock-data";

interface DealModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<SaleLead>) => void;
    initialData?: SaleLead;
}

export function DealModal({ isOpen, onClose, onSubmit, initialData }: DealModalProps) {
    const [formData, setFormData] = React.useState<Partial<SaleLead>>({
        title: "",
        value: 0,
        stage: "Prospect",
        probability: 10,
        expectedClose: "",
        clientId: mockClients[0].id,
        ...initialData
    });

    React.useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: "",
                value: 0,
                stage: "Prospect",
                probability: 10,
                expectedClose: "",
                clientId: mockClients[0].id
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
            title={initialData ? "Edit Deal" : "New Sales Deal"}
            description="Track your pipeline potential. Assign values and probabilities."
            className="max-w-xl"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Deal Title</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Enterprise License"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="client">Client</Label>
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
                        <Label htmlFor="value">Deal Value ($)</Label>
                        <Input
                            id="value"
                            type="number"
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="stage">Pipeline Stage</Label>
                        <Select
                            id="stage"
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                        >
                            <option value="Prospect">Prospect</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Proposal">Proposal</option>
                            <option value="Won">Won</option>
                            <option value="Lost">Lost</option>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="probability">Probability (%)</Label>
                        <Input
                            id="probability"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.probability}
                            onChange={(e) => setFormData({ ...formData, probability: Number(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="expectedClose">Expected Close Date</Label>
                    <Input
                        id="expectedClose"
                        type="date"
                        value={formData.expectedClose}
                        onChange={(e) => setFormData({ ...formData, expectedClose: e.target.value })}
                    />
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {initialData ? "Update Deal" : "Create Deal"}
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
}
