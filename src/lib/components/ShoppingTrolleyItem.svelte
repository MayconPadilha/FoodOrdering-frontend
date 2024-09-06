<script>
	// @ts-nocheck
	import { removeItem, updateQuantity } from '$lib/utils/cartHandler';

	/**
	 * @typedef {Object} ProdutoItem
	 * @property {string} name - Nome do produto
	 * @property {string} image - URL da imagem do produto
	 * @property {number} unit_price - Preço unitário do produto
	 * @property {string} product_id - ID do produto
	 * @property {number} quantity - Quantidade do produto no carrinho
	 */

	/** @type {ProdutoItem} */
	export let item;

	function handleQuantityChange(change) {
		updateQuantity(item.product_id, item.quantity + change);
	}
</script>

<div class="flex justify-between items-start">
	<div class="flex flex-col gap-1 font-bold">
		<h3 class="titulo">{item.name}</h3>
		<div class="flex items-center">
			<button
				on:click={() => handleQuantityChange(-1)}
				class="px-2 py-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-l-lg text-sm"
			>
				-
			</button>
			<span class="px-4 py-1">{item.quantity}</span>
			<button
				on:click={() => handleQuantityChange(1)}
				class="px-2 py-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-r-lg text-sm"
			>
				+
			</button>
		</div>
	</div>
	<div class="flex flex-row gap-5">
		<h3 class="valor text-green-500">R$ {(item.unit_price * item.quantity).toFixed(2)}</h3>
		<button on:click={() => removeItem(item.product_id)} class="text-red-500 font-bold">X</button>
	</div>
</div>
