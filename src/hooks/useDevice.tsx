import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isDesktop: boolean = width > 1024;
  const isNotDesktop: boolean = width <= 1024;
  const isTablet: boolean = width <= 1024 && width > 720;
  const isNotMobile: boolean = width > 720;
  const isMobile: boolean = width <= 720;

  return {
    isDesktop,
    isMobile,
    isTablet,
    isNotDesktop,
    isNotMobile
  };
};

export default useIsMobile;
