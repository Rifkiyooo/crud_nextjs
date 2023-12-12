import { DashboardLayout } from "@/components/layouts";
import DoaFeatures from "@/features/doa";

export default function Doa() {
  return (
    <>
      <DoaFeatures />
    </>
  );
}

Doa.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
