export default function toSentenceCase(str) {
	if (!str) {
		return '';
	}
	// replace dashes with spaces
	const prettyText = str.replace(/-/g, ' ');
	return prettyText.charAt(0).toUpperCase() + prettyText.slice(1)?.toLowerCase();
}
