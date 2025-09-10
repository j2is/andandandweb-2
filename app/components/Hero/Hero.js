"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import HeroStyles from "./Hero.styled";
import { Canvas } from '../Canvas'
import MouseFollowText from '../MouseFollowText'
import loadImageUrl from '@/lib/loadImageUrl'
import { motion, animate } from 'framer-motion';;

export default function Hero() {
	// Image pairs array - memoized to prevent recreation on every render
	const imagePairs = useMemo(() => [
		{
			portrait: '/images/test-portrait.jpg',
			landscape: '/images/test-landscape.jpg'
		},
		{
			portrait: '/images/test-portrait-2.jpg',
			landscape: '/images/test-landscape-2.jpg'
		},
		{
			portrait: '/images/test-portrait-3.jpg',
			landscape: '/images/test-landscape-3.jpg'
		}
	], []);

	const portraitImages = useRef([]);
	const landscapeImages = useRef([]);
	const hasLoaded = useRef(false);
	const canvasOpacity = useRef(1);
	const [clickCount, setClickCount] = useState(0);
	const [currentPairIndex, setCurrentPairIndex] = useState(0);
	const renderedImages = useRef([]);
	const [isPortraitScaling, setIsPortraitScaling] = useState(false);
	const [portraitCorners, setPortraitCorners] = useState(null);

	const portraitSettings = useRef({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		opacity: 1,
		scale: 0, // Start at 0 for scale animation
		visible: false,
		isBlackWhite: false,
		isFadingOut: false,
		scaleOriginX: 0, // Scale origin point
		scaleOriginY: 0,
	});

	const landscapeSettings = useRef({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		opacity: 0, // Start at 0 for fade in animation
		scale: 1,
		visible: false,
		isBlackWhite: false,
		isFadingOut: false,
	});

	// Store previous images for fade out animation
	const previousImages = useRef([]);

	// Helper function to calculate image dimensions that fit within constraints
	const calculateImageDimensions = useCallback((imageWidth, imageHeight, maxWidth, maxHeight, imageType) => {
		const aspectRatio = imageWidth / imageHeight;

		// Apply specific width constraints based on image type
		let constrainedMaxWidth = maxWidth;
		const viewportW = window.innerWidth;
		const portraitWidth = Math.min(viewportW, 289 / 1440 * viewportW);
		const landscapeWidth = Math.min(viewportW, 620 / 1440 * viewportW);
		if (imageType === 'portrait') {
			constrainedMaxWidth = Math.min(maxWidth, portraitWidth);
		} else if (imageType === 'landscape') {
			constrainedMaxWidth = Math.min(maxWidth, landscapeWidth);
		}

		let width = Math.min(imageWidth, constrainedMaxWidth);
		let height = width / aspectRatio;

		if (height > maxHeight) {
			height = maxHeight;
			width = height * aspectRatio;
		}

		return { width, height };
	}, []);

	// Helper function to find a non-overlapping position for an image
	const findNonOverlappingPosition = useCallback((imageWidth, imageHeight, clickX, clickY, imageType) => {
		const margin = 80; // Distance from edges
		const spacing = 100; // Distance between images
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Calculate max dimensions considering margins
		const maxWidth = viewportWidth - (margin * 2);
		const maxHeight = viewportHeight - (margin * 2);

		// Calculate actual image dimensions
		const dimensions = calculateImageDimensions(imageWidth, imageHeight, maxWidth, maxHeight, imageType);

		// Position image based on click point and available space
		let x, y;

		// Check if we can use click as top-left corner
		if (clickX + dimensions.width <= viewportWidth - margin &&
			clickY + dimensions.height <= viewportHeight - margin) {
			// Use click point as top-left corner
			x = Math.max(margin, clickX);
			y = Math.max(margin, clickY);
		} else {
			// Need to reposition - determine which corner the click should represent
			const spaceRight = viewportWidth - margin - clickX;
			const spaceBelow = viewportHeight - margin - clickY;

			if (spaceRight >= dimensions.width && spaceBelow < dimensions.height) {
				// Use click as bottom-left corner (enough space right, not below)
				x = Math.max(margin, clickX);
				y = Math.max(margin, clickY - dimensions.height);
			} else if (spaceRight < dimensions.width && spaceBelow >= dimensions.height) {
				// Use click as top-right corner (enough space below, not right)
				x = Math.max(margin, clickX - dimensions.width);
				y = Math.max(margin, clickY);
			} else if (spaceRight < dimensions.width && spaceBelow < dimensions.height) {
				// Use click as bottom-right corner (not enough space right or below)
				x = Math.max(margin, clickX - dimensions.width);
				y = Math.max(margin, clickY - dimensions.height);
			} else {
				// Default fallback - use as top-left with bounds checking
				x = Math.max(margin, Math.min(clickX, viewportWidth - margin - dimensions.width));
				y = Math.max(margin, Math.min(clickY, viewportHeight - margin - dimensions.height));
			}
		}

		// Check for overlaps with existing images and adjust if necessary
		let attempts = 0;
		while (attempts < 10) {
			let hasOverlap = false;

			for (const existingImage of renderedImages.current) {
				if (existingImage.visible) {
					// Check if rectangles overlap (with spacing buffer)
					if (!(x + dimensions.width + spacing < existingImage.x ||
						x > existingImage.x + existingImage.width + spacing ||
						y + dimensions.height + spacing < existingImage.y ||
						y > existingImage.y + existingImage.height + spacing)) {
						hasOverlap = true;
						break;
					}
				}
			}

			if (!hasOverlap) {
				break;
			}

			// If overlap detected, try alternative positions
			if (attempts < 5) {
				// Try moving right
				x += dimensions.width + spacing;
				if (x + dimensions.width > viewportWidth - margin) {
					x = margin;
					y += dimensions.height + spacing;
				}
			} else {
				// Try moving left
				x -= dimensions.width + spacing;
				if (x < margin) {
					x = viewportWidth - margin - dimensions.width;
					y += dimensions.height + spacing;
				}
			}

			// Keep within bounds
			y = Math.max(margin, Math.min(y, viewportHeight - margin - dimensions.height));
			attempts++;
		}

		return { x, y, width: dimensions.width, height: dimensions.height };
	}, [calculateImageDimensions]);

	// Helper function to find position for landscape image exactly 100px from portrait
	const findLandscapePosition = useCallback((imageWidth, imageHeight, imageType, clickX) => {
		const margin = 80; // Distance from edges
		const spacing = 100; // Exact distance from portrait
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Get portrait position and dimensions
		const portrait = portraitSettings.current;
		if (!portrait.visible) return null;

		// Calculate viewport midpoint
		const viewportMidpoint = viewportWidth / 2;

		// Determine side based on click position relative to midpoint
		// Click left of midpoint -> place landscape on right
		// Click right of midpoint -> place landscape on left
		const useRightSide = clickX < viewportMidpoint;

		// Calculate position based on chosen side
		let x, y;
		let availableWidth, availableHeight;

		if (useRightSide) {
			// Position on right side
			x = portrait.x + portrait.width + spacing;
			y = portrait.y;
			availableWidth = viewportWidth - margin - x;
			availableHeight = viewportHeight - (margin * 2);
		} else {
			// Position on left side
			availableWidth = portrait.x - spacing - margin;
			availableHeight = viewportHeight - (margin * 2);
			y = portrait.y;
			// x will be calculated after we know the image width
		}

		// Calculate dimensions that fit in available space
		const dimensions = calculateImageDimensions(imageWidth, imageHeight, availableWidth, availableHeight, imageType);

		// Set final x position for left side
		if (!useRightSide) {
			x = portrait.x - spacing - dimensions.width;
		}

		// Check if position is within viewport bounds
		if (x >= margin &&
			y >= margin &&
			x + dimensions.width <= viewportWidth - margin &&
			y + dimensions.height <= viewportHeight - margin) {

			return {
				x: x,
				y: y,
				width: dimensions.width,
				height: dimensions.height
			};
		}

		// Fallback: try the other side if chosen side doesn't work
		const fallbackRightSide = !useRightSide;

		if (fallbackRightSide) {
			// Try right side as fallback
			x = portrait.x + portrait.width + spacing;
			availableWidth = viewportWidth - margin - x;
		} else {
			// Try left side as fallback
			availableWidth = portrait.x - spacing - margin;
		}

		const fallbackDimensions = calculateImageDimensions(imageWidth, imageHeight, availableWidth, availableHeight, imageType);

		if (!fallbackRightSide) {
			x = portrait.x - spacing - fallbackDimensions.width;
		}

		// Final fallback: scale down significantly if still doesn't fit
		if (x < margin || x + fallbackDimensions.width > viewportWidth - margin) {
			const smallDimensions = calculateImageDimensions(
				imageWidth,
				imageHeight,
				Math.min(availableWidth * 0.5, 620),
				Math.min(availableHeight * 0.5, 400),
				imageType
			);

			x = useRightSide ?
				portrait.x + portrait.width + spacing :
				portrait.x - spacing - smallDimensions.width;

			return {
				x: Math.max(margin, Math.min(x, viewportWidth - margin - smallDimensions.width)),
				y: Math.max(margin, portrait.y),
				width: smallDimensions.width,
				height: smallDimensions.height
			};
		}

		return {
			x: x,
			y: y,
			width: fallbackDimensions.width,
			height: fallbackDimensions.height
		};
	}, [calculateImageDimensions]);

	const drawImageWithEffects = (context, imageRef, settings) => {
		context.save();

		// Apply opacity
		context.globalAlpha = settings.opacity;

		// Apply black and white filter if needed
		if (settings.isBlackWhite) {
			context.filter = 'grayscale(100%)';
		}

		// Calculate scaled dimensions and position for scaling animation
		const scaledWidth = settings.width * settings.scale;
		const scaledHeight = settings.height * settings.scale;

		// Calculate scaling position based on origin point (for corner scaling)
		let scaledX, scaledY;
		if (settings.scaleOriginX !== undefined && settings.scaleOriginY !== undefined) {
			// Scale from specific origin point (clicked corner)
			scaledX = settings.scaleOriginX - (scaledWidth * (settings.scaleOriginX - settings.x) / settings.width);
			scaledY = settings.scaleOriginY - (scaledHeight * (settings.scaleOriginY - settings.y) / settings.height);
		} else {
			// Default: scale from center
			scaledX = settings.x + (settings.width - scaledWidth) / 2;
			scaledY = settings.y + (settings.height - scaledHeight) / 2;
		}

		context.drawImage(
			imageRef,
			scaledX,
			scaledY,
			scaledWidth,
			scaledHeight
		);

		context.restore();
	};

	const draw = (context, frameCount) => {
		if (!hasLoaded.current) return;
		const dpr = window.devicePixelRatio || 1;
		context.scale(dpr, dpr);
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		// Draw previous images that are fading out
		previousImages.current.forEach(imageData => {
			if (imageData.visible) {
				const imageRef = imageData.type === 'portrait' ?
					portraitImages.current[imageData.pairIndex] :
					landscapeImages.current[imageData.pairIndex];
				if (imageRef) {
					drawImageWithEffects(context, imageRef, imageData);
				}
			}
		});

		// Draw current portrait image if visible
		if (portraitSettings.current.visible && portraitImages.current[currentPairIndex]) {
			drawImageWithEffects(context, portraitImages.current[currentPairIndex], portraitSettings.current);
		}

		// Draw current landscape image if visible
		if (landscapeSettings.current.visible && landscapeImages.current[currentPairIndex]) {
			drawImageWithEffects(context, landscapeImages.current[currentPairIndex], landscapeSettings.current);
		}

		context.scale(1 / dpr, 1 / dpr);
	};

	const loadImages = useCallback(async () => {
		try {
			// Load all image pairs
			for (let i = 0; i < imagePairs.length; i++) {
				const portraitImg = await loadImageUrl(imagePairs[i].portrait);
				const landscapeImg = await loadImageUrl(imagePairs[i].landscape);

				portraitImages.current[i] = portraitImg;
				landscapeImages.current[i] = landscapeImg;
			}

			hasLoaded.current = true;
			console.log('All image pairs loaded:', imagePairs.length);
		} catch (error) {
			console.log('Error loading images:', error);
		}
	}, [imagePairs]);

	useEffect(() => {
		loadImages();
	}, [loadImages]);

	const animatePortraitScale = useCallback(() => {
		// Animate portrait scale from 0 to 1 over 2 seconds
		setIsPortraitScaling(true);

		animate(0, 1, {
			duration: 0.8,
			ease: "easeOut",
			onUpdate: (value) => {
				portraitSettings.current.scale = value;

				// Update portrait corners in real-time during scaling
				const currentSettings = portraitSettings.current;
				if (currentSettings.visible) {
					// Calculate current scaled dimensions
					const scaledWidth = currentSettings.width * value;
					const scaledHeight = currentSettings.height * value;

					// Calculate current position (scaled from origin)
					let currentX, currentY;
					if (currentSettings.scaleOriginX !== undefined && currentSettings.scaleOriginY !== undefined) {
						// Scale from the origin point (clicked corner)
						const originToLeftRatio = (currentSettings.scaleOriginX - currentSettings.x) / currentSettings.width;
						const originToTopRatio = (currentSettings.scaleOriginY - currentSettings.y) / currentSettings.height;

						currentX = currentSettings.scaleOriginX - (scaledWidth * originToLeftRatio);
						currentY = currentSettings.scaleOriginY - (scaledHeight * originToTopRatio);
					} else {
						// Default: scale from center
						currentX = currentSettings.x + (currentSettings.width - scaledWidth) / 2;
						currentY = currentSettings.y + (currentSettings.height - scaledHeight) / 2;
					}

					// Update corners for text positioning
					const updatedCorners = {
						topLeft: { x: currentX, y: currentY },
						topRight: { x: currentX + scaledWidth, y: currentY },
						bottomLeft: { x: currentX, y: currentY + scaledHeight },
						bottomRight: { x: currentX + scaledWidth, y: currentY + scaledHeight }
					};

					console.log('Scale value:', value, 'Updated corners:', updatedCorners); // Debug log
					setPortraitCorners(updatedCorners);
				}
			},
			onComplete: () => {
				setIsPortraitScaling(false);
			}
		});
	}, []);

	const animateLandscapeFadeIn = useCallback(() => {
		// Animate landscape opacity from 0 to 1 over 300ms
		animate(0, 1, {
			duration: 0.3,
			ease: "easeOut",
			onUpdate: (value) => {
				landscapeSettings.current.opacity = value;
			}
		});
	}, []);

	const animateOldImagesFadeOut = useCallback(() => {
		// Move current images to previous images array
		if (portraitSettings.current.visible) {
			previousImages.current.push({
				...portraitSettings.current,
				type: 'portrait',
				pairIndex: currentPairIndex
			});
		}
		if (landscapeSettings.current.visible) {
			previousImages.current.push({
				...landscapeSettings.current,
				type: 'landscape',
				pairIndex: currentPairIndex
			});
		}

		// Animate previous images to black and white and 10% opacity
		previousImages.current.forEach(imageData => {
			imageData.isBlackWhite = true;
			animate(imageData.opacity, 0.1, {
				duration: 0.3,
				ease: "easeOut",
				onUpdate: (value) => {
					imageData.opacity = value;
				}
			});
		});

		// After 800ms, fade out the old images completely
		setTimeout(() => {
			previousImages.current.forEach(imageData => {
				imageData.isFadingOut = true;
				animate(imageData.opacity, 0, {
					duration: 0.3,
					ease: "easeOut",
					onUpdate: (value) => {
						imageData.opacity = value;
					},
					onComplete: () => {
						// Remove from array when animation complete
						previousImages.current = previousImages.current.filter(img => img !== imageData);
					}
				});
			});
		}, 2000);
	}, [currentPairIndex]);

	const clearCanvas = useCallback(() => {
		// Animate old images fade out if any exist
		if (portraitSettings.current.visible || landscapeSettings.current.visible) {
			animateOldImagesFadeOut();
		}

		// Reset portrait settings
		portraitSettings.current = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			opacity: 1,
			scale: 0, // Start at 0 for scale animation
			visible: false,
			isBlackWhite: false,
			isFadingOut: false,
			scaleOriginX: 0,
			scaleOriginY: 0,
		};

		// Reset landscape settings
		landscapeSettings.current = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			opacity: 0, // Start at 0 for fade in animation
			scale: 1,
			visible: false,
			isBlackWhite: false,
			isFadingOut: false,
		};

		// Clear rendered images tracking
		renderedImages.current = [];

		// Reset click count
		setClickCount(0);
	}, [animateOldImagesFadeOut]);

	const onClick = useCallback((e) => {
		if (!hasLoaded.current) return;

		// Clear canvas and start new composition
		clearCanvas();

		const clickX = e.clientX;
		const clickY = e.clientY;
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Cycle to next image pair
		const nextPairIndex = (currentPairIndex + 1) % imagePairs.length;
		setCurrentPairIndex(nextPairIndex);

		console.log(`Switching to image pair ${nextPairIndex + 1}/${imagePairs.length}`);

		// Position portrait image at click location using current pair
		const currentPortrait = portraitImages.current[nextPairIndex];
		if (!currentPortrait) {
			console.log('Portrait image not loaded for pair', nextPairIndex);
			return;
		}

		const position = findNonOverlappingPosition(
			currentPortrait.naturalWidth,
			currentPortrait.naturalHeight,
			clickX,
			clickY,
			'portrait'
		);

		// Determine scale origin based on which corner the click represents
		let scaleOriginX, scaleOriginY;

		// Check how the image was positioned relative to the click
		if (clickX + position.width <= viewportWidth - 80 &&
			clickY + position.height <= viewportHeight - 80 &&
			position.x === Math.max(80, clickX) &&
			position.y === Math.max(80, clickY)) {
			// Click was used as top-left corner
			scaleOriginX = clickX;
			scaleOriginY = clickY;
		} else {
			// Image was repositioned - determine which corner click represents
			const spaceRight = viewportWidth - 80 - clickX;
			const spaceBelow = viewportHeight - 80 - clickY;

			if (spaceRight >= position.width && spaceBelow < position.height) {
				// Click represents bottom-left corner
				scaleOriginX = clickX;
				scaleOriginY = clickY;
			} else if (spaceRight < position.width && spaceBelow >= position.height) {
				// Click represents top-right corner
				scaleOriginX = clickX;
				scaleOriginY = clickY;
			} else if (spaceRight < position.width && spaceBelow < position.height) {
				// Click represents bottom-right corner
				scaleOriginX = clickX;
				scaleOriginY = clickY;
			} else {
				// Fallback - scale from actual position based on viewport half
				if (clickY < viewportHeight / 2) {
					scaleOriginX = position.x;
					scaleOriginY = position.y;
				} else {
					scaleOriginX = position.x;
					scaleOriginY = position.y + position.height;
				}
			}
		}

		portraitSettings.current = {
			...portraitSettings.current,
			...position,
			visible: true,
			scaleOriginX: scaleOriginX,
			scaleOriginY: scaleOriginY,
		};

		// Add to rendered images for overlap checking
		renderedImages.current.push({
			...position,
			visible: true,
			type: 'portrait'
		});

		setClickCount(1);

		// Calculate portrait corners for text positioning
		const corners = {
			topLeft: { x: position.x, y: position.y },
			topRight: { x: position.x + position.width, y: position.y },
			bottomLeft: { x: position.x, y: position.y + position.height },
			bottomRight: { x: position.x + position.width, y: position.y + position.height }
		};
		setPortraitCorners(corners);

		// Start portrait scale animation
		animatePortraitScale();

		// After portrait scaling completes, automatically position landscape image
		setTimeout(() => {
			const currentLandscape = landscapeImages.current[nextPairIndex];
			if (!currentLandscape) {
				console.log('Landscape image not loaded for pair', nextPairIndex);
				return;
			}

			const landscapePosition = findLandscapePosition(
				currentLandscape.naturalWidth,
				currentLandscape.naturalHeight,
				'landscape',
				clickX
			);

			if (landscapePosition) {
				landscapeSettings.current = {
					...landscapeSettings.current,
					...landscapePosition,
					visible: true,
				};

				// Add to rendered images for overlap checking
				renderedImages.current.push({
					...landscapePosition,
					visible: true,
					type: 'landscape'
				});

				// Start landscape fade in animation
				animateLandscapeFadeIn();

				setClickCount(2);
			}
		}, 800); // 2 second delay - matches portrait scale duration
	}, [clearCanvas, findNonOverlappingPosition, findLandscapePosition, animatePortraitScale, animateLandscapeFadeIn, currentPairIndex, imagePairs.length]);

	const handleTextAnimationComplete = useCallback(() => {
		// Text has finished animating and returned to following mouse
		console.log('Text animation complete');
	}, []);

	return (
		<HeroStyles onClick={onClick}>
			<Canvas draw={draw} />
			{/* <MouseFollowText
				isPortraitScaling={isPortraitScaling}
				portraitCorners={portraitCorners}
				onAnimationComplete={handleTextAnimationComplete}
			/> */}
		</HeroStyles>
	);
}
