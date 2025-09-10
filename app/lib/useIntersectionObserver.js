import { useState, useEffect } from "react";

const defaultOptions = {
  root: null,
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.0
};

export const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(
    () => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        {
          root: options.root || defaultOptions.root,
          rootMargin: options.rootMargin || defaultOptions.rootMargin,
          threshold: options.threshold || defaultOptions.threshold
        }
      );

      const { current } = ref;

      if (current) {
        observer.observe(current);
      }

      return () => {
        if (current) {
          observer.unobserve(current);
        }
      };
    },
    [ref, options.root, options.rootMargin, options.threshold]
  );

  return isIntersecting;
};
