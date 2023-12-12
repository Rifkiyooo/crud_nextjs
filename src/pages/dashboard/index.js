import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import UsersFeatures from "@/features/products";

export default function Dashboard() {
  const route = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("token");
    if (!session) {
      route.push("/");
    }
  }, []);

  return (
    <>
      <UsersFeatures />
    </>
  );
}
Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
