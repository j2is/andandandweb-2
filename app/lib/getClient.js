import { createClient } from "@sanity/client";
import { config } from "./config";

export function getClient(preview) {
	const client = createClient({
		...config
	});

	const previewToken = process.env.SANITY_API_TOKEN;

	if (preview && !previewToken) {
		throw new Error(`Preview mode is active, but SANITY_READ_TOKEN is not set in environment variables`);
	}

	return preview
		? client.withConfig({
			token: previewToken,
			useCdn: false,
			ignoreBrowserTokenWarning: true,
			perspective: 'drafts'
		})
		: client;
}