"use client";

import React, { createContext, useContext } from "react";

type UserContextType = {
    userName: string;
    userInitials: string;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const userName = "Athul Anoop"; // ModuleLayout owns these
    const userInitials = "AA";

    return (
        <UserContext.Provider value={{ userName, userInitials }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
}
