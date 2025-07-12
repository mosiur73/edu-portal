"use client";

export default function CollegeGallery() {
  const galleryImages = [
    {
      id: 1,
      url: "https://i.ibb.co/G3MRDGsT/download-1.jpg",
      caption: "Graduation Ceremony - Harvard",
    },
    {
      id: 2,
      url: "https://i.ibb.co/5gHvYj0W/download-3.jpg",
      caption: "MIT Alumni Meetup",
    },
    


    {
      id: 3,
      url: "https://i.ibb.co/DqNw9JN/download.jpg",
      caption: "Stanford Science Fair",
    },
    {
      id: 4,
      url: "https://i.ibb.co/1GcTVRTk/download-2.jpg",
      caption: "Yale Literary Fest",
    },
    



    {
      id: 5,
      url: "https://i.ibb.co/WvKvXb2f/images-2.jpg",
      caption: "Princeton Math Olympiad",
    },
    {
      id: 6,
      url: "https://i.ibb.co/JFbC7fWY/images-3.jpg",
      caption: "Cambridge Science Festival",
    },
    {
      id: 7,
      url: "https://i.ibb.co/Wp2Cp8xj/images.jpg",
      caption: "Cambridge Science Festival",
    },
    {
      id: 8,
      url: "https://i.ibb.co/HfrsRqzF/images-1.jpg",
      caption: "Cambridge Science Festival",
    },
    {
      id: 9,
       url: "https://i.ibb.co/G3MRDGsT/download-1.jpg",
      caption: "Cambridge Science Festival",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-800">
        College Graduates Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="group relative overflow-hidden rounded shadow hover:shadow-lg transition"
          >
            <img
              src={img.url}
              alt={img.caption}
              className="w-full h-64 object-cover transform group-hover:scale-110 duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-sm font-semibold">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
