export default function (value, srcRange, dstRange) {
	if (value < srcRange[0]) {
		return dstRange[0];
	}
	if (value > srcRange[1]) {
		return dstRange[1];
	}
	const srcMax = srcRange[1] - srcRange[0];
	const dstMax = dstRange[1] - dstRange[0];
	const adjValue = value - srcRange[0];
	return (adjValue * dstMax) / srcMax + dstRange[0];
}
