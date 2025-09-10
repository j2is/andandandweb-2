// https://github.com/yeskunall/react-dom-status-hook
const { useEffect, useState } = require("react");

function getDOM() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { readyState: "loading" };
  }
  return { readyState: document.readyState };
}

function useDOMState() {
  const [readyState, setReadyState] = useState(getDOM());

  function handleDOM() {
    // document.readyState is a read-only property AFAICT.
    // Therefore, `setReadyState` has no effect on
    // `document.readyState`
    setReadyState(getDOM());
  }

  useEffect(() => {
    document.addEventListener("readystatechange", handleDOM);
    document.addEventListener("DOMContentLoaded", handleDOM);
    return () => {
      document.removeEventListener("DOMContentLoaded", handleDOM);
      document.removeEventListener("readystatechange", handleDOM);
    };
  }, []);

  return readyState;
}

module.exports = useDOMState;
