export default function toLocale({ blocks, locale }) {
	if (!locale || !blocks?.en) {
		return blocks;
	}
	if (!blocks[locale]) {
		return blocks.en;
	}
	return blocks[locale];
}