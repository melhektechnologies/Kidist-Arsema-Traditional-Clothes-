import Hero from "@/components/Hero";
import AboutSnippet from "@/components/AboutSnippet";
import FeaturedCollections from "@/components/FeaturedCollections";
import FashionVideo from "@/components/FashionVideo";
import CustomDesignForm from "@/components/CustomDesignForm";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSnippet />
      <FeaturedCollections />
      <FashionVideo />
      <CustomDesignForm />
    </>
  );
}
