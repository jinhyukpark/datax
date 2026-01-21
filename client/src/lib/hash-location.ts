import { useState, useEffect } from "react";

const getHashPath = () => {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  // Extract only the path part (before ?) for route matching
  const path = hash.split("?")[0];
  return path || "/";
};

export const useHashLocation = () => {
  const [loc, setLoc] = useState(getHashPath());

  useEffect(() => {
    const handler = () => setLoc(getHashPath());

    // subscribe on hash changes
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (to: string) => (window.location.hash = to);
  return [loc, navigate] as [string, (to: string) => void];
};
