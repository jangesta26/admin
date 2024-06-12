import { Metadata } from "next";
import React from 'react'
import Dashboard from "@/components/Dashboard/Dashboard";

export const metadata: Metadata = {
  title: "  iQueries - Dashboard",
  description: "This is the auth page for admin",
  // other metadata
};

const MainDashboard = () => {
  return (
    <>
      <Dashboard />
    </>
  )
}

export default MainDashboard
