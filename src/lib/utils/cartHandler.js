import { cartStore } from '$lib/stores';
import { get } from 'svelte/store';

export const addToCart = (data) => {
	cartStore.update((items) => {
		let productFound = false;

		// Verificar se o item já existe no carrinho
		const updatedItems = items.map((item) => {
			if (item.product_id === data.product_id) {
				productFound = true;
				// Atualizar a quantidade do item existente
				return { ...item, quantity: (item.quantity || 1) + 1 };
			}
			return item;
		});

		// Se o item não foi encontrado, adicioná-lo ao carrinho
    console.log(data);
    
		if (!productFound) {
			updatedItems.push( data.product_id, data.name, data.unit_price, data.quantity: 1 );
		}
		return updatedItems;
	});
};

export const removeItem = (id = 0) => {
	cartStore.update((items) => {
		const index = items.findIndex((item) => item.product_id === id);
		if (index !== -1) {
			items.splice(index, 1);
		}
		return items;
	});
	console.log(get(cartStore));
};
