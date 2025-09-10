//https://github.com/Shopify/shopify-api-js/tree/main/packages/admin-api-client
import { createAdminApiClient } from '@shopify/admin-api-client';

// First, check that Shopify variables are set
const hasShopify =
	process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID &&
	process.env.SHOPIFY_ADMIN_API_TOKEN &&
	process.env.SHOPIFY_ADMIN_API_VERSION;

// Warn the client if variables are missing
if (!hasShopify) {
	console.error('Shopify .env variables are missing')
}

// Otherwise, setup the client and export
const options = {
	storeDomain: `${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}.myshopify.com`,
	apiVersion: process.env.SHOPIFY_ADMIN_API_VERSION,
	accessToken: process.env.SHOPIFY_ADMIN_API_TOKEN
}


export default hasShopify ? createAdminApiClient(options) : null;
