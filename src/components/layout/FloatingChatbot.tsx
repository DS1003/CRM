"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    X,
    Send,
    Bot,
    Sparkles,
    Zap,
    ChevronDown,
    Minus,
    Maximize2,
    User,
    Calendar,
    AlertCircle,
    Building,
    Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

interface Message {
    id: string;
    text: string | React.ReactNode;
    sender: "user" | "bot";
    timestamp: Date;
    isAction?: boolean;
}

type FlowState = "IDLE" | "PROSPECT_NAME" | "PROSPECT_INDUSTRY" | "PROSPECT_BUDGET" | "TICKET_DESC" | "RDV_CLIENT" | "RDV_DATE";

export function FloatingChatbot() {
    const { addClient, triggerAutomatedTicket, clients, updateClient } = useApp();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Bonjour ! Je suis NexAI, votre agent digital connecté. Comment puis-je optimiser votre performance aujourd'hui ?",
            sender: "bot",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [flow, setFlow] = useState<FlowState>("IDLE");
    const [formData, setFormData] = useState<any>({});
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const addBotMessage = (text: string | React.ReactNode) => {
        const botMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: "bot",
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
    };

    const addUserMessage = (text: string) => {
        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: "user",
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
    };

    const handleFlow = (userInput: string) => {
        switch (flow) {
            case "PROSPECT_NAME":
                setFormData({ ...formData, name: userInput });
                setFlow("PROSPECT_INDUSTRY");
                setIsTyping(true);
                setTimeout(() => {
                    addBotMessage("Très bien. Quel est le secteur d'activité (Industrie, Tech, Construction...) ?");
                    setIsTyping(false);
                }, 800);
                break;
            case "PROSPECT_INDUSTRY":
                setFormData({ ...formData, industry: userInput });
                setFlow("PROSPECT_BUDGET");
                setIsTyping(true);
                setTimeout(() => {
                    addBotMessage("Quel est le budget estimé pour ce projet (en MAD) ?");
                    setIsTyping(false);
                }, 800);
                break;
            case "PROSPECT_BUDGET":
                const budget = userInput;
                setIsTyping(true);
                setTimeout(() => {
                    // Logic to create Prospect in CRM
                    addClient({
                        name: formData.name,
                        industry: formData.industry,
                        type: "Prospect",
                        status: "En attente",
                        contactPerson: "Contact Bot",
                        email: "prospect@lead.ai",
                        phone: "00000000",
                        address: "Capture Automatique Chatbot",
                        projectsCount: 0,
                        isNC: false,
                        isAIQualified: true
                    });

                    addBotMessage(
                        <div className="space-y-3">
                            <p className="text-emerald-500 font-bold uppercase text-[10px]">✓ Qualification Terminée</p>
                            <p>Le prospect <strong>{formData.name}</strong> a été créé avec succès dans le pipeline.</p>
                            <p className="text-[10px] text-slate-400">Score de Lead estimé : <span className="text-primary font-black">HIGH (85%)</span></p>
                        </div>
                    );
                    setFlow("IDLE");
                    setIsTyping(false);
                    setFormData({});
                }, 1500);
                break;
            case "TICKET_DESC":
                setIsTyping(true);
                setTimeout(() => {
                    // Select a random client for demo if none specified
                    const targetClient = clients[0];
                    triggerAutomatedTicket({
                        type: "Reclamation",
                        clientId: targetClient.id,
                        clientName: targetClient.name,
                        details: `Signalement Chatbot: ${userInput}`
                    });
                    addBotMessage(
                        <div className="space-y-3">
                            <p className="text-rose-500 font-bold uppercase text-[10px]">⚠ Ticket SAV Créé</p>
                            <p>Un ticket de priorité <strong>HAUTE</strong> a été ouvert pour {targetClient.name}.</p>
                            <p className="text-[10px] text-slate-400">Service affecté : <span className="text-slate-900 font-black">BACK OFFICE</span></p>
                        </div>
                    );
                    setFlow("IDLE");
                    setIsTyping(false);
                }, 1000);
                break;
            case "RDV_CLIENT":
                const selectedClient = clients.find(c => c.name.toLowerCase().includes(userInput.toLowerCase()));
                if (selectedClient) {
                    setFormData({ ...formData, clientId: selectedClient.id, clientName: selectedClient.name });
                    setFlow("RDV_DATE");
                    setIsTyping(true);
                    setTimeout(() => {
                        addBotMessage(`Quand souhaitez-vous planifier le rappel pour ${selectedClient.name} ? (Format: AAAA-MM-JJ)`);
                        setIsTyping(false);
                    }, 800);
                } else {
                    addBotMessage("Client non trouvé. Veuillez préciser le nom exact du compte.");
                }
                break;
            case "RDV_DATE":
                updateClient(formData.clientId, { nextRecall: userInput, status: "Rappel" });
                setIsTyping(true);
                setTimeout(() => {
                    addBotMessage(
                        <div className="space-y-3">
                            <p className="text-blue-500 font-bold uppercase text-[10px]">📅 Rappel Planifié</p>
                            <p>RDV confirmé pour <strong>{formData.clientName}</strong> le {userInput}.</p>
                            <p className="text-[10px] text-slate-400 tracking-widest uppercase">Synchronisation calendrier OK</p>
                        </div>
                    );
                    setFlow("IDLE");
                    setIsTyping(false);
                    setFormData({});
                }, 1200);
                break;
            default:
                processGeneralQuery(userInput);
        }
    };

    const processGeneralQuery = (query: string) => {
        const q = query.toLowerCase();
        setIsTyping(true);
        setTimeout(() => {
            if (q.includes("prospect")) {
                addBotMessage("Vos prospects sont dans 'Base de Prospection'. Je peux en qualifier un nouveau pour vous si vous voulez.");
            } else if (q.includes("chantier") || q.includes("projet")) {
                addBotMessage("Le pilotage technique se fait via le 'Hub Construction'.");
            } else {
                addBotMessage("Je suis NexAI. Je peux créer des prospects, ouvrir des tickets SAV ou planifier des rappels. Que souhaitez-vous faire ?");
            }
            setIsTyping(false);
        }, 1000);
    }

    const startProspectFlow = () => {
        setFlow("PROSPECT_NAME");
        addBotMessage("D'accord. Qualifions ce nouveau contact. Quel est le nom de l'entreprise ou du prospect ?");
    };

    const startTicketFlow = () => {
        setFlow("TICKET_DESC");
        addBotMessage("Veuillez décrire l'anomalie ou la réclamation. Je vais créer un ticket et l'affecter au service compétent.");
    };

    const startRDVFlow = () => {
        setFlow("RDV_CLIENT");
        addBotMessage("Pour quel compte souhaitez-vous planifier un rappel ?");
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const userInput = input;
        addUserMessage(userInput);
        setInput("");
        handleFlow(userInput);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-[420px] h-[650px] bg-white rounded-[2.8rem] shadow-2xl shadow-slate-900/40 border border-slate-100 flex flex-col overflow-hidden ring-1 ring-black/5"
                    >
                        {/* Header */}
                        <div className="bg-slate-900/95 backdrop-blur-xl p-6 text-white flex items-center justify-between relative overflow-hidden border-b border-white/5">
                            <div className="absolute -top-10 -right-10 p-20 opacity-[0.03] rotate-12 bg-white rounded-full blur-3xl" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-primary/20 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-inner">
                                    <Bot size={24} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
                                        NexAI Assistant
                                        <Sparkles size={14} className="text-primary/60" />
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Opérationnel</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 relative z-10">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-slate-50/30 custom-scrollbar"
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-3",
                                        msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto w-full"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-[10px] font-black shadow-sm",
                                        msg.sender === "user" ? "bg-white text-slate-400 border border-slate-100" : "bg-slate-900 text-white"
                                    )}>
                                        {msg.sender === "user" ? <User size={14} /> : <Zap size={14} />}
                                    </div>
                                    <div className={cn(
                                        "p-4 rounded-[1.4rem] text-[13px] font-medium leading-relaxed shadow-sm",
                                        msg.sender === "user"
                                            ? "bg-slate-900 text-white rounded-tr-none"
                                            : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                                    )}>
                                        {msg.text}
                                        <div className={cn(
                                            "text-[8px] mt-2 font-bold opacity-30 uppercase tracking-widest text-right",
                                            msg.sender === "user" ? "text-white" : "text-slate-400"
                                        )}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                                        <Bot size={14} />
                                    </div>
                                    <div className="p-4 rounded-[1.4rem] rounded-tl-none bg-white border border-slate-100 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}

                            {/* Quick Action Suggestions (Only when IDLE) */}
                            {flow === "IDLE" && (
                                <div className="grid grid-cols-1 gap-2 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-2 mb-1">Actions Rapides</p>
                                    <button
                                        onClick={startProspectFlow}
                                        className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl hover:border-primary/20 hover:bg-slate-50 transition-all text-left shadow-sm group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-lg bg-primary/5 text-primary flex items-center justify-center transition-all">
                                                <Target size={14} />
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-600">Nouveau Prospect</span>
                                        </div>
                                        <ChevronDown size={14} className="text-slate-300 -rotate-90" />
                                    </button>
                                    <button
                                        onClick={startTicketFlow}
                                        className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all text-left shadow-sm group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center transition-all">
                                                <AlertCircle size={14} />
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-600">Ouvrir un Ticket SAV</span>
                                        </div>
                                        <ChevronDown size={14} className="text-slate-300 -rotate-90" />
                                    </button>
                                    <button
                                        onClick={startRDVFlow}
                                        className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all text-left shadow-sm group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center transition-all">
                                                <Calendar size={14} />
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-600">Planifier Rappel</span>
                                        </div>
                                        <ChevronDown size={14} className="text-slate-300 -rotate-90" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-slate-100">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder={flow === "IDLE" ? "Écrivez ici..." : "En attente de réponse..."}
                                    className="w-full h-12 pl-5 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-700 focus:border-slate-400 transition-all outline-none placeholder:text-slate-400"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-1.5 top-1.5 w-9 h-9 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-primary transition-all active:scale-95"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 relative ring-1 ring-black/5",
                    isOpen
                        ? "bg-white text-slate-600"
                        : "bg-slate-900 text-white"
                )}
            >
                {isOpen ? <X size={24} /> : <Bot size={28} />}

                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-primary border-2 border-white flex items-center justify-center text-[10px] font-black">
                            !
                        </span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
