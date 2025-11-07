import { useEffect } from "react";

export default function useScrollRestoration() {
  useEffect(() => {
    // On mount, restore scroll
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }

    // Save scroll position on refresh / close
    const savePosition = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    };

    window.addEventListener("beforeunload", savePosition);

    return () => {
      window.removeEventListener("beforeunload", savePosition);
    };
  }, []);
}
