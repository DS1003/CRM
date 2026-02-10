"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/";
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    return (
        <>
            {isAuthPage ? (
                children
            ) : (
                <div className="flex">
                    <Sidebar onCollapse={setIsSidebarCollapsed} collapsed={isSidebarCollapsed} />
                    <main
                        className={cn(
                            "flex-1 transition-all duration-300 min-h-screen",
                            isSidebarCollapsed ? "ml-20" : "ml-64"
                        )}
                    >
                        <Topbar />
                        <div className="p-8 max-w-[1600px] mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            )}
        </>
    );
}
