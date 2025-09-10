// lib/sanity.js
import imageUrlBuilder from "@sanity/image-url";

const aspect = {
	w: 233,
	h: 291
};
const portraitRatio = aspect.h / aspect.w;

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
	throw new Error("Couldn't find env var NEXT_PUBLIC_SANITY_PROJECT_ID!");
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
	throw new Error("Couldn't find env var NEXT_PUBLIC_SANITY_DATASET");
}


const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
};

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = ({ image, isThumb, width, height, format }) => {
	if (width && !height && !format) {
		return imageUrlBuilder(config)
			.image(image)
			.auto("format")
			.quality(85)
			.width(width)
			.url();
	}

	if (width && !height && format) {
		return imageUrlBuilder(config)
			.image(image)
			.format(format)
			.quality(85)
			.width(width)
			.url();
	}

	if (width && height && !format) {
		return imageUrlBuilder(config)
			.image(image)
			.auto("format")
			.fit("crop")
			.quality(85)
			.width(width)
			.height(height)
			.url();
	}

	if (width && height && format) {
		return imageUrlBuilder(config)
			.image(image)
			.format(format)
			.fit("crop")
			.quality(85)
			.width(width)
			.height(height)
			.url();
	}

	return imageUrlBuilder(config)
		.image(image)
		.auto("format")
		.quality(85)
		.width(isThumb ? Number(process.env.thumbSize) : Number(process.env.desktopSize))
		.url();
};

export const urlPortraitFor = ({ image, isThumb }) => {

	const prettyThumbnailSize = Number(process.env.thumbSize || 1000);
	const prettyDesktopSize = Number(process.env.desktopSize || 2500);

	const height = isThumb
		? Math.round(prettyThumbnailSize * process.env.portraitRatio)
		: Math.round(prettyDesktopSize * process.env.portraitRatio);
	return imageUrlBuilder(config)
		.image(image)
		.auto("format")
		.fit("crop")
		.width(isThumb ? prettyThumbnailSize : prettyDesktopSize)
		.height(height)
		.url();
};

export const swatchFor = ({ image }) =>
	imageUrlBuilder(config)
		.image(image)
		.auto("format")
		.fit("crop")
		.width(200)
		.height(200)
		.url();