import { useEffect } from "react";

const usePageViewTracker = (pageName, analytics) => {
  useEffect(() => {
    if (!analytics) return;
    analytics.page(pageName);
  });
};

export { usePageViewTracker };
