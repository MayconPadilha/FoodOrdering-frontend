<script>
	// @ts-nocheck

	import { derived, get } from 'svelte/store';
	import { array } from '../data/store.js';

	export let item;

	console.log(item.quantity);

	const quantidade = derived(
		array,
		($array) => $array.find((items) => items.product_id === item.product_id)?.quantity || 1
	);



	const valor = derived(array, ($array) =>
		$array
			.filter((items) => items.name === item.name)
			.reduce((sum, item) => sum + item.unit_price, 0)
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

	function removeItem(id) {
        array.update((items) => {
            const index = items.findIndex(item => item.product_id === id);
            if (index !== -1) {
                items.splice(index, 1);
            }
            return items;
        });
		console.log(get(array));
    }

</script>

<div class="flex justify-between items-start gap-12">
	<div class="flex flex-col gap-2 font-bold">
		<h3 class="titulo">{item.quantity}x {item.name}</h3>
		<p class="valor text-green-500">R$ {$valor.toFixed(2)}</p>
		<p class="valor text-green-500">ID {item.product_id}</p>
	</div>
	<button on:click={removeItem(item.product_id)}>X</button>
</div>
