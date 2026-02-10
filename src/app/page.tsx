"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Building2, ShieldCheck, ArrowRight, Github } from "lucide-react";
import { cn } from "@/lib/utils"; // Import cn for conditional classnames

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Please select a team hub profile to continue.");
      return;
    }
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  const roles = [
    { id: "executive", label: "Executive", color: "bg-emerald-500" },
    { id: "sales", label: "Sales", color: "bg-blue-500" },
    { id: "ops", label: "Operations", color: "bg-amber-500" },
    { id: "tech", label: "Technical", color: "bg-indigo-500" },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 flex items-center justify-center p-4">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-[1000px] grid md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden border">
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-slate-900 text-white relative">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="font-bold text-2xl tracking-tighter">NexCRM</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight mb-6">
              The OS for <span className="text-primary font-extrabold italic">Construction</span> & <span className="text-primary font-extrabold italic">Scale</span>.
            </h1>
            <p className="text-slate-400 text-lg">
              Centralizing operations, sales, and CAD technical validation in one unified workspace.
            </p>
          </div>

          <div className="relative z-10">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Building2 className="text-primary" size={24} />
                <h3 className="font-bold">Project Hub</h3>
                <p className="text-xs text-slate-500">Track milestones and CAD versions seamlessly.</p>
              </div>
              <div className="space-y-2">
                <ShieldCheck className="text-primary" size={24} />
                <h3 className="font-bold">Enterprise Grade</h3>
                <p className="text-xs text-slate-500">Secure document management and role-based views.</p>
              </div>
            </div>
          </div>

          {/* Abstract blobs */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8 md:hidden flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-bold text-xl tracking-tighter">NexCRM</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500 text-sm mt-1">Select your team profile or enter credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Team Hub Profile</label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <Button
                    key={role.id}
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      "justify-start gap-2 h-12 transition-all border-slate-200",
                      selectedRole === role.id && "border-primary bg-primary/5 ring-1 ring-primary"
                    )}
                  >
                    <div className={cn("w-2 h-2 rounded-full", role.color)}></div>
                    {role.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">or use credentials</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Input placeholder="Email address" type="email" required className="h-11 border-slate-200" defaultValue="admin@nex-crm.io" />
              </div>
              <div className="space-y-1.5">
                <Input placeholder="Password" type="password" required className="h-11 border-slate-200" defaultValue="••••••••" />
              </div>
            </div>

            <Button
              disabled={isLoading}
              className="w-full h-11 bg-primary hover:bg-primary/95 shadow-lg shadow-primary/20 transition-all font-bold"
            >
              {isLoading ? "Authenticating Workspace..." : "Sign in to Dashboard"}
              {!isLoading && <ArrowRight size={18} className="ml-2" />}
            </Button>
          </form>

          <div className="mt-8 text-center text-[10px] text-slate-400 leading-relaxed">
            By signing in, you agree to NexCRM's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>. Secured by AES-256 Hub Protection.
          </div>
        </div>
      </div>
    </div>
  );
}
