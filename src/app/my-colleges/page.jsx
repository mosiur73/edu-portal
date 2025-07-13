"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MyCollegePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [collegeData, setCollegeData] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Auth protect
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      const stored = localStorage.getItem("myColleges");
      if (stored) {
        setCollegeData(JSON.parse(stored));
      }

      const storedReviews = localStorage.getItem("reviews");
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    }
  }, [status]);

  const handleReviewSubmit = (e, collegeId) => {
    e.preventDefault();

    const form = e.target;
    const reviewText = form.review.value;
    const ratingValue = Number(form.rating.value);

    const newReview = {
      id: Date.now() + Math.random(), 
      review: reviewText,
      rating: ratingValue,
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    alert("Review submitted successfully!");
    form.reset();
  };

  if (status === "loading") {
    return <p className="text-center p-10">Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (collegeData.length === 0) {
    return <p className="text-center p-10">No college data found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 py-20">
      <h1 className="text-3xl font-bold mb-10 text-center">My Colleges</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {collegeData.map((college) => (
          <div
            key={`${college.collegeId}-${college.email || college.name}`}
            className="mb-12 border p-6 rounded shadow"
          >
            <h2 className="text-2xl font-bold mb-4">{college.collegeName}</h2>

            {college.image && (
              <img
                src={college.image}
                alt={college.collegeName}
                className="w-full h-64 object-cover rounded mb-6"
              />
            )}

            <ul className="space-y-2 text-lg mb-6">
              <li><strong>Name:</strong> {college.name}</li>
              <li><strong>Subject:</strong> {college.subject}</li>
              <li><strong>Email:</strong> {college.email}</li>
              <li><strong>Phone:</strong> {college.phone}</li>
              <li><strong>Address:</strong> {college.address}</li>
              <li><strong>Date of Birth:</strong> {college.dob}</li>
            </ul>

            <hr className="my-4" />

            <h3 className="text-xl font-semibold mb-2">Add a Review</h3>
            <form
              onSubmit={(e) => handleReviewSubmit(e, college.collegeId)}
              className="grid gap-4"
            >
              <textarea
                name="review"
                placeholder="Write your review..."
                className="border p-2 rounded"
                required
              ></textarea>

              <select
                name="rating"
                className="border p-2 rounded"
                defaultValue={5}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n > 1 && "s"}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Submit Review
              </button>
            </form>

            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2">Reviews:</h4>
              {reviews.filter((r) => r.collegeId === college.collegeId).length > 0 ? (
                <ul className="space-y-2">
                  {reviews
                    .filter((r) => r.collegeId === college.collegeId)
                    .map((r, idx) => (
                      <li
                        key={`${college.collegeId}-${r.id || idx}`}
                        className="border p-3 rounded bg-gray-50"
                      >
                        <p className="text-gray-800">{r.review}</p>
                        <p className="text-yellow-600 font-semibold">
                          Rating: {r.rating} ★
                        </p>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
