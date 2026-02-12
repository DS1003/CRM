"use client";

import React, { useState } from "react";
import { X, Target, DollarSign, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp, SaleLead } from "@/context/AppContext";

interface NewDealModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NewDealModal({ isOpen, onClose }: NewDealModalProps) {
    const { addLead, clients } = useApp();
    const [formData, setFormData] = useState({
        title: "",
        clientName: "",
        value: 0,
        stage: "New",
        probability: 10,
        expectedCloseDate: "",
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addLead({
            title: formData.title,
            clientName: formData.clientName,
            value: Number(formData.value),
            stage: "New",
            probability: 20,
            expectedCloseDate: formData.expectedCloseDate,
        });
        onClose();
        setFormData({ title: "", clientName: "", value: 0, stage: "New", probability: 10, expectedCloseDate: "" });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
                <div className="flex justify-between items-center p-6 border-b border-slate-50 bg-slate-50/50">
                    <h2 className="text-xl font-bold text-slate-800">New Deal Opportunity</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-200/50">
                        <X size={20} className="text-slate-400" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Deal Title</label>
                        <div className="relative">
                            <Target size={16} className="absolute left-3 top-3 text-slate-400" />
                            <Input
                                required
                                placeholder="E.g. Q3 Software License"
                                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Client Name</label>
                        <div className="relative">
                            <FileText size={16} className="absolute left-3 top-3 text-slate-400" />
                            <Input
                                list="clients-list"
                                required
                                placeholder="Select or type client name..."
                                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                value={formData.clientName}
                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            />
                            <datalist id="clients-list">
                                {clients.map(c => <option key={c.id} value={c.name} />)}
                            </datalist>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Value ($)</label>
                            <div className="relative">
                                <DollarSign size={16} className="absolute left-3 top-3 text-slate-400" />
                                <Input
                                    required
                                    type="number"
                                    placeholder="0.00"
                                    className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Close Date</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-3 top-3 text-slate-400" />
                                <Input
                                    type="date"
                                    className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                    value={formData.expectedCloseDate}
                                    onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="flex-1 bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                            Create Deal
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
