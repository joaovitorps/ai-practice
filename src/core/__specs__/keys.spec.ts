import { describe, it, expect } from "vitest";
import { itemKeys, profileKeys } from "@core/keys";

describe("itemKeys", () => {
  it("creates keys with factory pattern", () => {
    expect(itemKeys.all).toEqual({ scope: "items" });
    expect(itemKeys.lists()).toEqual({ scope: "items", type: "list" });
    expect(itemKeys.list({ page: 1 })).toEqual({ scope: "items", type: "list", page: 1 });
    expect(itemKeys.detail("123")).toEqual({ scope: "items", type: "detail", id: "123" });
  });
});

describe("profileKeys", () => {
  it("creates keys with factory pattern", () => {
    expect(profileKeys.all).toEqual({ scope: "profiles" });
    expect(profileKeys.detail("456")).toEqual({ scope: "profiles", type: "detail", id: "456" });
  });
});