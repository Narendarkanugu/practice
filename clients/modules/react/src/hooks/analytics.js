import { useEffect } from "react";

const usePageViewTracker = pageName => {
  useEffect(() => {
    if (!window.analytics) return;
    window.analytics.page(pageName);
  });
};

export { usePageViewTracker };
