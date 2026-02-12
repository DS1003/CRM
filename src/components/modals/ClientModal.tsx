"use client";

import React from "react";
import { Dialog, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Client } from "@/types";

interface ClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Client>) => void;
    initialData?: Client;
}

export function ClientModal({ isOpen, onClose, onSubmit, initialData }: ClientModalProps) {
    const [formData, setFormData] = React.useState<Partial<Client>>({
        name: "",
        type: "Prospect",
        industry: "Manufacturing",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        ...initialData
    });

    React.useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: "",
                type: "Prospect",
                industry: "Manufacturing",
                contactPerson: "",
                email: "",
                phone: "",
                address: ""
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Edit Client" : "Add New Client"}
            description="Enter the details of the client here. Click save when you're done."
            className="max-w-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Client Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Acme Corp"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Client Type</Label>
                        <Select
                            id="type"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        >
                            <option value="Client">Client</option>
                            <option value="Prospect">Prospect</option>
                            <option value="Partner">Partner</option>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input
                            id="industry"
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            placeholder="e.g. Technology"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contact">Contact Person</Label>
                        <Input
                            id="contact"
                            value={formData.contactPerson}
                            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                            placeholder="Full Name"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="email@company.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 555-0000"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">Physical Address</Label>
                    <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Street, City, Country"
                    />
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {initialData ? "Save Changes" : "Create Client"}
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
}
