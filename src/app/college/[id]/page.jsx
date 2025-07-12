import { getCollegeById } from "@/lib/data";
import { notFound } from "next/navigation";
import ClientCollegeDetailsPage from "./collegeDetails";


export default async function CollegeDetailsPage({ params }) {
  const college = await getCollegeById(params.id);

  if (!college) {
    notFound();
  }


  return <ClientCollegeDetailsPage college={college} />;
}
