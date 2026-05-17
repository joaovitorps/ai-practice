import { describe, it, expect } from "vitest";
import { cn, tryCatch, delay } from "@core/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("merges tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});

describe("tryCatch", () => {
  it("returns data on success", async () => {
    const [data, error] = await tryCatch(Promise.resolve("hello"));
    expect(data).toBe("hello");
    expect(error).toBeNull();
  });

  it("returns error on failure", async () => {
    const [data, error] = await tryCatch(Promise.reject(new Error("fail")));
    expect(data).toBeNull();
    expect(error).toBeInstanceOf(Error);
  });
});

describe("delay", () => {
  it("resolves after timeout", async () => {
    const start = Date.now();
    await delay(50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(40);
  });
});