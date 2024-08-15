import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Admin | Elements",
  description:
    "This is the elements for admin",
};

const FormElementsPage = () => {
  return (
    <>
      <FormElements />
    </>
  );
};

export default FormElementsPage;
