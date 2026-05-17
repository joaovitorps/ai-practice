import { describe, it, expect } from "vitest";
import { useAppStore } from "@core/app-store";

describe("appStore", () => {
  it("has default locale", () => {
    expect(useAppStore.getState().locale).toBe("en");
  });

  it("updates locale", () => {
    useAppStore.getState().setLocale("pt");
    expect(useAppStore.getState().locale).toBe("pt");
    useAppStore.getState().setLocale("en");
  });
});