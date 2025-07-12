
"use client";

import Link from "next/link";
import Image from "next/image";
import { colleges } from "@/lib/data";


export default function AdmissionCollegeList() {
  return (
    <div className="max-w-7xl mx-auto p-8 py-20">
      <h1 className="text-3xl font-bold text-center mb-8">Choose a College to Apply</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="border rounded-lg shadow hover:shadow-lg transition"
          >
            <Image
              src={college.image}
              alt={college.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{college.name}</h2>
              <p className="text-sm text-muted-foreground">
                Admission: {college.admissionDate}
              </p>
              <Link href={`/admission/${college.id}`}>
                <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Apply Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
