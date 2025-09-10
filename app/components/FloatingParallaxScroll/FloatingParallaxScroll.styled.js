"use client";

import styled from "styled-components";
import { font, media, theme } from "../Styles";

const FloatingParallaxScrollStyles = styled.section`
	position: relative;
	width: 100%;
	min-height: 400vh; /* Tall enough to allow scrolling through the virtual field */
	background: ${theme.white};
	overflow: visible;
	cursor: none;
	touch-action: none;

	/* Expanded state for hiding non-expanded images */
	&.expanded .floating-item:not(.expanded) {
		opacity: 0 !important;
		transition: opacity 0.4s ease;
	}

	/* Hover effect: when any floating-item is hovered, fade and grayscale all others */
	&:has(.floating-item:hover) .floating-item:not(:hover) img {
		opacity: 0.1;
		filter: grayscale(100%);
		transition: opacity 0.3s ease, filter 0.3s ease;
	}

	${media.smallDesktopAndBelow`
		cursor: default;
	`}

	${media.mobileOnly`
		cursor: default;
	`}
`;

FloatingParallaxScrollStyles.FloatingItem = styled.div`
	position: absolute;
	user-select: none;
	pointer-events: auto;
	will-change: transform;
	cursor: pointer;

	&.expanded {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) !important;
		z-index: 10000;
		transition: all 0.5s ease;
		pointer-events: auto;
		
		img {
			opacity: 1 !important;
			filter: grayscale(0%) !important;
		}
	}
`;

FloatingParallaxScrollStyles.ImageContainer = styled.div`
	background: transparent;
	padding: 0;
	border-radius: 0;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	border: none;
	transition: box-shadow 0.3s ease;

	&:hover {
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
	}

	${media.mobileOnly`
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	`}
`;

FloatingParallaxScrollStyles.Image = styled.img`
	max-width: 400px;
	max-height: 600px;
	width: auto;
	height: auto;
	object-fit: contain;
	border-radius: 0;
	display: block;
	transition: all 0.3s ease;

	.expanded & {
		max-height: calc(100vh - 160px);
		max-width: 90vw;
		height: auto;
		width: auto;
	}

	${media.tabletPortraitAndBelow`
		max-width: 300px;
		max-height: 450px;
	`}

	${media.mobileOnly`
		max-width: 240px;
		max-height: 360px;
	`}
`;

// Instructions removed as requested

FloatingParallaxScrollStyles.Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.9);
	z-index: 9999;
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.4s ease;

	&.visible {
		opacity: 1;
		pointer-events: auto;
	}
`;

export default FloatingParallaxScrollStyles;
