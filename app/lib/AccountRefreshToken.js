"use client";

import { useEffect, useRef } from "react";
import { refreshToken } from '@/lib/shopify/actions';

const TOKEN_REFRESH_INTERVAL_14 = 14 * 60 * 1000;

export function useAutoRefreshToken() {
	const ref = useRef();

	useEffect(() => {
		async function refresh() {
			const newAccessToken = await refreshToken();

			if (!newAccessToken) {
				clearInterval(ref.current); // Stop refreshing if token refresh fails
			}
		}

		ref.current = setInterval(async () => {
			await refresh();
		}, TOKEN_REFRESH_INTERVAL_14);

		// Cleanup on component unmount
		return () => clearInterval(ref.current);
	}, []);
}