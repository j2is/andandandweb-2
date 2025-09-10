"use client";

import { createClient } from 'next-sanity'

import {
	apiVersion,
	dataset,
	projectId,
	revalidateSecret,
	studioUrl,
} from '@/lib/sanity/lib/api'

const client = createClient({
	projectId,
	dataset,
	apiVersion,
	// If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
	useCdn: revalidateSecret ? false : true,
	perspective: 'published',
});

const token = process.env.SANITY_API_READ_TOKEN;

export async function loadClientQuery({ query, slug, tags }) {
	const { data } = await client.fetch(query, { slug, tags });
	return data;
}