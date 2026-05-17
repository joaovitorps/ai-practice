import { useState, useCallback, useEffect, type ReactNode } from "react";
import { AuthContext, type AuthContextValue } from "@core/auth-context";
import { useSessionStore } from "@core/session-store";
import { getAppStore } from "@core/app-store";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSessionStore((s) => s.user);
  const setUser = useSessionStore((s) => s.setUser);

  useEffect(() => {
    const token = getAppStore().getState().accessToken;
    if (token) {
      setUser({
        id: "mock-user",
        name: "Mock User",
        email: "mock@example.com",
      });
    }
    setIsLoading(false);
  }, [setUser]);

  const login = useCallback(async (_email: string, _password: string) => {
    setIsLoading(true);
    getAppStore().getState().setAccessToken("mock-access-token");
    setUser({
      id: "mock-user",
      name: "Mock User",
      email: _email,
    });
    setIsLoading(false);
  }, [setUser]);

  const logout = useCallback(() => {
    getAppStore().getState().setAccessToken(null);
    setUser(null);
  }, [setUser]);

  const register = useCallback(async (_name: string, _email: string, _password: string) => {
    setIsLoading(true);
    getAppStore().getState().setAccessToken("mock-access-token");
    setUser({
      id: "mock-user",
      name: _name,
      email: _email,
    });
    setIsLoading(false);
  }, [setUser]);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}