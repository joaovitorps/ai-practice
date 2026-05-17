import { http, HttpResponse, delay } from "msw";

const items = [
  { id: "1", name: "Item Alpha", description: "First item description", status: "active" as const, createdAt: "2026-01-15" },
  { id: "2", name: "Item Beta", description: "Second item description", status: "active" as const, createdAt: "2026-02-20" },
  { id: "3", name: "Item Gamma", description: "Third item description", status: "archived" as const, createdAt: "2026-03-10" },
];

const profile = { id: "user-1", name: "Demo User", email: "demo@example.com" };

export const handlers = [
  http.get("/api/items", async ({ request }) => {
    await delay(200);
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    let filtered = items;
    if (search) { filtered = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())); }
    return HttpResponse.json({ items: filtered, total: filtered.length });
  }),
  http.get("/api/items/:itemId", async ({ params }) => {
    await delay(150);
    const item = items.find((i) => i.id === params.itemId);
    if (!item) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(item);
  }),
  http.post("/api/items", async ({ request }) => {
    await delay(200);
    const body = await request.json() as { name: string; description: string };
    const newItem = { id: String(items.length + 1), ...body, status: "active" as const, createdAt: new Date().toISOString().split("T")[0] };
    items.push(newItem);
    return HttpResponse.json(newItem, { status: 201 });
  }),
  http.put("/api/items/:itemId", async ({ params, request }) => {
    await delay(200);
    const index = items.findIndex((i) => i.id === params.itemId);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    const body = await request.json() as Record<string, unknown>;
    items[index] = { ...items[index], ...body };
    return HttpResponse.json(items[index]);
  }),
  http.delete("/api/items/:itemId", async ({ params }) => {
    await delay(200);
    const index = items.findIndex((i) => i.id === params.itemId);
    if (index !== -1) items.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
  http.get("/api/profile", async () => {
    await delay(100);
    return HttpResponse.json(profile);
  }),
  http.put("/api/profile", async ({ request }) => {
    await delay(150);
    const body = await request.json() as Record<string, unknown>;
    Object.assign(profile, body);
    return HttpResponse.json(profile);
  }),
];