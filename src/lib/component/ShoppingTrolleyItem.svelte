<script>
	// @ts-nocheck

	import { derived, get } from 'svelte/store';
	import { array } from '../data/store.js';

	export let item;

	const quantidade = derived(
		array,
		($array) => $array.filter((items) => items.name === item.name).length
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

	function removeItem(id) {
		array.update((items) => {
			items.splice(id, 1);
			return items;
		});
	}
</script>

<div class="flex justify-between items-start gap-12">
	<div class="flex flex-col gap-2 font-bold">
		<h3 class="titulo">{$quantidade}x {item.name}</h3>
		<p class="valor text-green-500">R$ {$valor.toFixed(2)}</p>
	</div>
	<button on:click={removeItem(item.id)}>X</button>
</div>
