// Client-side utility functions for reading cookies
// This file contains client-side functions only (no server actions)

/**
 * Client-side function to read weather data from cookies
 * @returns {Object|null} Weather data if available and fresh, null otherwise
 */
export function getWeatherDataFromCookie() {
	if (typeof document === 'undefined') return null;

	const cookies = document.cookie.split(';');
	const weatherCookie = cookies.find(cookie => cookie.trim().startsWith('weather-data='));

	if (!weatherCookie) {
		return null;
	}

	try {
		const cookieValue = weatherCookie.split('=')[1];
		const decodedValue = decodeURIComponent(cookieValue);
		const data = JSON.parse(decodedValue);
		const now = Date.now();
		const twoHoursInMs = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

		// Check if the data is still fresh (less than 2 hours old)
		if (now - data.cachedAt < twoHoursInMs) {
			return data;
		}

		// Data is stale, return null
		return null;
	} catch (error) {
		console.error('Error parsing weather cookie on client:', error);
		return null;
	}
}
