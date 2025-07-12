"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ReviewSection() {
  const reviews = [
    {
      id: 1,
      college: "Harvard University",
      name: "John Doe",
      rating: 5,
      comment: "Excellent faculty and vibrant campus life. Highly recommended!",
    },
    {
      id: 2,
      college: "MIT",
      name: "Sarah Lee",
      rating: 4,
      comment: "Amazing research opportunities, but quite challenging.",
    },
    {
      id: 3,
      college: "Stanford University",
      name: "Emma Brown",
      rating: 5,
      comment: "Fantastic environment for innovation and startups.",
    },
    {
      id: 4,
      college: "Yale University",
      name: "Liam Patel",
      rating: 3,
      comment: "Good academics but social life could be better.",
    },
    {
      id: 5,
      college: "Princeton University",
      name: "Sophia Chen",
      rating: 4,
      comment: "Beautiful campus and supportive professors.",
    },
    {
      id: 6,
      college: "Cambridge University",
      name: "David Wright",
      rating: 5,
      comment: "Top-notch research and international exposure.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Student Reviews & Feedback
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="pb-10"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white rounded-lg shadow hover:shadow-lg p-6 border border-gray-100 h-full transition-all duration-300">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {review.college}
              </h3>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">{review.name}</span>{" "}
                rated it {review.rating} stars
              </p>
              <p className="text-gray-700 italic mb-3">
                “{review.comment}”
              </p>
              <div className="flex">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <svg
                    key={idx}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.564-.954L10 0l2.949 5.956 6.564.954-4.757 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
