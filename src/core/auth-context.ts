import { createContext } from "react";
import type { SessionUser } from "@core/session-store";

export type AuthContextValue = {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);