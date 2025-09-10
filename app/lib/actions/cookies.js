'use server';

import { cookies } from 'next/headers';

export async function setPopupDismissedCookie() {
	const cookieStore = await cookies();
	cookieStore.set('customise-popup-closed', 'true', {
		httpOnly: false,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 30 * 24 * 60 * 60, // 30 days
		path: '/',
	});
}

export async function getPopupDismissedCookie() {
	const cookieStore = await cookies();
	return cookieStore.get('customise-popup-closed')?.value === 'true';
}

export async function setWeatherDataCookie(weatherData) {
	const cookieStore = await cookies();
	const dataWithTimestamp = {
		...weatherData,
		cachedAt: Date.now()
	};

	cookieStore.set('weather-data', JSON.stringify(dataWithTimestamp), {
		httpOnly: false,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 2 * 60 * 60, // 2 hours in seconds
		path: '/',
	});
}

export async function getWeatherDataCookie() {
	const cookieStore = await cookies();
	const weatherCookie = cookieStore.get('weather-data');

	if (!weatherCookie) {
		return null;
	}

	try {
		// Decode the cookie value first in case it was URL encoded
		const decodedValue = decodeURIComponent(weatherCookie.value);
		const data = JSON.parse(decodedValue);
		const now = Date.now();
		const twoHoursInMs = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

		// Check if the data is still fresh (less than 2 hours old)
		if (now - data.cachedAt < twoHoursInMs) {
			return data;
		}

		// Data is stale, return null so fresh data will be fetched
		return null;
	} catch (error) {
		console.error('Error parsing weather cookie:', error);
		// Clear the malformed cookie
		cookieStore.delete('weather-data');
		return null;
	}
}

