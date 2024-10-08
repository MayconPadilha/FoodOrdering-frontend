// @ts-nocheck
import { cartStore } from '$lib/stores';
import { derived } from 'svelte/store';

export function addToCart(item) {
	cartStore.update((items) => {
		const existingItem = items.find((cartItem) => cartItem.product_id === item.product_id);
		if (existingItem) {
			return items.map((cartItem) =>
				cartItem.product_id === item.product_id
					? { ...cartItem, quantity: cartItem.quantity + 1 }
					: cartItem
			);
		} else {
			return [...items, { ...item, quantity: 1 }];
		}
	});
}

export function removeItem(id) {
	cartStore.update((items) => items.filter((item) => item.product_id !== id));
}

export function clearCart() {
	cartStore.set([]);
}

export function updateQuantity(id, quantity) {
	cartStore.update((items) =>
		items.map((item) =>
			item.product_id === id ? { ...item, quantity: Math.max(1, quantity) } : item
		)
	);
}

export const getCartTotal = derived(cartStore, ($cartItems) =>
	$cartItems.reduce((total, item) => total + item.unit_price * item.quantity, 0).toFixed(2)
);