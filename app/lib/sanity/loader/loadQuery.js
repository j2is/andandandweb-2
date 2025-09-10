'server-only';

import { sanityFetch } from "@/lib/sanity/lib/live";

import {
	typeQuery,
	teamQuery,
	eventsQuery,
	contactQuery,
	homeQuery,
	pageQuery,
	productQuery,
	historyQuery,
	editorialQuery,
	editorialOverviewQuery,
	plpQuery,
	loginQuery,
	registerQuery,
	xeroQuery,
	accountQuery,
	newslettersQuery,
	newsletterQuery,
	registerInterestQuery,
	productPersonalisationOverviewQuery,
	preCheckoutQuery,
	knotsQuery,
	testQuery
} from '@/lib/sanity/lib/queries';

export const loadQuery = (async (query, params = {}, tags) => {

	let revalidate = 0;
	const isUsingCdn = process.env.NODE_ENV === "production";

	// If `next.tags` is set, and we're not using the CDN, then it's safe to cache
	if (!isUsingCdn && (!!tags && Array.isArray(tags))) {
		revalidate = false;
	} else if (isUsingCdn) {
		revalidate = 0;
	}

	return sanityFetch({
		query,
		params,
		tags,
		revalidate
	});
});

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadPageType({ slug }) {
	const tags = ['pageType'];
	return loadQuery(
		typeQuery,
		{ slug },
		tags
	);
}

export function loadPage({ query, slug, tags }) {
	if (!query) {
		console.warn(`No query found for slug: ${slug}`);
		return null;
	}

	return loadQuery(
		query,
		{ slug },
		tags
	);
}


export function getQueryAndTags({ pageType }) {

	const queries = {
		product: productQuery,
		contact: contactQuery,
		home: homeQuery,
		page: pageQuery,
		team: teamQuery,
		events: eventsQuery,
		editorial: editorialQuery,
		history: historyQuery,
		productListing: plpQuery,
		login: loginQuery,
		register: registerQuery,
		dashboard: accountQuery,
		orders: accountQuery,
		orderDetail: accountQuery,
		addresses: accountQuery,
		addressesAdd: accountQuery,
		xero: xeroQuery,
		editorialOverview: editorialOverviewQuery,
		preCheckout: preCheckoutQuery,
		productPersonalisationOverview: productPersonalisationOverviewQuery,
		newsletters: newslettersQuery,
		newsletter: newsletterQuery,
		registerInterest: registerInterestQuery,
		knots: knotsQuery,
		test: testQuery
	};

	const tagList = {
		contact: ['contact', 'settings'],
		product: ['product', 'productSettings', 'contact', 'sizeGuide'],
		page: ['page'],
		team: ['team'],
		home: ['home'],
		history: ['home'],
		events: ['events', 'settings'],
		editorial: ['editorial', 'contact', 'settings'],
		productListing: ['productListing', 'product', 'productSettings'],
		login: ['login', 'settings'],
		register: ['register', 'settings'],
		dashboard: ['accountSettings'],
		orders: ['accountSettings'],
		orderDetail: ['accountSettings'],
		addresses: ['accountSettings'],
		addressesAdd: ['accountSettings'],
		xero: ['xero'],
		productPersonalisationOverview: ['productPersonalisationOverview'],
		editorialOverview: ['editorial', 'editorialOverview'],
		newsletters: ['newsletter'],
		newsletter: ['newsletter'],
		preCheckout: ['preCheckout', 'product'],
		registerInterest: ['registerInterest'],
		knots: ['knots', 'product'],
		test: ['product']
	}

	const query = queries[pageType] || undefined;
	const tags = tagList[pageType] || undefined;

	return { query, tags };
}
