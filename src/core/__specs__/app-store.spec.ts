import { describe, it, expect } from "vitest";
import { getAppStore } from "@core/app-store";

describe("appStore", () => {
  it("has default locale", () => {
    const store = getAppStore();
    expect(store.getState().locale).toBe("en");
  });

  it("updates locale", () => {
    const store = getAppStore();
    store.getState().setLocale("pt");
    expect(store.getState().locale).toBe("pt");
    store.getState().setLocale("en");
  });
});