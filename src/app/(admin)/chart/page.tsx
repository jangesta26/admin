import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin | Charts",
  description:
    "This is the chart page for admin",
};

const BasicChartPage: React.FC = () => {
  return (
    <>
      <Chart />
    </>
  );
};

export default BasicChartPage;
