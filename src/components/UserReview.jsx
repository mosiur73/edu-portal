"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ReviewUser() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  return (
    <section className="max-w-xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        User Reviews
      </h2>

      {reviews.length > 0 ? (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={review.id || index}>
              <div className="border border-gray-200 rounded-lg shadow-sm p-6 bg-white text-center">
                {/* College name */}
                {review.collegeName && (
                  <h3 className="text-blue-700 text-xl font-semibold mb-2">
                    {review.collegeName}
                  </h3>
                )}

                {/* User name + rating */}
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">
                    {review.userName || "Anonymous"}
                  </span>{" "}
                  rated it {review.rating}{" "}
                  {review.rating === 1 ? "star" : "stars"}
                </p>

                {/* Review text */}
                <p className="italic text-gray-600 mb-4">
                  “{review.review}”
                </p>

                {/* Stars */}
                <div className="flex justify-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ★
                    </span>
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, i) => (
                    <span key={i} className="text-gray-300 text-xl">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500 text-center">
          No reviews found.
        </p>
      )}
    </section>
  );
}
