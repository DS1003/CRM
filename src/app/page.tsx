"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Shield,
  Zap,
  Globe,
  Users,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Lock,
  Cpu,
  ChevronRight,
  TrendingUp,
  Bot,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [splashStep, setSplashStep] = useState(0);
  const [email, setEmail] = useState("astou@nexcare.sn");
  const [password, setPassword] = useState("••••••••");
  const [selectedRole, setSelectedRole] = useState<string>("Admin");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const splashSteps = [
    { id: 1, label: "Initialisation du kernel NexCare...", icon: Cpu },
    { id: 2, label: "Vérification des protocoles de sécurité...", icon: Lock },
    { id: 3, label: "Synchronisation des flux transactionnels...", icon: Zap },
    { id: 4, label: "Optimisation de l'interface prédictive...", icon: Globe },
    { id: 5, label: "Authentification réussie. Accès autorisé.", icon: CheckCircle2 },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated Splash Sequence
    let step = 0;
    const interval = setInterval(() => {
      if (step < splashSteps.length) {
        setSplashStep(step + 1);
        step++;
      } else {
        clearInterval(interval);
        login(email, selectedRole);
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      }
    }, 800);
  };

  return (
    <div className="relative h-screen w-full flex overflow-hidden font-sans selection:bg-primary/30 selection:text-primary">
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <div className="w-full h-full flex flex-col lg:flex-row shadow-2xl overflow-hidden">

            {/* LEFT SIDE - ELABORATE VISUALS (Dark & Vibrant) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full lg:w-[45%] bg-slate-950 flex flex-col justify-center items-center p-12 overflow-hidden"
            >
              {/* Animated Background Mesh */}
              <div className="absolute inset-0 z-0">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[120px]"
                />
                <motion.div
                  animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-primary/10 rounded-full blur-[120px]"
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100" />
              </div>

              {/* Composition Content */}
              <div className="relative z-10 w-full max-w-md space-y-12">
                <div className="space-y-6">
                  <motion.img
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    src="https://modernys.immo/logo-white.png"
                    alt="NexCare"
                    className="h-14 opacity-90"
                  />
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight"
                  >
                    L'Excellence <br />
                    <span className="text-slate-300 font-light italic">Opérationnelle.</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-400 text-sm leading-relaxed max-w-sm"
                  >
                    Accédez à votre espace de pilotage unifié. Gérez vos opportunités, analysez vos flux et optimisez la performance de vos équipes en temps réel.
                  </motion.p>
                </div>

                {/* Floating Cards Visualization */}
                <div className="relative h-64 w-full perspective-1000 hidden sm:block">
                  {/* Card 1: Growth */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5, x: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: -3, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute top-0 right-4 w-48 bg-white/[0.05] backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><TrendingUp size={16} /></div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Croissance</div>
                        <div className="text-sm font-bold text-white">+24.5%</div>
                      </div>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[70%] bg-emerald-500 rounded-full" />
                    </div>
                  </motion.div>

                  {/* Card 2: Security */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5, x: 20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 6, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="absolute bottom-4 left-4 w-44 bg-white/[0.05] backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col gap-3 z-10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-lg text-primary"><Shield size={16} /></div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Sécurité</div>
                        <div className="text-sm font-bold text-white">Actif</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 3: Users */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="absolute top-[40%] left-[30%] w-40 bg-white/[0.1] backdrop-blur-2xl border border-white/20 p-3 rounded-2xl shadow-2xl flex items-center gap-3 z-20"
                  >
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border border-slate-900 flex items-center justify-center overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-white">+12 Projets</span>
                  </motion.div>

                  {/* Card 4: AI Integrated */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="absolute bottom-[20%] right-[10%] w-40 bg-white/[0.05] backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl flex items-center gap-3 z-10"
                  >
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Bot size={16} /></div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">IA Native</div>
                      <div className="text-sm font-bold text-white">Active</div>
                    </div>
                  </motion.div>

                  {/* Card 5: Chatbot */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="absolute top-[25%] left-[5%] w-44 bg-white/[0.05] backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl flex items-center gap-3 z-0"
                  >
                    <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><MessageSquare size={16} /></div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Chatbot</div>
                      <div className="text-sm font-bold text-white">En ligne</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - CLEAN FORM (Light & Minimalist) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:w-[55%] bg-white flex flex-col justify-center items-center p-8 lg:p-12 relative overflow-hidden"
            >
              {/* Subtle Background Animations */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-[200px]"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -90, 0],
                  }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-[20%] -left-[20%] w-[80%] h-[80%] bg-gradient-to-tr from-sky-500/20 to-emerald-500/20 rounded-full blur-[250px]"
                />
              </div>

              <div className="w-full max-w-sm space-y-10 relative z-10">
                <div className="space-y-3 text-center lg:text-left">
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">NexCare CRM</h1>
                  <p className="text-base text-slate-500 font-medium">Connectez-vous à votre espace de travail.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2 group">
                      <label className="text-xs font-semibold text-slate-900 ml-1">Email professionnel</label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 bg-slate-50 border-slate-100 text-slate-900 rounded-xl focus:ring-2 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all font-medium text-base shadow-sm"
                        placeholder="nom@nexcare.io"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <div className="flex justify-between items-center ml-1">
                        <label className="text-xs font-semibold text-slate-900">Mot de passe</label>
                        <a href="#" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">Mot de passe oublié ?</a>
                      </div>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 bg-slate-50 border-slate-100 text-slate-900 rounded-xl focus:ring-2 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all font-medium text-base shadow-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Poste</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["Admin", "MKT", "Sales", "BO", "Supervisor", "Construction", "CAD", "Legal"].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSelectedRole(role)}
                          className={cn(
                            "h-10 rounded-xl text-[10px] font-bold transition-all border",
                            selectedRole === role
                              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                          )}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-lg shadow-slate-900/10 mt-8 flex items-center justify-center gap-3 text-sm transition-all"
                  >
                    Se connecter
                    <ArrowRight size={18} />
                  </Button>
                </form>

                <div className="flex items-center gap-4 py-8">
                  <div className="h-px bg-slate-100 flex-1" />
                  <span className="text-xs font-semibold text-slate-400">Ou continuer avec</span>
                  <div className="h-px bg-slate-100 flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="h-12 border border-slate-200 bg-white rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-300 transition-all font-semibold text-slate-700 text-sm">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    Google
                  </button>
                  <button className="h-12 border border-slate-200 bg-white rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-300 transition-all font-semibold text-slate-700 text-sm">
                    <img src="https://www.svgrepo.com/show/452062/microsoft.svg" alt="Microsoft" className="w-5 h-5" />
                    Microsoft
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 w-full h-screen bg-slate-950 relative z-50 flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100" />
            </div>

            <div className="relative z-10 w-full max-w-[440px] px-8 flex flex-col items-center">
              <motion.div
                animate={{ scale: [0.95, 1, 0.95], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-12"
              >
                <img src="https://modernys.immo/logo-white.png" alt="NexCare" className="h-10 invert brightness-0 opacity-100" />
              </motion.div>

              <div className="w-full space-y-6">
                {splashSteps.map((step, index) => {
                  const isActive = splashStep > index;
                  const isCurrent = splashStep === index + 1;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all duration-300",
                        isActive ? "bg-primary scale-125" : isCurrent ? "bg-white animate-pulse" : "bg-slate-800"
                      )} />
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                        isActive ? "text-primary" : isCurrent ? "text-white" : "text-slate-700"
                      )}>
                        {step.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="mt-12 h-[2px] w-32 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${(splashStep / splashSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
