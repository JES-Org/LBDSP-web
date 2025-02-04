import { useRef } from "react";
import { useInView } from "framer-motion";

export function useVisibility() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return { ref, isInView };
}
