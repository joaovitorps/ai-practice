import { API_BASE_URL } from "@core/constants";
import { getAppStore } from "@core/app-store";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiRouteDefinition = {
  path: string;
  method: HttpMethod;
};

export function defineApiRoute(definition: ApiRouteDefinition): ApiRouteDefinition {
  return definition;
}

export function defineApiRouteFn<TParams>(
  pathFactory: (params: TParams) => string,
  method: HttpMethod,
): (params: TParams) => ApiRouteDefinition {
  return (params: TParams) => ({
    path: pathFactory(params),
    method,
  });
}

export class FriendlyError extends Error {
  readonly statusCode: number;
  readonly detail: string;

  constructor(title: string, statusCode: number, detail: string) {
    super(title);
    this.name = "FriendlyError";
    this.statusCode = statusCode;
    this.detail = detail;
  }
}

type RequestOptions = {
  path: string;
  method: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string>;
};

function buildUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return url.toString();
}

function getDefaultHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const appStore = getAppStore();
  const locale = appStore.getState().locale;
  if (locale) {
    headers["Accept-Language"] = locale;
  }

  const token = appStore.getState().accessToken;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json() as Promise<T>;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/problem+json")) {
    const problem = await response.json();
    throw new FriendlyError(
      problem.title ?? "Request failed",
      response.status,
      problem.detail ?? "",
    );
  }

  throw new FriendlyError(
    response.statusText || "Request failed",
    response.status,
    "",
  );
}

export async function httpResource<T>(options: RequestOptions): Promise<T> {
  const url = buildUrl(options.path, options.params);
  const headers = { ...getDefaultHeaders(), ...options.headers };

  const response = await fetch(url, {
    method: options.method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  return handleResponse<T>(response);
}

export async function httpUpload<T>(options: {
  path: string;
  method: HttpMethod;
  formData: FormData;
  headers?: Record<string, string>;
}): Promise<T> {
  const url = buildUrl(options.path);
  const headers: Record<string, string> = { ...options.headers };

  const appStore = getAppStore();
  const token = appStore.getState().accessToken;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const locale = appStore.getState().locale;
  if (locale) {
    headers["Accept-Language"] = locale;
  }

  const response = await fetch(url, {
    method: options.method,
    headers,
    body: options.formData,
  });

  return handleResponse<T>(response);
}