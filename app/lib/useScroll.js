import React, { useEffect, useState } from "react";

export default function useScroll() {
  const [scroll, setScroll] = useState({
    scrollX: 0,
    scrollY: 0
  });

  const getScrollPos = () => {
    if (typeof window === "undefined") {
      return {
        scrollX: 0,
        scrollY: 0
      };
    }
    const scrollX =
      window.scrollX ||
      window.pageXOffset ||
      document.documentElement.scrollLeft;

    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;

    setScroll({ scrollX, scrollY });
  };

  useEffect(() => {
    window.addEventListener("scroll", getScrollPos, { passive: true });
    return () => {
      window.removeEventListener("scroll", getScrollPos, { passive: true });
    };
  }, []);

  return scroll;
}
