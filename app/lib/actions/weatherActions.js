"use server";

import { getWeatherDataCookie, setWeatherDataCookie } from './cookies';

/**
 * Server action to fetch current weather data using OpenWeather One Call API v3
 * @param {boolean} bypassCache - If true, skips server-side cache and fetches fresh data
 * @returns {Promise<{windDirection: number, windSpeed: number, error?: string}>}
 */
export async function getCurrentWindData(bypassCache = false) {
	// Only use cached data if not bypassing cache
	if (!bypassCache) {
		try {
			const cachedData = await getWeatherDataCookie();
			if (cachedData) {
				// console.log('Using cached weather data:', {
				// 	windDirection: cachedData.windDirection,
				// 	windSpeed: cachedData.windSpeed,
				// 	cachedAt: new Date(cachedData.cachedAt).toISOString(),
				// 	age: Math.round((Date.now() - cachedData.cachedAt) / 1000 / 60) + ' minutes'
				// });

				return {
					windDirection: cachedData.windDirection,
					windSpeed: cachedData.windSpeed,
					timestamp: cachedData.timestamp,
					fromCache: true
				};
			}
		} catch (error) {
			console.error('Error reading weather cache:', error);
			// Continue to fetch fresh data if cache reading fails
		}
	} else {
		// console.log('Bypassing server-side cache - fetching fresh data');
	}
	try {
		// Your coordinates from Google Maps link
		const lat = 51.5345394;
		const lon = -0.0216088;

		// You'll need to add your OpenWeather API key to your environment variables
		const apiKey = process.env.OPENWEATHER_API_KEY;


		if (!apiKey) {
			throw new Error("OpenWeather API key not found in environment variables");
		}

		// Using One Call API 3.0 - excluding unnecessary data to reduce response size
		const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`;

		const response = await fetch(url, {
			// Add cache control - disable cache when bypassing, otherwise cache briefly
			...(bypassCache ? { cache: 'no-store' } : { next: { revalidate: 1 } })
		});

		if (!response.ok) {
			const errorText = await response.text();
			// console.log('Error response body:', errorText);
			throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
		}

		const data = await response.json();

		// Extract wind data from current weather (One Call API 3.0 format)
		const windDirection = data.current?.wind_deg || 0;
		const windSpeed = data.current?.wind_speed || 0;

		const weatherData = {
			windDirection,
			windSpeed,
			timestamp: Date.now(),
		};

		// Cache the fresh weather data
		try {
			await setWeatherDataCookie(weatherData);
			// console.log('Weather data cached successfully');
		} catch (error) {
			console.error('Error caching weather data:', error);
			// Don't fail the request if caching fails
		}

		return weatherData;

	} catch (error) {
		console.error('Error fetching wind data:', error);
		return {
			windDirection: 225, // Default fallback
			windSpeed: 0,
			error: error.message
		};
	}
}

