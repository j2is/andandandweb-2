"use server";

import { cookies } from 'next/headers';
import { shopifyStorefront } from '@/lib/shopifyStorefront';

export async function shopifyAuthenticatedRequest(query, variables = {}, cache) {
	const cookieStore = await cookies();
	const customerToken = cookieStore.get('shopifyAccessToken')?.value;

	if (!customerToken) {
		throw new Error('Customer not authenticated');
	}

	return shopifyStorefront({
		query,
		cache,
		variables: {
			...variables,
			customerAccessToken: customerToken
		},
		headers: {
			'X-Shopify-Customer-Access-Token': customerToken
		}
	});
}