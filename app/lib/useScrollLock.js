"use client";

import { useEffect, useRef } from 'react';

// Global state to track active scroll locks
let activeLocks = 0;
let originalOverflow = null;
let originalPosition = null;

// Debug function to help track issues
const debugScrollLock = (componentName, action, isActive, activeLocks) => {
	if (process.env.NODE_ENV === 'development') {
		// console.log(`[ScrollLock] ${componentName}: ${action}`, { isActive, activeLocks });
	}
};

// Utility function to manually reset scroll lock state (for debugging)
export const resetScrollLock = () => {
	activeLocks = 0;
	if (originalOverflow !== null) {
		document.body.style.overflow = originalOverflow;
		document.body.style.position = originalPosition;
	}
	if (process.env.NODE_ENV === 'development') {
		// console.log('[ScrollLock] Manual reset called');
	}
};

// Expose current state for debugging
export const getScrollLockState = () => ({
	activeLocks,
	originalOverflow,
	originalPosition,
	currentOverflow: document.body.style.overflow,
	currentPosition: document.body.style.position
});

// Initialize beforeunload listener to reset scroll lock on page unload
if (typeof window !== 'undefined') {
	window.addEventListener('beforeunload', () => {
		if (originalOverflow !== null) {
			document.body.style.overflow = originalOverflow;
			document.body.style.position = originalPosition;
		}
	});
}

export default function useScrollLock(isActive, componentName = 'Unknown') {
	const isLockedRef = useRef(false);

	useEffect(() => {
		// Store original values only once
		if (originalOverflow === null) {
			originalOverflow = window.getComputedStyle(document.body).overflow;
			originalPosition = window.getComputedStyle(document.body).position;
		}

		if (isActive && !isLockedRef.current) {
			activeLocks++;
			isLockedRef.current = true;
			document.body.style.overflow = 'hidden';
			document.body.style.position = 'relative';
			debugScrollLock(componentName, 'LOCK', isActive, activeLocks);
		} else if (!isActive && isLockedRef.current) {
			activeLocks--;
			isLockedRef.current = false;
			debugScrollLock(componentName, 'UNLOCK', isActive, activeLocks);
			
			// Only restore original state when no locks are active
			if (activeLocks <= 0) {
				activeLocks = 0; // Ensure it doesn't go negative
				document.body.style.overflow = originalOverflow;
				document.body.style.position = originalPosition;
				debugScrollLock(componentName, 'RESTORE', isActive, activeLocks);
			}
		}

		// Cleanup function
		return () => {
			if (isLockedRef.current) {
				activeLocks--;
				isLockedRef.current = false;
				debugScrollLock(componentName, 'CLEANUP', isActive, activeLocks);
				
				// Only restore original state when no locks are active
				if (activeLocks <= 0) {
					activeLocks = 0; // Ensure it doesn't go negative
					document.body.style.overflow = originalOverflow;
					document.body.style.position = originalPosition;
					debugScrollLock(componentName, 'CLEANUP_RESTORE', isActive, activeLocks);
				}
			}
		};
	}, [isActive, componentName]);
}