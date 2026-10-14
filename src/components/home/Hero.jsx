import { useMemo } from "react";
import HeroMainCard from "./HeroMainCard.jsx";
import HeroSecondaryCard from "./HeroSecondaryCard.jsx";
import HeroMiniCard from "./HeroMiniCard.jsx";

export default function Hero({ products = [] }) {
  const pools = useMemo(() => {
    if (products.length < 4) return null;

    const getPool = (start) =>
      Array.from(
        { length: 4 },
        (_, i) => products[(start + i) % products.length],
      );

    return [getPool(100), getPool(77), getPool(20), getPool(40)];
  }, [products]);

  if (!pools) return null;

  return (
    <section className="grid grid-cols-1 gap-4 md:h-105 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2">
      <HeroMainCard products={pools[0]} />
      <HeroSecondaryCard products={pools[1]} />
      <HeroMiniCard variant="first" products={pools[2]} />
      <HeroMiniCard variant="second" products={pools[3]} />
    </section>
  );
}
