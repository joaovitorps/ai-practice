import { useProfile } from "@features/profile/hooks";
import { Badge } from "@ui/badge";
import { Loading } from "@ui/loading";
import { ProfileEmptyState } from "@features/profile/empty-state";

type ProfileListProps = { profileId: string };

export function ProfileList({ profileId }: ProfileListProps) {
  const { data: profile, isLoading, error } = useProfile(profileId);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-600">Error loading profile</p>;
  if (!profile) return <ProfileEmptyState />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{profile.name}</h2>
      <p className="text-gray-600">{profile.email}</p>
      <Badge variant="success">Active</Badge>
    </div>
  );
}