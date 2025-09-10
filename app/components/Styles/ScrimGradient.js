const calculateScrimStops = (color) => {
	const stops = [
		{ position: 0, opacity: 1 },
		{ position: 19, opacity: 0.738 },
		{ position: 34, opacity: 0.541 },
		{ position: 47, opacity: 0.382 },
		{ position: 56.5, opacity: 0.278 },
		{ position: 65, opacity: 0.194 },
		{ position: 73, opacity: 0.126 },
		{ position: 80.2, opacity: 0.075 },
		{ position: 86.1, opacity: 0.042 },
		{ position: 91, opacity: 0.021 },
		{ position: 95.2, opacity: 0.008 },
		{ position: 98.2, opacity: 0.002 },
		{ position: 100, opacity: 0 }
	];

	const convertToRGBA = (baseColor, opacity) => {
		// Handle hex color
		if (baseColor.startsWith('#')) {
			const r = parseInt(baseColor.slice(1, 3), 16);
			const g = parseInt(baseColor.slice(3, 5), 16);
			const b = parseInt(baseColor.slice(5, 7), 16);
			return `rgba(${r}, ${g}, ${b}, ${opacity})`;
		}
		// Handle rgb color
		else if (baseColor.startsWith('rgb')) {
			const rgb = baseColor.match(/\d+/g);
			return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
		}
		// Handle named colors by defaulting to black
		return `rgba(0, 0, 0, ${opacity})`;
	};

	return stops.map(({ position, opacity }) =>
		`${convertToRGBA(color, opacity)} ${position}%`
	).join(', ');
};

const scrimGradient = (color = 'black', direction = 'to bottom') => {
	return `linear-gradient(${direction}, ${calculateScrimStops(color)})`;
};

export default scrimGradient;