"use client";
import checkIfMobile from "./checkIfMobile";

const removeScrollSnapIfMobile = () => {
	const isMobile = checkIfMobile();
	if (!isMobile) {
		return;
	}
	document.documentElement.style.scrollSnapType = 'none';
};

const startScrollSnapIfMobile = () => {
	const isMobile = checkIfMobile();
	if (!isMobile) {
		return;
	}
	document.documentElement.style.scrollSnapType = 'y mandatory';
};

const scrollToWithCb = ({ top, left, elem, cb, behavior = "auto", scrollSnap = false }) => {
	return new Promise((resolve, reject) => {
		if (scrollSnap) {
			removeScrollSnapIfMobile();
		}
		const roundedTopPos = top !== undefined ? Math.round(top) : undefined;
		const roundedLeftPos = left !== undefined ? Math.round(left) : undefined;
		let timeoutTimer = undefined;

		const onScroll = () => {
			const scrollY =
				window.scrollY ||
				window.pageYOffset ||
				document.documentElement.scrollTop;
			const scrollX =
				window.scrollX ||
				window.pageXOffset ||
				document.documentElement.scrollLeft;

			// check left pos
			if (roundedLeftPos !== undefined && scrollX === roundedLeftPos) {
				window.removeEventListener("scroll", onScroll);
				resolve(true);
			}
			// check top pos
			if (
				roundedLeftPos === undefined &&
				roundedTopPos !== undefined &&
				scrollY === roundedTopPos
			) {
				window.removeEventListener("scroll", onScroll);
				resolve(true);
			}
			// fallback
			clearTimeout(timeoutTimer);
			timeoutTimer = setTimeout(() => {
				window.removeEventListener("scroll", onScroll);
				clearTimeout(timeoutTimer);
				if (scrollSnap) {
					startScrollSnapIfMobile();
				}
				resolve(true);
			}, 250);
		};

		window.addEventListener("scroll", onScroll);
		window.scrollTo({ top: roundedTopPos, left: roundedLeftPos, behavior });
	});
};

export default scrollToWithCb;
