// https://davidwalsh.name/javascript-polling
export default function poll(fn, { timeout = 10000, interval = 100, maxRetries = 3 } = {}) {
	const endTime = Date.now() + timeout;
	let retryCount = 0;

	const checkCondition = (resolve, reject) => {
		// Check if we've exceeded the timeout
		if (Date.now() >= endTime) {
			return reject(new Error('Polling timed out'));
		}

		// Use Promise.race to implement timeout for the function call
		Promise.race([
			fn(),
			new Promise((_, reject) => setTimeout(() => reject(new Error('Function call timed out')), endTime - Date.now()))
		])
			.then(result => {
				if (result) {
					resolve(result);
				} else {
					// If the condition isn't met, schedule the next check with exponential backoff
					const backoffInterval = Math.min(interval * Math.pow(1.5, retryCount), 1000);
					setTimeout(() => checkCondition(resolve, reject), backoffInterval);
				}
			})
			.catch(error => {
				// Handle network errors more gracefully
				if (error.message === 'Function call timed out' || error.name === 'NetworkError' || error.message.includes('fetch')) {
					retryCount++;
					if (retryCount <= maxRetries) {
						// If it's our timeout error or network error, continue polling with exponential backoff
						const backoffInterval = Math.min(interval * Math.pow(1.5, retryCount), 1000);
						setTimeout(() => checkCondition(resolve, reject), backoffInterval);
					} else {
						// Max retries exceeded
						reject(new Error('Max retries exceeded'));
					}
				} else {
					// For any other error, reject the promise
					reject(error);
				}
			});
	};

	return new Promise(checkCondition);
}