import { describe, it, expect } from "vitest";
import { useSessionStore } from "@core/session-store";

describe("sessionStore", () => {
  it("starts with null user", () => {
    expect(useSessionStore.getState().user).toBeNull();
  });

  it("sets user", () => {
    useSessionStore.getState().setUser({ id: "1", name: "Test", email: "test@test.com" });
    expect(useSessionStore.getState().user).toEqual({ id: "1", name: "Test", email: "test@test.com" });
    useSessionStore.getState().setUser(null);
  });
});