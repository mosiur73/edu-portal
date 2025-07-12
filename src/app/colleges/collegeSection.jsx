"use client";

import { useState } from "react";
import Link from "next/link";
import collegesData from "../../../public/collegedata.json"


export default function CollegeSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredColleges = collegesData.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Search Field */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for a college..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* College Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredColleges.length > 0 ? (
          filteredColleges.map((college) => (
            <div
              key={college.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {college.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Admission Dates:</strong> {college.admissionDates}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Events:</strong> {college.events}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Research:</strong> {college.researchHistory}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Sports:</strong> {college.sports}
              </p>

              <Link
                href={`/colleges/${college.id}`}
                className="mt-auto inline-block bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-3">
            No colleges found for "{searchTerm}"
          </p>
        )}
      </div>
    </section>
  );
}
