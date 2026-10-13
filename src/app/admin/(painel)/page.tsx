import type { Metadata } from "next";
import { LatestLeads, LeadsChart, MetricCards, OriginBars } from "@/components/admin/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <>
      <MetricCards />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-3.5">
        <LeadsChart />
        <OriginBars />
      </div>
      <LatestLeads />
    </>
  );
}
