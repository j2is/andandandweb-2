"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import FloatingParallaxScrollStyles from "./FloatingParallaxScroll.styled";

// All images from the provided folders
const imageContent = [
	// Folder 1 - Century City
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_Card_0072.jpg", alt: "Century City Card" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10354.jpg", alt: "Century City 1" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10336.jpg", alt: "Century City 2" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10321.jpg", alt: "Century City 3" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10308_version.jpg", alt: "Century City 4" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10294.jpg", alt: "Century City 5" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10279.jpg", alt: "Century City 6" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10245.jpg", alt: "Century City 7" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10240.jpg", alt: "Century City 8" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10224.jpg", alt: "Century City 9" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10218.jpg", alt: "Century City 10" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10175.jpg", alt: "Century City 11" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10157.jpg", alt: "Century City 12" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10149.jpg", alt: "Century City 13" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10131.jpg", alt: "Century City 14" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10107.jpg", alt: "Century City 15" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10099_e_R1 copy_FLAT.jpg", alt: "Century City 16" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10081.jpg", alt: "Century City 17" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10071.jpg", alt: "Century City 18" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10062.jpg", alt: "Century City 19" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10048.jpg", alt: "Century City 20" },
	{ type: "image", src: "/images/1/AndAndAnd_CenturyCity_10034.jpg", alt: "Century City 21" },

	// Folder 2 - Cathead Bay
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0524_01_QC.jpg", alt: "Cathead Bay 1" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0503_01_QC.jpg", alt: "Cathead Bay 2" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0497_01_QC.jpg", alt: "Cathead Bay 3" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0493_01_QC.jpg", alt: "Cathead Bay 4" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0473.jpg", alt: "Cathead Bay 5" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0453.jpg", alt: "Cathead Bay 6" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0445B.jpg", alt: "Cathead Bay 7" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0432_01_QC+.jpg", alt: "Cathead Bay 8" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0421.jpg", alt: "Cathead Bay 9" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0406.jpg", alt: "Cathead Bay 10" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0388_01_QC+ .jpg", alt: "Cathead Bay 11" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0372_01B_QC.jpg", alt: "Cathead Bay 12" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0363.jpg", alt: "Cathead Bay 13" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0347_01_QC.jpg", alt: "Cathead Bay 14" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0321_01_QC+.jpg", alt: "Cathead Bay 15" },
	{ type: "image", src: "/images/2/AndAndAnd_Cathead_Bay_02032025_0307_01_QC+.jpg", alt: "Cathead Bay 16" },

	// Folder 3 - Serrano
	{ type: "image", src: "/images/3/AndAndAnd_Serrano_02182024_0388_02_QC.jpg", alt: "Serrano 1" },
	{ type: "image", src: "/images/3/AndAndAnd_Serrano_02182024_0374_02_QC.jpg", alt: "Serrano 2" },
	{ type: "image", src: "/images/3/AndAndAnd_Serrano_02182024_0358_01_QC.jpg", alt: "Serrano 3" },
	{ type: "image", src: "/images/3/AndAndAnd_Serrano_02182024_0349_02_QC_Option.jpg", alt: "Serrano 4" },
	{ type: "image", src: "/images/3/AndAndAnd_Serrano_02182024_0338_01_QC.jpg", alt: "Serrano 5" },
	{ type: "image", src: "/images/3/AndAndAnd_Serrano_02182024_0335_02_QC.jpg", alt: "Serrano 6" },
	{ type: "image", src: "/images/3/AndAndAnd_Serrano_02182024_0312.jpg", alt: "Serrano 7" },
	{ type: "image", src: "/images/3/AndAndAnd_Serrano_02182024_0305.jpg", alt: "Serrano 8" },
	{ type: "image", src: "/images/3/AndAndAnd_Serrano_02182024_0286_01_QC.jpg", alt: "Serrano 9" },
	{ type: "image", src: "/images/3/AndAndAnd_Serrano_02182024_0276_01_QC.jpg", alt: "Serrano 10" },
	{ type: "image", src: "/images/3/AndAndAnd_Serrano_02182024_0265_01_QC.jpg", alt: "Serrano 11" },
	{ type: "image", src: "/images/3/AndAndAnd_Serrano_02182024_0242_01_QC.jpg", alt: "Serrano 12" },

	// Folder 4 - Allenwood
	{ type: "image", src: "/images/4/AndAndAnd_Allenwood_Rd_02112025_0343_v2C.jpg", alt: "Allenwood 1" },
	{ type: "image", src: "/images/4/AndAndAnd_Allenwood_Rd_02112025_0326_v3.jpg", alt: "Allenwood 2" },
	{ type: "image", src: "/images/4/AndAndAnd_Allenwood_Rd_02112025_0311_v3.jpg", alt: "Allenwood 3" },
	{ type: "image", src: "/images/4/AndAndAnd_Allenwood_Rd_02112025_0303_v1.jpg", alt: "Allenwood 4" },
	{ type: "image", src: "/images/4/AndAndAnd_Allenwood_Rd_02112025_0284_v1.jpg", alt: "Allenwood 5" },
	{ type: "image", src: "/images/4/AndAndAnd_Allenwood_Rd_02112025_0266_v2.jpg", alt: "Allenwood 6" },
	{ type: "image", src: "/images/4/AndAndAnd_Allenwood_Rd_02112025_0245_v1.jpg", alt: "Allenwood 7" },
	{ type: "image", src: "/images/4/AndAndAnd_Allenwood_Rd_02112025_0228_v2.jpg", alt: "Allenwood 8" },
	{ type: "image", src: "/images/4/AndAndAnd_Allenwood_Rd_02112025_0213_v1_light.jpg", alt: "Allenwood 9" },
	{ type: "image", src: "/images/4/AndAndAnd_Allenwood_Rd_02112025_0188_v2.jpg", alt: "Allenwood 10" },
	{ type: "image", src: "/images/4/AndAndAnd_Allenwood_Rd_02112025_0180_v2.jpg", alt: "Allenwood 11" },
	{ type: "image", src: "/images/4/AndAndAnd_Allenwood_Rd_02112025_0171_v2.jpg", alt: "Allenwood 12" },

	// Folder 5 - Mixed Collection
	{ type: "image", src: "/images/5/AndAndAnd_10242024_0450_V2.jpg", alt: "Collection 1" },
	{ type: "image", src: "/images/5/AndAndAnd_10242024_0363_V2_Contrast-b.jpg", alt: "Collection 2" },
	{ type: "image", src: "/images/5/AndAndAnd_10242024_0363_V2_Contrast-a.jpg", alt: "Collection 3" },
	{ type: "image", src: "/images/5/AndAndAnd_10242024_0363_V2-b.jpg", alt: "Collection 4" },
	{ type: "image", src: "/images/5/AndAndAnd_10242024_0363_V2-a.jpg", alt: "Collection 5" },
	{ type: "image", src: "/images/5/AndAndAnd_10242024_0350_V2.jpg", alt: "Collection 6" },
	{ type: "image", src: "/images/5/AndAndAnd_09062024_0471_V2.jpg", alt: "Collection 7" },
	{ type: "image", src: "/images/5/AndAndAnd_09062024_0455_V2.jpg", alt: "Collection 8" },
	{ type: "image", src: "/images/5/AndAndAnd_09062024_0430_V2.jpg", alt: "Collection 9" },
	{ type: "image", src: "/images/5/AndAndAnd_09062024_0369_V2.jpg", alt: "Collection 10" },
	{ type: "image", src: "/images/5/AndAndAnd_09062024_0357_V2.jpg", alt: "Collection 11" },
	{ type: "image", src: "/images/5/AndAndAnd_09062024_0346_V2.jpg", alt: "Collection 12" }
];

export default function FloatingParallaxScroll() {
	const [items, setItems] = useState([]);
	const [wind, setWind] = useState({ x: 0, y: -0.3 });
	const [scroll, setScroll] = useState({ x: 0, y: 0 });
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [targetOffset, setTargetOffset] = useState({ x: 0, y: 0 });
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [fieldHeight, setFieldHeight] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);
	const [expandedItem, setExpandedItem] = useState(null);

	const containerRef = useRef(null);
	const animationRef = useRef(null);
	const lastCycleRef = useRef(null);
	const scrollTimeoutRef = useRef(null);

	// Utility functions
	const convertToRange = (value, srcRange, dstRange) => {
		if (value < srcRange[0]) return dstRange[0];
		if (value > srcRange[1]) return dstRange[1];

		const srcMax = srcRange[1] - srcRange[0];
		const dstMax = dstRange[1] - dstRange[0];
		const adjValue = value - srcRange[0];
		return (adjValue * dstMax / srcMax) + dstRange[0];
	};

	// Interpolation function matching original project
	const interpolate = (part, goalPos, currentLerp, lerpSpeed) => {
		if (part !== goalPos) {
			currentLerp = 0;
		}
		if (currentLerp <= 1.0) {
			currentLerp += lerpSpeed;
		}
		return lerp(part, currentLerp, goalPos);
	};

	const lerp = (x, t, y) => {
		return x * (1 - t) + y * t;
	};

	const simpleInterpolate = (current, target, speed = 0.01) => {
		return current + (target - current) * speed;
	};

	// Create floating items
	const createFloatingItem = useCallback((content, index) => {
		const isMobile = dimensions.width <= 768;
		const isTablet = dimensions.width <= 1024;

		let zOffset;
		if (Math.random() > 0.44) {
			zOffset = Math.random() * 8 + 4;
		} else if (Math.random() > 0.6) {
			zOffset = Math.random() * 5 + 15;
		} else {
			zOffset = Math.random() * 6;
		}

		let scale;
		if (isMobile) {
			scale = convertToRange(zOffset, [0, 20], [0.44, 1.5]);
		} else if (isTablet) {
			scale = convertToRange(zOffset, [0, 20], [0.4, 1.2]);
		} else {
			scale = convertToRange(zOffset, [0, 20], [0.3, 0.8]);
		}

		const mass = isMobile ? (scale / 11) * 40 : (scale / 7) * 15;
		const pixWidth = (dimensions.width / 2) * scale;

		let x = Math.floor((Math.random() * dimensions.width) - pixWidth / 2);
		if (zOffset > 18) {
			x = Math.random() > 0.5
				? (Math.random() * pixWidth) * -1
				: dimensions.width - Math.random() * pixWidth;
		}

		// Distribute items across the entire virtual field height
		const y = (index / imageContent.length) * fieldHeight;

		return {
			...content,
			id: index,
			position: { x, y },
			velocity: { x: 0, y: 0 },
			acceleration: { x: 0, y: 0 },
			scale,
			mass,
			targetMass: mass,
			lerpMass: mass,
			zIndex: Math.floor(zOffset),
			opacity: zOffset <= 6 ? convertToRange(zOffset, [0, 6], [0.5, 1]) : 1,
			isMouseOver: false,
			isExpanded: false,
		};
	}, [dimensions, fieldHeight]);

	// Initialize items
	useEffect(() => {
		if (dimensions.width && dimensions.height && fieldHeight > 0) {
			const newItems = imageContent.map((content, index) =>
				createFloatingItem(content, index)
			);
			setItems(newItems);
		}
	}, [dimensions, fieldHeight, createFloatingItem]);

	// Handle resize
	useEffect(() => {
		const handleResize = () => {
			const w = window.innerWidth;
			const h = window.innerHeight;
			const isMobile = w <= 768;

			setDimensions({ width: w, height: h });
			// Calculate field height - the virtual canvas size
			const newFieldHeight = h * (isMobile ? 3.5 : 9);
			setFieldHeight(newFieldHeight);
			console.log(`Field height: ${newFieldHeight}px (screen: ${h}px, multiplier: ${isMobile ? 3.5 : 9})`);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
			if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
		};
	}, []);

	// Handle keyboard events
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && expandedItem) {
				setExpandedItem(null);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [expandedItem]);

	// Mouse move handler
	const handleMouseMove = useCallback((e) => {
		if (dimensions.width > 1024 && !expandedItem) {
			// Much gentler parallax effect
			const newTargetX = convertToRange(e.clientX, [0, dimensions.width], [-5, 5]);
			const newTargetY = convertToRange(e.clientY, [0, dimensions.height], [-3, 3]);
			setTargetOffset({ x: newTargetX, y: newTargetY });
		}
	}, [dimensions, expandedItem]);

	// Scroll handler
	const handleScroll = useCallback((e) => {
		// Don't affect physics when an item is expanded
		if (expandedItem) return;

		e.preventDefault();

		if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

		setIsScrolling(true);
		scrollTimeoutRef.current = setTimeout(() => {
			setIsScrolling(false);
		}, 800);

		// Slower, more gentle scroll response
		const deltaY = e.deltaY * 0.15;
		setScroll({ x: 0, y: deltaY });

		if (deltaY < -3) {
			setWind(prev => ({ ...prev, y: -0.5 }));
		} else if (deltaY > 3) {
			setWind(prev => ({ ...prev, y: 0.5 }));
		}
	}, [expandedItem]);

	// Touch handlers
	const touchStart = useRef({ x: 0, y: 0 });

	const handleTouchStart = useCallback((e) => {
		touchStart.current = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY
		};
	}, []);

	const handleTouchMove = useCallback((e) => {
		e.preventDefault();
		// Gentler touch response
		const touchDiff = Math.min(touchStart.current.y - e.touches[0].clientY, 50);
		setScroll({ x: 0, y: touchDiff / 10 * -1 });
		touchStart.current.y = e.touches[0].clientY;
	}, []);

	const handleTouchEnd = useCallback(() => {
		setScroll({ x: 0, y: 0 });
	}, []);

	// Animation loop
	const animate = useCallback(() => {
		const now = Date.now();
		let delta = 1;

		if (lastCycleRef.current) {
			delta = (now - lastCycleRef.current) / 16.666;
		}

		setItems(prevItems =>
			prevItems.map(item => {
				const newItem = { ...item };

				// Apply forces
				const windForce = {
					x: wind.x * newItem.lerpMass,
					y: wind.y * newItem.lerpMass
				};

				const scrollForce = {
					x: scroll.x * newItem.lerpMass,
					y: scroll.y * newItem.lerpMass
				};

				newItem.acceleration.x += windForce.x + scrollForce.x;
				newItem.acceleration.y += windForce.y + scrollForce.y;

				// Update velocity and position
				newItem.velocity.x += newItem.acceleration.x * delta;
				newItem.velocity.y += newItem.acceleration.y * delta;

				newItem.position.x += newItem.velocity.x;
				newItem.position.y += newItem.velocity.y;

				// Reset items that go off screen for proper looping
				if (newItem.position.y < -200 && newItem.acceleration.y < 0) {
					// Reset from bottom - reposition to continue the loop
					newItem.position.y = fieldHeight + 200;
				} else if (newItem.position.y > fieldHeight + 200 && newItem.acceleration.y >= 0) {
					// Reset from top - reposition to continue the loop  
					newItem.position.y = -200;
				}

				// Reset acceleration and velocity
				newItem.acceleration = { x: 0, y: 0 };
				newItem.velocity = { x: 0, y: 0 };

				// Update mass interpolation with slower speed
				newItem.lerpMass = simpleInterpolate(newItem.lerpMass, newItem.targetMass, 0.06);

				// Handle expanded state
				if (expandedItem === newItem.id) {
					newItem.isExpanded = true;
				} else {
					newItem.isExpanded = false;
				}

				return newItem;
			})
		);

		// Update offsets with slower interpolation
		setOffset(prev => ({
			x: simpleInterpolate(prev.x, targetOffset.x, 0.01),
			y: simpleInterpolate(prev.y, targetOffset.y, 0.01)
		}));

		// Reset scroll
		setScroll({ x: 0, y: 0 });

		lastCycleRef.current = now;
		animationRef.current = requestAnimationFrame(animate);
	}, [wind, scroll, targetOffset, fieldHeight, expandedItem]);

	// Start animation
	useEffect(() => {
		animationRef.current = requestAnimationFrame(animate);
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [animate]);

	return (
		<FloatingParallaxScrollStyles
			ref={containerRef}
			className={expandedItem ? 'expanded' : ''}
			onMouseMove={handleMouseMove}
			onWheel={handleScroll}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			{/* Floating Items */}
			{items.map((item) => {
				const finalX = item.position.x + offset.x * item.mass;
				const finalY = item.position.y + offset.y * item.mass;

				return (
					<FloatingParallaxScrollStyles.FloatingItem
						key={item.id}
						style={{
							transform: `translate3d(${finalX}px, ${finalY}px, 0px) scale(${item.scale})`,
							zIndex: item.zIndex,
							opacity: item.opacity,
						}}
						className={`floating-item ${item.isExpanded ? 'expanded' : ''}`}
						onClick={() => {
							if (expandedItem === item.id) {
								// Close expanded view
								setExpandedItem(null);
							} else {
								// Expand this item
								setExpandedItem(item.id);
							}
						}}
						onMouseEnter={() => {
							if (!isScrolling && !expandedItem && dimensions.width > 768) {
								setItems(prev => prev.map(i =>
									i.id === item.id
										? { ...i, targetMass: 0, isMouseOver: true }
										: i
								));
							}
						}}
						onMouseLeave={() => {
							if (!expandedItem && dimensions.width > 768) {
								setItems(prev => prev.map(i =>
									i.id === item.id
										? { ...i, targetMass: i.mass, isMouseOver: false }
										: i
								));
							}
						}}
					>
						<FloatingParallaxScrollStyles.ImageContainer>
							<FloatingParallaxScrollStyles.Image
								src={item.src}
								alt={item.alt}
								draggable={false}
							/>
						</FloatingParallaxScrollStyles.ImageContainer>
					</FloatingParallaxScrollStyles.FloatingItem>
				);
			})}

			{/* Overlay for expanded view */}
			<FloatingParallaxScrollStyles.Overlay
				className={expandedItem ? 'visible' : ''}
				onClick={() => setExpandedItem(null)}
			/>
		</FloatingParallaxScrollStyles>
	);
}
