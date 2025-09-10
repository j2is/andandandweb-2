"use client";

import toLocale from '@/lib/toLocale';
import useLocale from '@/lib/useLocale';

export default function LocalisedString({ string }) {
	const locale = useLocale();

	if (!string) {
		console.warn('No string provided to LocalisedString component');
		return null;
	}
	const localisedString = toLocale({ blocks: string, locale });

	if (!localisedString || typeof localisedString !== 'string') {
		console.warn('Not able to localise', string);
		return null;
	}

	return (
		localisedString
	);
}
