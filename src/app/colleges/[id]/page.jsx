"use client";

import { useParams } from "next/navigation";
import collegesData from "../../../../public/collegedata.json";

export default function CollegeDetailsPage() {
  const { id } = useParams();
  const college = collegesData.find((c) => c.id === id);

  if (!college) {
    return (
      <div className="container mx-auto py-12 text-center px-6">
        <h2 className="text-3xl font-bold text-red-600">College not found!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      {/* Hero Section */}
      <div className="relative">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-96 p-6 object-cover brightness-50 rounded"
        />
        <h1 className="absolute top-1/2 left-1/2 text-white text-4xl md:text-5xl font-bold transform -translate-x-1/2 -translate-y-1/2">
          {college.name}
        </h1>
      </div>

      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">Admission Process</h2>
            <p className="text-gray-700">{college.admissionProcess}</p>
          </div>

          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-2xl font-bold mb-2 text-green-700">Event Details</h2>
            <p className="text-gray-700">{college.eventDetails}</p>
          </div>

          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-2xl font-bold mb-2 text-purple-700">Research Works</h2>
            <p className="text-gray-700">{college.researchWorks}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-2xl font-bold mb-2 text-red-700">Sports Categories</h2>
            <p className="text-gray-700">{college.sportsCategories}</p>
          </div>

          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Admission Dates</h2>
            <p className="text-gray-700">{college.admissionDates}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
