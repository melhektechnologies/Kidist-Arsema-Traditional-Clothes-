import Hero from "@/components/Hero";
import AboutSnippet from "@/components/AboutSnippet";
import FeaturedCollections from "@/components/FeaturedCollections";
import CoutureProcess from "@/components/CoutureProcess";
import MeasurementGuide from "@/components/MeasurementGuide";
import CustomDesignForm from "@/components/CustomDesignForm";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSnippet />
      <FeaturedCollections />
      <CoutureProcess />
      <MeasurementGuide />
      <CustomDesignForm />
    </>
  );
}
