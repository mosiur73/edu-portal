
import Image from "next/image";
import CollegeSection from "./colleges/collegeSection";
import CollegeGallery from "@/components/collageGalary";
import ResearchPapers from "@/components/ResearchPapers";
import ReviewSection from "@/components/ReviewSection";

export default function Home() {
  return (
    <>
    <div className="py-20">
      <CollegeSection></CollegeSection>
      <CollegeGallery></CollegeGallery>
      <ResearchPapers></ResearchPapers>
      <ReviewSection></ReviewSection>
      
    </div>
    </>
  );
}
