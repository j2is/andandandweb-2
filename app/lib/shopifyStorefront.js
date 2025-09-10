const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}.myshopify.com/api/2024-10/graphql.json`;
const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN;

export async function shopifyStorefront({
	// cache = 'force-cache',
	cache = "no-cache",
	headers,
	query,
	tags,
	variables
}) {
	try {
		const result = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token': key,
				...headers
			},
			body: JSON.stringify({
				...(query && { query }),
				...(variables && { variables })
			}),
			cache,
			...(tags && { next: { tags } })
		});

		const body = await result.json();

		if (body.errors) {
			throw body.errors[0];
		}

		return {
			status: result.status,
			body
		};
	} catch (e) {
		if (isShopifyError(e)) {
			throw {
				cause: e.cause?.toString() || 'unknown',
				status: e.status || 500,
				message: e.message,
				query
			};
		}

		throw {
			error: e,
			query
		};
	}
}

function isShopifyError(error) {
	return error && error.message && error.status;
}