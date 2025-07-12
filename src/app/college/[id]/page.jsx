// app/colleges/[id]/page.jsx

import { getCollegeById } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CollegeDetailsPage({ params }) {
  const college = getCollegeById(params.id);

  if (!college) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        {/* Card Header with College Image */}
        <CardHeader className="p-0">
          <Image
            src={college.image || "/placeholder.svg"}
            alt={`Image of ${college.name}`}
            width={800}
            height={400}
            className="rounded-t-lg object-cover w-full h-64 md:h-80"
            priority
          />
        </CardHeader>

        <CardContent className="p-6 grid gap-6">
          {/* College Basic Info */}
          <div className="grid gap-2">
            <CardTitle className="text-3xl md:text-4xl font-bold">
              {college.name}
            </CardTitle>

            <div className="flex items-center gap-1 text-lg text-muted-foreground">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="sr-only">Rating:</span>
              <span>{college.rating.toFixed(1)}</span>
            </div>

            <CardDescription className="text-base">
              <span className="font-medium">Admission Date:</span>{" "}
              {college.admissionDate}
            </CardDescription>

            <div className="text-base text-muted-foreground">
              <span className="font-medium">Research Projects:</span>{" "}
              {college.researchCount}
            </div>
          </div>

          {/* Description */}
          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold">
              About {college.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {college.description}
            </p>
          </section>

          {/* Events */}
          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold">Events</h2>
            {college.events.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {college.events.map((event, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 text-sm"
                  >
                    {event}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No events listed for this college.
              </p>
            )}
          </section>

          {/* Sports */}
          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold">Sports Facilities</h2>
            {college.sports.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {college.sports.map((sport, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 text-sm"
                  >
                    {sport}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No sports facilities listed for this college.
              </p>
            )}
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
