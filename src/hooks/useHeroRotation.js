import { useState, useEffect, useRef } from "react";

const FADE = 500;

export default function useHeroRotation(products = [], interval = 5000) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (products.length <= 1) return;

    const timer = setInterval(() => {
      if (pausedRef.current) return;

      setVisible(false);

      setTimeout(() => {
        setIndex((i) => (i + 1) % products.length);
        setVisible(true);
      }, FADE);
    }, interval);

    return () => clearInterval(timer);
  }, [products.length, interval]);

  return {
    current: products[index] ?? null,
    visible,
    onMouseEnter: () => {
      pausedRef.current = true;
    },
    onMouseLeave: () => {
      pausedRef.current = false;
    },
  };
}