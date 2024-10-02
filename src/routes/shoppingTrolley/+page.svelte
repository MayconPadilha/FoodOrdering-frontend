<script>
	// @ts-nocheck
	import ShoppingTrolleyItem from '$components/ShoppingTrolleyItem.svelte';
	import { cartStore } from '$lib/stores.js';
	import { clearCart } from '$lib/utils/cartHandler';
	import { derived } from 'svelte/store';
	import { getCartTotal } from '$lib/utils/cartHandler';

	const total = derived(cartStore, ($array) =>
		$array.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)
	);

</script>

<div class="flex flex-col h-fit w-auto m-4 items-center gap-2">
	<div
		class="flex flex-col gap-4 p-4 w-full md:w-1/2 lg:w-1/3 rounded-lg text-white dark:bg-gray-800"
	>
		{#each $cartStore as item}
			<ShoppingTrolleyItem {item} />
		{/each}
		<div class="flex flex-row-reverse">
			<h3 class="font-bold">Total: R$ {$getCartTotal}</h3>
		</div>
	</div>
	<div class="flex flex-row gap-1 p-1 w-full md:w-1/2 lg:w-1/3 justify-between h-auto">
		<a href="/" class="w-full">
			<button
				class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
				on:click={clearCart}
			>
				Limpar Carrinho
			</button>
		</a>
		<a href="/shoppingTrolley/delivery" class="w-full">
			<button
				class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Continuar
			</button>
		</a>
	</div>
</div>
