"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export function CollegeCard({ college }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0">
        <Image
          src={college.image || "/placeholder.svg"}
          alt={`Image of ${college.name}`}
          width={300}
          height={300}
          className="rounded-t-lg object-cover w-full h-52"
        />
      </CardHeader>
      <CardContent className="p-4 grid gap-2">
        <CardTitle className="text-xl font-bold">{college.name}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="sr-only">Rating:</span>
          <span>{college.rating.toFixed(1)}</span>
        </div>
        <CardDescription className="text-sm">
          <span className="font-medium">Admission Date:</span> {college.admissionDate}
        </CardDescription>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Research Projects:</span> {college.researchCount}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/college/${college.id}`} passHref>
          <Button className="w-full">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
