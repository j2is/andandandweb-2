import { useEffect, useRef } from 'react';
import { useCartStore } from '@/stores/CartStore';
import { triggerCartRefresh } from '@/lib/shopify/clientActions';

export function useCartRefresh() {
	const { cart } = useCartStore();
	const lastCheckoutUrl = useRef(null);
	const hasReturnedFromCheckout = useRef(false);
	const hasRunOnMount = useRef(false);
	const isRefreshing = useRef(false);

	useEffect(() => {
		// Store the current checkout URL
		if (cart?.webUrl) {
			lastCheckoutUrl.current = cart.webUrl;
		}
	}, [cart?.webUrl]);

	// Run on first mount to detect if user has returned from checkout
	useEffect(() => {
		if (!hasRunOnMount.current && cart && cart.lineItems && cart.lineItems.length > 0 && !isRefreshing.current) {
			hasRunOnMount.current = true;
			
			// Check if we're returning from checkout by looking at the URL
			const currentUrl = window.location.href;
			const checkoutDomain = lastCheckoutUrl.current ? new URL(lastCheckoutUrl.current).hostname : null;
			const currentDomain = window.location.hostname;
			
			// If we have a checkout URL and we're back on our domain, or if the cart has mixed currencies
			if ((checkoutDomain && currentDomain !== checkoutDomain) || hasCurrencyMismatch(cart)) {
				clearAndRecreateCart();
			}
		}
	}, [cart]);

	useEffect(() => {
		let isVisible = true;

		const handleVisibilityChange = () => {
			if (document.hidden) {
				// User left the page (likely to checkout)
				isVisible = false;
			} else {
				// User returned to the page
				if (!isVisible && lastCheckoutUrl.current && !hasReturnedFromCheckout.current && !isRefreshing.current) {
					// Check if we're returning from checkout
					const currentUrl = window.location.href;
					const checkoutDomain = new URL(lastCheckoutUrl.current).hostname;
					const currentDomain = window.location.hostname;
					
					// If we're back on our domain and we had a checkout URL, refresh the cart
					if (currentDomain !== checkoutDomain) {
						hasReturnedFromCheckout.current = true;
						
						// Clear the cart and re-add items with original GBP prices
						clearAndRecreateCart();
					}
				}
				isVisible = true;
			}
		};

		const handleFocus = () => {
			if (!isVisible && lastCheckoutUrl.current && !hasReturnedFromCheckout.current && !isRefreshing.current) {
				hasReturnedFromCheckout.current = true;
				clearAndRecreateCart();
			}
		};

		// Listen for visibility changes
		document.addEventListener('visibilitychange', handleVisibilityChange);
		
		// Listen for window focus (alternative method)
		window.addEventListener('focus', handleFocus);

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			window.removeEventListener('focus', handleFocus);
		};
	}, [cart?.webUrl]);

	// Helper function to detect currency mismatches
	const hasCurrencyMismatch = (cart) => {
		if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
			return false;
		}

		const cartCurrency = cart.cost?.totalAmount?.currencyCode || 'GBP';
		
		// Check if any line items have different currency than the cart
		return cart.lineItems.some(item => {
			const itemCurrency = item.cost?.totalAmount?.currencyCode;
			const variantCurrency = item.variant?.priceV2?.currencyCode;
			
			return (itemCurrency && itemCurrency !== cartCurrency) || 
				   (variantCurrency && variantCurrency !== cartCurrency);
		});
	};

	const clearAndRecreateCart = async () => {
		// Prevent multiple simultaneous refreshes
		if (isRefreshing.current) {
			return;
		}

		isRefreshing.current = true;

		try {
			// Clear the cart and re-add items with original GBP prices
			const result = await triggerCartRefresh();
			
			if (result === 'success') {
				console.log('Cart refreshed successfully with original GBP prices');
			} else {
				console.error('Error clearing and recreating cart:', result);
			}
		} catch (error) {
			console.error('Error clearing and recreating cart:', error);
		} finally {
			isRefreshing.current = false;
		}
	};
} 