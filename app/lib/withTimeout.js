const TIMEOUT_MS = 5000; // 5 seconds timeout

function timeout(ms, error = 'Operation timed out') {
	return new Promise((_, reject) => setTimeout(() => reject(new Error(error)), ms));
}

export async function withTimeout(promise, error) {
	return Promise.race([promise, timeout(TIMEOUT_MS, error)]);
}