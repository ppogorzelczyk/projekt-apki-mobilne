import React, { useState } from "react";
import { useStorageState } from "./useStorageState";
import { login } from "@/api/requests/login";
const AuthContext = React.createContext<{
  saveToken: (token: string) => void;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
  session?: string | null;
  userEmail?: string | null;
  isLoading: boolean;
}>({
  saveToken: () => null,
  signIn: async () => Promise.resolve(false),
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[_, userEmail], setUserEmail] = useStorageState("userEmail");

  return (
    <AuthContext.Provider
      value={{
        saveToken: (token: string) => {
          setSession(token);
        },
        signIn: async (email: string, password: string) => {
          try {
            const response = await login({ email, password });
            setSession(response.token);
            setUserEmail(response.email);
            return true;
          } catch (error) {
            console.error("Error logging in:", error);
            setSession(null);
            setUserEmail(null);
            return false;
          }
        },
        signOut: () => {
          console.log("Signing out");
          setSession(null);
          setUserEmail(null);
        },
        session,
        userEmail,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
