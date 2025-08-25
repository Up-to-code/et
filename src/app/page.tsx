"use client";
import Hero from "@/components/pages/home/Hero";
import { PropertyListing } from "@/components/pages/home/PropertyCard/PropertyCard";
 import React from "react";

export default function Page() {
  return (
     <div>
      <Hero/>
      <PropertyListing />
     </div>
  );
}