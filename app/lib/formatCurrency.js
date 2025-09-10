import NP from 'number-precision'

export default function formatCurrency(amount, currencyCode = 'GBP', locale = 'en-GB') {
	// Parse the amount using number-precision
	const parsedAmount = NP.strip(parseFloat(amount));

	// Check if the parsed amount is a valid number
	if (isNaN(parsedAmount)) {
		return 'Invalid amount';
	}

	// Always use GBP formatting for the website
	const formatter = new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
		currencyDisplay: 'narrowSymbol',
		minimumFractionDigits: 0,
		maximumFractionDigits: 2
	});

	try {
		const formatted = formatter.format(Number(parsedAmount));
		return formatted
			.replace(/^(.)/, '$1 ') // Add space after currency symbol
		// .replace(/\.00($|\s)/, '$1') // remove .00
	} catch (error) {
		console.error(`Error formatting currency:`, error);
		// Fallback to basic formatting
		return `£ ${parsedAmount.toFixed(2)}`;
	}
}