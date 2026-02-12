"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useApp();
    const isAuthPage = pathname === "/";
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        if (isMounted && !user && !isAuthPage) {
            router.push("/");
        }
    }, [user, isAuthPage, isMounted, router]);

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {isAuthPage ? (
                children
            ) : (
                <div className="flex">
                    <Sidebar onCollapse={setIsSidebarCollapsed} collapsed={isSidebarCollapsed} />
                    <main
                        className={cn(
                            "flex-1 transition-all duration-300 ease-in-out min-h-screen",
                            isSidebarCollapsed ? "pl-20" : "pl-72"
                        )}
                    >
                        <Topbar />
                        <div className="relative">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none -z-10" />

                            <div className="p-4 lg:p-6 max-w-[1800px] mx-auto">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={pathname}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    >
                                        {children}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
}
