export default function shuffle(array) {
	const copy = array && array?.length ? [...array] : null;
	if(!copy){
		return null;
	}
	for (var i = copy.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = copy[i];
		copy[i] = copy[j];
		copy[j] = temp;
	}
	return copy;
}
