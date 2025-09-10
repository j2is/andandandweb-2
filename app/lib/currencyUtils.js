// Supported currencies and their information
export const SUPPORTED_CURRENCIES = {
	'EUR': { name: 'Euro', symbol: '€', countries: ['Austria', 'Belgium', 'Croatia', 'Cyprus', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Ireland (Republic of)', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Monaco', 'Netherlands', 'Portugal', 'Slovak Republic', 'Slovenia', 'Spain'] },
	'BGN': { name: 'Bulgarian Lev', symbol: 'лв', countries: ['Bulgaria'] },
	'DKK': { name: 'Danish Krone', symbol: 'kr', countries: ['Denmark'] },
	'HUF': { name: 'Hungarian Forint', symbol: 'Ft', countries: ['Hungary'] },
	'PLN': { name: 'Polish Złoty', symbol: 'zł', countries: ['Poland'] },
	'RON': { name: 'Romanian Leu', symbol: 'lei', countries: ['Romania'] },
	'AUD': { name: 'Australian Dollar', symbol: 'A$', countries: ['Australia'] },
	'CAD': { name: 'Canadian Dollar', symbol: 'C$', countries: ['Canada'] },
	'HKD': { name: 'Hong Kong Dollar', symbol: 'HK$', countries: ['Hong Kong'] },
	'ILS': { name: 'Israeli Shekel', symbol: '₪', countries: ['Israel'] },
	'JPY': { name: 'Japanese Yen', symbol: '¥', countries: ['Japan'] },
	'MYR': { name: 'Malaysian Ringgit', symbol: 'RM', countries: ['Malaysia'] },
	'NZD': { name: 'New Zealand Dollar', symbol: 'NZ$', countries: ['New Zealand'] },
	'USD': { name: 'US Dollar', symbol: '$', countries: ['United States'] },
	'SGD': { name: 'Singapore Dollar', symbol: 'S$', countries: ['Singapore'] },
	'KRW': { name: 'South Korean Won', symbol: '₩', countries: ['South Korea'] },
	'CHF': { name: 'Swiss Franc', symbol: 'CHF', countries: ['Switzerland'] },
	'AED': { name: 'UAE Dirham', symbol: 'د.إ', countries: ['United Arab Emirates'] },
	'GBP': { name: 'British Pound', symbol: '£', countries: ['United Kingdom'] }
};

// Country to currency mapping
export const COUNTRY_CURRENCY_MAP = {
	'Australia': 'AUD',
	'Austria': 'EUR',
	'Bahrain': 'BHD', // Not in your list but common
	'Belgium': 'EUR',
	'Bulgaria': 'BGN',
	'Canada': 'CAD',
	'Croatia': 'EUR',
	'Cyprus': 'EUR',
	'Czech Republic': 'CZK', // Not in your list but common
	'Denmark': 'DKK',
	'Estonia': 'EUR',
	'Finland': 'EUR',
	'France': 'EUR',
	'Germany': 'EUR',
	'Greece': 'EUR',
	'Hong Kong': 'HKD',
	'Hungary': 'HUF',
	'Ireland (Republic of)': 'EUR',
	'Italy': 'EUR',
	'Japan': 'JPY',
	'Kuwait': 'KWD', // Not in your list but common
	'Latvia': 'EUR',
	'Lithuania': 'EUR',
	'Luxembourg': 'EUR',
	'Malta': 'EUR',
	'Monaco': 'EUR',
	'Netherlands': 'EUR',
	'New Zealand': 'NZD',
	'Norway': 'NOK', // Not in your list but common
	'Poland': 'PLN',
	'Portugal': 'EUR',
	'Qatar': 'QAR', // Not in your list but common
	'Romania': 'RON',
	'Saudi Arabia': 'SAR', // Not in your list but common
	'Singapore': 'SGD',
	'Slovak Republic': 'EUR',
	'Slovenia': 'EUR',
	'Spain': 'EUR',
	'Sweden': 'SEK', // Not in your list but common
	'Switzerland': 'CHF',
	'United Arab Emirates': 'AED',
	'United States': 'USD'
};

/**
 * Validates if a currency code is supported
 * @param {string} currencyCode - The currency code to validate
 * @returns {boolean} - True if supported, false otherwise
 */
export function isValidCurrency(currencyCode) {
	return currencyCode in SUPPORTED_CURRENCIES;
}

/**
 * Gets currency information for a given currency code
 * @param {string} currencyCode - The currency code
 * @returns {object|null} - Currency information or null if not found
 */
export function getCurrencyInfo(currencyCode) {
	return SUPPORTED_CURRENCIES[currencyCode] || null;
}

/**
 * Gets the currency code for a given country
 * @param {string} country - The country name
 * @returns {string|null} - Currency code or null if not found
 */
export function getCurrencyForCountry(country) {
	return COUNTRY_CURRENCY_MAP[country] || null;
}

/**
 * Gets all supported currency codes
 * @returns {string[]} - Array of supported currency codes
 */
export function getSupportedCurrencyCodes() {
	return Object.keys(SUPPORTED_CURRENCIES);
}

/**
 * Gets all supported countries
 * @returns {string[]} - Array of supported countries
 */
export function getSupportedCountries() {
	return Object.keys(COUNTRY_CURRENCY_MAP);
}

/**
 * Detects currency mismatches in cart data
 * @param {object} cart - The cart object
 * @returns {object} - Object with mismatch info and suggested actions
 */
export function detectCurrencyMismatch(cart) {
	if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
		return { hasMismatch: false };
	}

	const cartCurrency = cart.cost?.totalAmount?.currencyCode || 'GBP';
	const mismatches = [];

	// Check each line item for currency mismatches
	cart.lineItems.forEach((item, index) => {
		const itemCurrency = item.cost?.totalAmount?.currencyCode;
		const variantCurrency = item.variant?.priceV2?.currencyCode;
		
		if (itemCurrency && itemCurrency !== cartCurrency) {
			mismatches.push({
				type: 'item_cost',
				index,
				itemId: item.id,
				expected: cartCurrency,
				actual: itemCurrency
			});
		}
		
		if (variantCurrency && variantCurrency !== cartCurrency) {
			mismatches.push({
				type: 'variant_price',
				index,
				itemId: item.id,
				expected: cartCurrency,
				actual: variantCurrency
			});
		}
	});

	return {
		hasMismatch: mismatches.length > 0,
		mismatches,
		cartCurrency,
		suggestedAction: mismatches.length > 0 ? 'refresh_cart' : null
	};
}

/**
 * Gets the expected currency based on user's location or preferences
 * @param {string} countryCode - The country code (e.g., 'GB', 'US')
 * @returns {string} - The expected currency code
 */
export function getExpectedCurrency(countryCode) {
	const countryMap = {
		'GB': 'GBP',
		'US': 'USD',
		'CA': 'CAD',
		'AU': 'AUD',
		'NZ': 'NZD',
		'HK': 'HKD',
		'SG': 'SGD',
		'JP': 'JPY',
		'KR': 'KRW',
		'CH': 'CHF',
		'AE': 'AED',
		'IL': 'ILS',
		'MY': 'MYR'
	};
	
	return countryMap[countryCode] || 'GBP';
} 