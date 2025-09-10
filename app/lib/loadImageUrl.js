export default function loadImageUrl(imageUrl) {
	return new Promise((resolve, reject) => {
		if (!imageUrl) {
			reject(new Error('No image URL provided'));
		}

		const img = new Image();

		img.onload = () => {
			resolve(img);
		};

		img.onerror = (error) => {
			reject(new Error(`Failed to load image: ${error}`));
		};

		img.src = imageUrl;

		// Check if the image is already complete (e.g., from browser cache)
		if (img.complete) {
			resolve(img);
		}
	});
}