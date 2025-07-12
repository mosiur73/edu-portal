"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCollegeById } from "@/lib/data";
import { use } from "react";

export default function AdmissionPage({ params }) {
  const { id } = use(params);

  const college = getCollegeById(id);
  const router = useRouter();

  const [formData, setFormData] = useState({
    collegeId: college?.id,
    collegeName: college?.name,
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    image: "",
  });

  useEffect(() => {
    if (college) {
      setFormData((prev) => ({
        ...prev,
        collegeId: college.id,
        collegeName: college.name,
      }));
    }
  }, [college]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ১. আগের ডাটা বের করো
    const stored = localStorage.getItem("myColleges");
    const oldData = stored ? JSON.parse(stored) : [];

    // ২. নতুন ডাটা আগের array তে মিশাও
    const newData = [...oldData, formData];

    // ৩. LocalStorage-এ আবার সেট করো
    localStorage.setItem("myColleges", JSON.stringify(newData));

    alert("Admission data saved successfully!");

    // Redirect
    router.push("/my-colleges");
  };

  if (!college) {
    return <p>College not found</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-8 py-20">
      <h1 className="text-3xl font-bold mb-6">
        Admission Form for {college.name}
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="name"
          placeholder="Candidate Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Candidate Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Candidate Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
