export const colleges = [
  {
    id: "1", 
    name: "Tech University",
    image: "https://i.ibb.co/0ySqNvLt/download-3.jpg",
    rating: 4.5,
    admissionDate: "2025-08-15",
    researchCount: 120,
    description:
      "A leading institution for technology and innovation, known for its cutting-edge research and strong industry connections. Tech University offers a vibrant campus life with numerous student organizations and a strong alumni network.",
    events: ["Annual Tech Fest", "Coding Marathon", "Startup Pitch Day", "AI Conference"],
    sports: ["Basketball", "Football", "Esports", "Swimming"],
  },
  {
    id: "2",
    name: "Arts & Humanities College",
    image: "https://i.ibb.co/q3spC7XM/download-4.jpg",
    rating: 4.2,
    admissionDate: "2025-09-01",
    researchCount: 45,
    description:
      "Dedicated to fostering creativity and critical thinking in the arts, literature, and social sciences. This college prides itself on its diverse curriculum and a supportive environment for artistic expression.",
    events: ["Literary Festival", "Art Exhibition", "Drama Club Showcase", "Poetry Slam"],
    sports: ["Chess", "Debate", "Yoga", "Badminton"],
  },
 
  {
    id: "3",
    name: "Global Business School",
    image: "https://i.ibb.co/7x9q0FGX/download-5.jpg",
    rating: 4.8,
    admissionDate: "2025-07-20",
    researchCount: 80,
    description:
      "A premier business school with a global perspective, preparing leaders for the challenges of the modern economy. Students benefit from international exchange programs and strong ties with multinational corporations.",
    events: ["Business Conclave", "Entrepreneurship Summit", "Case Study Competition", "Investment Forum"],
    sports: ["Golf", "Tennis", "Swimming", "Squash"],
  },
  {
    id: "4",
    name: "Science & Research Institute",
    image: "https://i.ibb.co/1YgWY3vG/download.jpg",
    rating: 4.7,
    admissionDate: "2025-08-01",
    researchCount: 200,
    description:
      "At the forefront of scientific discovery, offering advanced research opportunities in various scientific disciplines. The institute boasts state-of-the-art laboratories and collaborations with leading research organizations.",
    events: ["Science Fair", "Research Symposium", "Astronomy Night", "Biotech Expo"],
    sports: ["Badminton", "Table Tennis", "Volleyball", "Fencing"],
  },
  {
    id: "5",
    name: "Medical University",
    image: "https://i.ibb.co/mFcYRC7Q/download-1.jpg",
    rating: 4.6,
    admissionDate: "2025-09-10",
    researchCount: 90,
    description:
      "Committed to excellence in medical education and healthcare research, training the next generation of medical professionals. The university is affiliated with top hospitals, providing extensive clinical experience.",
    events: ["Health Awareness Campaigns", "Medical Conferences", "First Aid Workshops", "Anatomy Challenge"],
    sports: ["Running Club", "Gymnastics", "Cycling", "Martial Arts"],
  },
  {
    id: "6",
    name: "Environmental Studies College",
    image: "https://i.ibb.co/LXzknBZ6/download-2.jpg",
    rating: 4.3,
    admissionDate: "2025-08-25",
    researchCount: 60,
    description:
      "Focusing on sustainability and environmental conservation, offering programs that address global ecological challenges. This college is known for its field research and community engagement in environmental protection.",
    events: ["Eco-Friendly Fair", "Conservation Workshops", "Nature Photography Contest", "Climate Action Summit"],
    sports: ["Hiking", "Kayaking", "Orienteering", "Rock Climbing"],
  },
]

export function getCollegeById(id) {
  // This function should correctly find the college by its ID
  return colleges.find((college) => college.id === id)
}
