<script>
	// @ts-nocheck
	import ShoppingTrolleyItem from './ShoppingTrolleyItem.svelte';
	import { cartStore } from '$lib/stores.js';
	import { get } from 'svelte/store';
	import { getCartTotal } from '$lib/utils/cartHandler';

	let isEnabled = false;

	function enableButton() {
		let items = get(cartStore).length;
		isEnabled = items !== 0;
	}

	$: {
		$cartStore;
		enableButton();
	}
</script>

<div
	class="flex flex-col h-fit w-100 lg:w-64 gap-7 rounded-lg p-4 justify-between bg-white shadow-lg"
>
	<div class="header flex h-auto">
		<svg
			class="w-6 h-6 text-gray-800"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				fill-rule="evenodd"
				d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
				clip-rule="evenodd"
			/>
		</svg>
		<span>Carrinho</span>
	</div>

	<div class="flex flex-col gap-3">
		{#each $cartStore as item}
			<ShoppingTrolleyItem {item} />
		{/each}
	</div>

	<div class="flex items-center gap-2 justify-between h-auto">
		<p class="font-normal">Total: R$ {$getCartTotal}</p>
		<a href="/confirmacao">
			<button
				disabled={!isEnabled}
				class="text-white bg-blue-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
			>
				Comprar
			</button>
		</a>
	</div>
</div>
