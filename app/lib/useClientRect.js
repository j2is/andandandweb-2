import { useEffect, useState, useCallback } from "react";

export default function useClientRect() {
  const [rect, setRect] = useState([]);
  const [savedNode, setSavedNode] = useState();

  const ref = useCallback(node => {
    if (node) {
      setRect(node.getBoundingClientRect());
      setSavedNode(node);
    }
  }, []);

  const updateState = () => {
    if (savedNode) {
      setRect(savedNode.getBoundingClientRect());
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, [savedNode]);

  return [rect, ref];
}
