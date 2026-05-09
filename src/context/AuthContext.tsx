import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock initializing auth
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    // Mock user creation
    const newUser = { id: "mock", email, user_metadata: { full_name: fullName } } as unknown as User;
    setUser(newUser);
    setSession({ user: newUser, access_token: "mock-token", refresh_token: "mock", expires_in: 3600, token_type: "bearer" } as Session);
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    if (password.length < 6) {
      return { error: new Error("Password must be at least 6 characters") };
    }
    // Mock successful login
    const existingUser = { id: "mock", email, user_metadata: { full_name: "Demo User" } } as unknown as User;
    setUser(existingUser);
    setSession({ user: existingUser, access_token: "mock-token", refresh_token: "mock", expires_in: 3600, token_type: "bearer" } as Session);
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
