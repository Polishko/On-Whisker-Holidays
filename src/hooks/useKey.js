import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    const callback = (e) => {
      if (e.code && key && e.code.toLowerCase() === key.toLowerCase()) {
        e.preventDefault(); //possibly redundant but safe
        action(e);
      }
    };

    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [key, action]);
}
