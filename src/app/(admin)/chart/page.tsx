import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title: "Admin | Charts",
  description:
    "This is the chart page for admin",
};

const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Chart />
    </DefaultLayout>
  );
};

export default BasicChartPage;
