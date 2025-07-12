// app/colleges/page.jsx

"use client";
import Image from "next/image"

import { CollegeCard } from "@/components/college-card";
import { colleges } from "@/lib/data";


export default function CollegesPage() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">All Colleges</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {colleges.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>
    </section>
  );
}
