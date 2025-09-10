import { useState } from "react";
import { getClient } from "./getClient";

const loadingThreshold = process?.env?.loadingThreshold ? Number(process.env.loadingThreshold) : 2;

function loadItems({ startCursor = 0, preview = false, slug }) {
	if (!loadingThreshold) {
		throw new Error('loadingThreshold not set in env');
	}

	return new Promise(async (resolve, reject) => {
		const query = `*[_type == 'editorialOverview' && slug.current == $slug][0]{
      blocks[${startCursor}...${startCursor + loadingThreshold}]->{
        title,
        slug,
				_type,
        fullWidthOnEditorialOverview,
        seo {
          description,
          socialShareImage {
            ...,
            _type,
            asset->
          }
        }
      }
    }.blocks`;

		try {
			const data = await getClient(preview).fetch(query, { slug });
			resolve({ data });
		} catch (error) {
			console.error(error);
			reject();
		}
	});
}

export function useLoadItems({ startCursor = 0, count, slug, preview = false }) {
	const [loading, setLoading] = useState(false);
	const [items, setItems] = useState([]);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [error, setError] = useState();

	async function loadMore() {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			const { data } = await loadItems({
				startCursor: items.length + startCursor,
				preview,
				slug
			});

			const newHasNextPage = (data && data.length) || items.length + data.length !== count;

			if (data && data.length) {
				setItems((current) => [...current, ...data]);
			}

			setHasNextPage(newHasNextPage);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}

	return { loading, items, hasNextPage, error, loadMore };
}