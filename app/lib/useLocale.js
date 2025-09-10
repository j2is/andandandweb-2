"use client"

import { usePathname } from "next/navigation";

export default function useLocale(defaultValue = 'en') {
	const pathname = usePathname();
	const locale = pathname?.split('/')?.[1];

	if (locale && locale?.length === 2) {
		return locale;
	}

	return defaultValue;
}
