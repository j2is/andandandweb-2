"use client";

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const TextContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1000;
  font-family: 'Courier New', Courier, monospace;
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

const SvgElement = styled.img`
  position: absolute;
  user-select: none;
  will-change: transform;
  pointer-events: none;
  opacity: 1; /* Ensure full opacity */
  
  &.following {
    transition: none; /* Remove transition for immediate mouse following */
  }
  
  &.animating {
    transition: transform 2s ease-out;
    opacity: 1; /* Maintain full opacity during animation */
  }
`;

export default function MouseFollowText({
	isPortraitScaling = false,
	portraitCorners = null,
	onAnimationComplete = () => { }
}) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [textPositions, setTextPositions] = useState({
		and1: { x: 0, y: 0 },      // Top-left
		and2: { x: 30, y: 0 },     // Top-right  
		and3: { x: 0, y: 20 },     // Bottom-left
		studio: { x: 30, y: 20 }   // Bottom-right
	});
	const [isAnimating, setIsAnimating] = useState(false);
	const [showSvgs, setShowSvgs] = useState(false);
	const animationTimeoutRef = useRef(null);

	// Handle mouse movement with throttling for better performance
	useEffect(() => {
		let rafId = null;

		const handleMouseMove = (e) => {
			if (!isPortraitScaling && !isAnimating) {
				if (rafId) {
					cancelAnimationFrame(rafId);
				}
				rafId = requestAnimationFrame(() => {
					setMousePosition({ x: e.clientX, y: e.clientY });
				});
			}
		};

		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
		};
	}, [isPortraitScaling, isAnimating]);

	// Update SVG positions when not scaling - 2x2 grid layout
	useEffect(() => {
		if (!isPortraitScaling && !isAnimating) {
			setTextPositions({
				and1: { x: mousePosition.x - 32, y: mousePosition.y - 20 },    // Top-left: And.svg (21px wide)
				and2: { x: mousePosition.x - 10, y: mousePosition.y - 20 },    // Top-right: And.svg
				and3: { x: mousePosition.x - 32, y: mousePosition.y - 8 },     // Bottom-left: And.svg
				studio: { x: mousePosition.x - 10, y: mousePosition.y - 8 }    // Bottom-right: Studio.svg (42px wide)
			});
		}
	}, [mousePosition, isPortraitScaling, isAnimating]);

	// Handle portrait scaling animation and real-time corner updates
	useEffect(() => {
		if (isPortraitScaling && portraitCorners) {
			setIsAnimating(true);

			// After 2 seconds (portrait scaling duration), reunite and follow mouse
			if (animationTimeoutRef.current) {
				clearTimeout(animationTimeoutRef.current);
			}

			animationTimeoutRef.current = setTimeout(() => {
				setIsAnimating(false);
				onAnimationComplete();
			}, 2000);
		}
	}, [isPortraitScaling, onAnimationComplete]);

	// Always show SVGs (during mouse movement and scaling)
	useEffect(() => {
		setShowSvgs(true);
	}, []);

	// Update SVG positions in real-time during scaling animation
	useEffect(() => {
		if (isPortraitScaling && portraitCorners) {
			console.log('Portrait corners:', portraitCorners); // Debug log

			// Position SVG elements so specific corners align with portrait corners
			setTextPositions({
				// Top-left And: bottom-right corner of SVG aligns with top-left of image
				// SVG (21x8) positioned so its bottom-right (21,8) touches image top-left
				and1: { x: portraitCorners.topLeft.x - 21, y: portraitCorners.topLeft.y - 8 },

				// Top-right And: bottom-left corner of SVG aligns with top-right of image  
				// SVG (21x8) positioned so its bottom-left (0,8) touches image top-right
				and2: { x: portraitCorners.topRight.x, y: portraitCorners.topRight.y - 8 },

				// Bottom-left And: top-right corner of SVG aligns with bottom-left of image
				// SVG (21x8) positioned so its top-right (21,0) touches image bottom-left
				and3: { x: portraitCorners.bottomLeft.x - 21, y: portraitCorners.bottomLeft.y },

				// Bottom-right Studio: top-left corner of SVG aligns with bottom-right of image
				// SVG (42x8) positioned so its top-left (0,0) touches image bottom-right
				studio: { x: portraitCorners.bottomRight.x, y: portraitCorners.bottomRight.y }
			});
		}
	}, [portraitCorners, isPortraitScaling]);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (animationTimeoutRef.current) {
				clearTimeout(animationTimeoutRef.current);
			}
		};
	}, []);

	return (
		<TextContainer>
			{showSvgs && (
				<>
					<SvgElement
						src="/images/And.svg"
						alt="And"
						width={21}
						height={8}
						className={isAnimating ? 'animating' : 'following'}
						style={{
							transform: `translate3d(${textPositions.and1.x}px, ${textPositions.and1.y}px, 0)`
						}}
					/>
					<SvgElement
						src="/images/And.svg"
						alt="And"
						width={21}
						height={8}
						className={isAnimating ? 'animating' : 'following'}
						style={{
							transform: `translate3d(${textPositions.and2.x}px, ${textPositions.and2.y}px, 0)`
						}}
					/>
					<SvgElement
						src="/images/And.svg"
						alt="And"
						width={21}
						height={8}
						className={isAnimating ? 'animating' : 'following'}
						style={{
							transform: `translate3d(${textPositions.and3.x}px, ${textPositions.and3.y}px, 0)`
						}}
					/>
					<SvgElement
						src="/images/Studio.svg"
						alt="Studio"
						width={42}
						height={8}
						className={isAnimating ? 'animating' : 'following'}
						style={{
							transform: `translate3d(${textPositions.studio.x}px, ${textPositions.studio.y}px, 0)`
						}}
					/>
				</>
			)}
		</TextContainer>
	);
}
