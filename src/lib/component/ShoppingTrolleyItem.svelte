<script>
	// @ts-nocheck

	import { derived } from 'svelte/store';
	import { cartStore } from '../stores.js';
	import { removeItem } from '$lib/utils/cartHandler';

	export let item;

	const quantidade = derived(
		cartStore,
		($array) => $array.find((items) => items.product_id === item.product_id)?.quantity || 1
	);

	// function mostrarLista() {
	// 	let items = get(array);
	// 	console.log(items);
	// }

	// console.log(item.product_id);

	// function removeItem(id) {
	// 	array.update((items) => {
	// 		items.splice(id, 1);
	// 		return items;
	// 	});
	// }
</script>

<div class="flex justify-between items-start gap-12">
	<div class="flex flex-col gap-2 font-bold">
		<h3 class="titulo">{item.quantity}x {item.name}</h3>
		<p class="valor text-green-500">R$ {(item.unit_price * item.quantity).toFixed(2)}</p>
		<p class="valor text-green-500">ID {item.product_id}</p>
	</div>
	<button on:click={removeItem(item.product_id)}>X</button>
</div>
