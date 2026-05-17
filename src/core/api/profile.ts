import { defineApiRoute, httpResource } from "@core/http-resource";
import type { ProfileResponse } from "@core/queries";

export const profileRoute = defineApiRoute({ path: "/profile", method: "GET" });

export type UpdateProfileRequest = {
  name?: string;
  email?: string;
};

export async function fetchProfile(): Promise<ProfileResponse> {
  return httpResource<ProfileResponse>(profileRoute);
}

export async function updateProfile(data: UpdateProfileRequest): Promise<ProfileResponse> {
  return httpResource<ProfileResponse>({
    path: "/profile",
    method: "PUT",
    body: data,
  });
}