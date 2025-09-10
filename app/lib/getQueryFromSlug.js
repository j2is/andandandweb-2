import { groq } from "next-sanity";

const calcDocType = ({
	params,
	docQuery,
	slugArray,
}) => {

	const slugStart = slugArray?.[0];

	if (slugStart == "quotation" && slugArray?.length > 1) {
		return "quotation";
	}

	if (slugStart == "email" && slugArray?.length <= 1) {
		return "email";
	}

	if (!slugStart || slugStart == '/') {
		return "home";
	}

	// Keep extending this section to match the slug against the docQuery object keys
	if (docQuery.hasOwnProperty(slugStart)) {
		return slugStart;
	}

	return "home";
};

export default function getQueryFromSlug({
	slug: slugArray = []
}) {
	const docQuery = {
		home: groq`
			{
				"home": *[_type == 'home'][0],
				"projects": *[_type == 'project' && live == true]|order(orderRank){
					...,
					video {
						asset->
					}
			}
		}`,
		quotation: groq`*[_type == 'quotation' && slug.current == $slug][0]{
			...,
			coverImage {
				...,
				image {
					asset-> {
						...
					}
				}
			},
		}`,
	};


	if (slugArray.length === 0) {
		return {
			docType: "home",
			queryParams: {},
			query: docQuery.home,
		};
	}

	const docType = calcDocType({
		docQuery,
		slugArray
	});

	// We now have to re-combine the slug array to match our slug in Sanity.
	// let queryParams = { slug: `/${slugArray.join("/")}` };
	// let queryParams = { slug: `/${slugArray[slugArray?.length - 1]}` };
	const queryParams = { slug: `/${slugArray.join("/").replace(/\/pdf/g, "")}` };

	return {
		docType,
		queryParams,
		query: docQuery[docType] || null,
	};
}
