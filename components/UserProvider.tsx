"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface UserContextType {
  userId: string | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  isLoading: true,
});

export const useUser = () => useContext(UserContext);

function generateUUID() {
  if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  // Fallback RFC4122 version 4 compliant UUID generator
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeUser() {
      try {
        const storedUserId = localStorage.getItem("off-the-limits-user-id");

        if (storedUserId) {
          setUserId(storedUserId);
          setIsLoading(false);
          return;
        }

        // Generate and insert a new user_id
        const newUserId = generateUUID();
        const supabase = createClient();

        const { error } = await supabase
          .from("User")
          .insert({ user_id: newUserId });

        if (error) {
          console.error("Error creating user in Supabase:", error);
        }

        // Save to local storage and update local state
        localStorage.setItem("off-the-limits-user-id", newUserId);
        setUserId(newUserId);
      } catch (err) {
        console.error("Failed to initialize user:", err);
      } finally {
        setIsLoading(false);
      }
    }

    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ userId, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
