import { createFileRoute } from "@tanstack/react-router";
import { useDashboardData } from "@features/dashboard/hooks";
import { OverviewCard } from "@features/dashboard/components/overview-card";
import { Loading } from "@ui/loading";

export const Route = createFileRoute("/_main/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { totalItems, isLoading, error } = useDashboardData();

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-600">Error loading dashboard</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <OverviewCard title="Total Items" value={totalItems} />
        <OverviewCard title="Active Items" value={0} description="All systems operational" />
        <OverviewCard title="Archived Items" value={0} />
      </div>
    </div>
  );
}