<script>
	import { addToCart } from '$lib/utils/cartHandler';

	/**
	 * @typedef {Object} ProdutoItem
	 * @property {string} name - Nome do produto
	 * @property {string} image - URL da imagem do produto
	 * @property {number} unit_price - Preço unitário do produto
	 */

	/** @type {ProdutoItem} */
	export let item;

	function handleAddToCart() {
		addToCart(item);
	}
</script>

<div class="flex h-fit p-2 rounded-lg h-min-fit shadow dark:bg-gray-800 gap-2">
	<div class="flex items-center justify-center basis-4/12">
		<img class="w-44 h-auto" src={item.image} alt="produto {item.name}" />
	</div>

	<div class="flex flex-col basis-8/12 gap-3">
		<div class="h-3/6">
			<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
				{item.name}
			</h5>
			<h6 class="text-x2 font-semibold tracking-tight text-gray-900 dark:text-white">
				Uma descrição dos produtos aqui
			</h6>
		</div>

		<div class="flex flex-row justify-between items-center h-3/6">
			<span class="font-bold text-gray-900 dark:text-white text-xl"
				>R$ {item.unit_price.toFixed(2)}</span
			>
			<button
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				on:click={handleAddToCart}>Adicionar</button
			>
		</div>
	</div>
</div>
