// Client-side cookie utilities
export const getCookie = (name) => {
	if (typeof document === 'undefined') return null;

	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		const cookieValue = parts.pop().split(';').shift();
		return decodeURIComponent(cookieValue);
	}
	return null;
};

export const setCookie = (name, value, days = 30) => {
	if (typeof document === 'undefined') return;

	const expires = new Date();
	expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
	document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
};

export const deleteCookie = (name) => {
	if (typeof document === 'undefined') return;

	document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
};

// Weather-specific cookie utilities
export const getWeatherDataFromCookie = () => {
	const weatherCookie = getCookie('weather-data');

	if (!weatherCookie) {
		return null;
	}

	try {
		const data = JSON.parse(weatherCookie);
		const now = Date.now();
		const threeHoursInMs = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

		// Check if the data is still fresh (less than 3 hours old)
		if (now - data.cachedAt < threeHoursInMs) {
			return data;
		}

		// Data is stale, return null
		return null;
	} catch (error) {
		console.error('Error parsing weather cookie:', error);
		// Clear the malformed cookie
		deleteCookie('weather-data');
		return null;
	}
}; 