import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to top of each page that user lands on. Learned how to do this here:
// https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
