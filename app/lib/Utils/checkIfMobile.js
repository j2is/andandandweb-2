"use client";

export default function checkIfMobile() {
	const viewportW = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	const isMobile = viewportW < 768;
	return isMobile;
}
