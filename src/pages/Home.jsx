import Container from "@/components/Container.jsx";
import Hero from "@/components/home/Hero.jsx";
import TrustBadges from "@/components/home/TrustBadges.jsx";
import FeaturedCategories from "@/components/home/FeaturedCategories.jsx";
import DealsOfTheDay from "@/components/home/DealsOfTheDay.jsx";
import HighestRated from "@/components/home/HighestRated.jsx";
import HomeSkeleton from "@/components/home/HomeSkeleton.jsx";
import ErrorState from "@/components/errors/ErrorState.jsx";
import useProducts from "@/hooks/useProducts.js";
import useCategories from "@/hooks/useCategories.js";

export default function Home() {
  const { products, isLoading, error, refetch } = useProducts({});
  const { categories } = useCategories();

  if (error) {
    return (
      <Container className="py-6 lg:py-10">
        <ErrorState
          title="Failed to load home page"
          error={error}
          onRetry={refetch}
          className="py-24"
        />
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container className="py-6 lg:py-10">
        <HomeSkeleton />
      </Container>
    );
  }

  // 3. Content
  return (
    <Container className="py-6 lg:py-10">
      <Hero products={products} />
      <TrustBadges />
      <FeaturedCategories products={products} categories={categories} />
      <DealsOfTheDay products={products} />
      <HighestRated products={products} />
    </Container>
  );
}
