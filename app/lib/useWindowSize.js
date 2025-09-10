import React, { useEffect, useState } from "react";

function getSize() {
	if (typeof window === "undefined") {
		return { viewportW: undefined, viewportH: undefined };
	}
	const [html, body] = [document.documentElement, document.body];
	return {
		viewportW: Math.max(
			window.innerWidth ||
			html.clientWidth ||
			body.clientWidth ||
			window.screen.availWidth
		),
		viewportH: Math.max(
			window.innerHeight ||
			html.clientHeight ||
			body.clientHeight ||
			window.screen.availHeight
		)
	};
}

export default function useWindowSize(ignoreMobileWidthResize = true) {
	const [windowSize, setWindowSize] = useState(getSize());

	function handleResize() {
		if (ignoreMobileWidthResize) {
			const { viewportW } = getSize();
			if (viewportW < 1000 && windowSize.viewportW === viewportW) {
				return;
			}
		}
		setWindowSize(getSize());
	}

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return windowSize;
}
