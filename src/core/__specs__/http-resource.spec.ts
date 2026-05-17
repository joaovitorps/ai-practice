import { describe, it, expect, vi } from "vitest";
import { httpResource, defineApiRoute, defineApiRouteFn, FriendlyError } from "@core/http-resource";

describe("defineApiRoute", () => {
  it("creates a route with path and method", () => {
    const route = defineApiRoute({ path: "/items", method: "GET" });
    expect(route.path).toBe("/items");
    expect(route.method).toBe("GET");
  });
});

describe("defineApiRouteFn", () => {
  it("creates a route factory", () => {
    const itemRoute = defineApiRouteFn<{ itemId: string }>(
      (params) => `/items/${params.itemId}`,
      "GET",
    );
    const route = itemRoute({ itemId: "123" });
    expect(route.path).toBe("/items/123");
    expect(route.method).toBe("GET");
  });
});

describe("httpResource", () => {
  it("makes a GET request and returns data", async () => {
    const mockResponse = { id: "1", name: "Test" };
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "Content-Type": "application/json" }),
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await httpResource<{ id: string; name: string }>({
      path: "/items/1",
      method: "GET",
    });

    expect(result).toEqual(mockResponse);
  });

  it("throws FriendlyError on non-ok response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 400,
      headers: new Headers({ "Content-Type": "application/problem+json" }),
      json: () => Promise.resolve({ title: "Bad Request", status: 400, detail: "Invalid input" }),
    } as Response);

    await expect(
      httpResource({ path: "/items", method: "POST", body: {} }),
    ).rejects.toThrow(FriendlyError);
  });
});

describe("FriendlyError", () => {
  it("creates error from problem+json response", () => {
    const error = new FriendlyError("Validation Error", 400, "Invalid input");
    expect(error.message).toBe("Validation Error");
    expect(error.statusCode).toBe(400);
    expect(error.detail).toBe("Invalid input");
    expect(error).toBeInstanceOf(Error);
  });
});