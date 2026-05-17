import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileQueries } from "@core/queries";
import { fetchProfile, updateProfile } from "@core/api/profile";
import type { UpdateProfileRequest } from "@core/api/profile";

export function useProfile(profileId: string) {
  return useQuery(profileQueries.detail(profileId));
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfile(data),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ["profiles"] }); },
  });
}