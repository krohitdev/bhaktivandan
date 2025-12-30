const GA_ID = import.meta.env.VITE_GA_ID;

export const pageView = (url: string) => {
  if (GA_ID && typeof window.gtag !== "undefined") {
    window.gtag("config", GA_ID, {
      page_path: url,
    });
  }
};
