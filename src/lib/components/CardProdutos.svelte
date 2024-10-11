<script>
	import { addToCart } from '$lib/utils/cartHandler';

	/**
	 * @typedef {Object} ProdutoItem
	 * @property {string} name - Nome do produto
	 * @property {string} image - URL da imagem do produto
	 * @property {number} unit_price - Preço unitário do produto
	 * @property {string} description - Descricao do produto
	 */

	/** @type {ProdutoItem} */
	export let item;

	function handleAddToCart() {
		addToCart(item);
	}
</script>

<div class="flex h-fit p-2 rounded-lg h-min-fit shadow-lg bg-white gap-2 hover:shadow-red-300 transition-shadow duration-300 ease-in-out">
	<div class="flex items-center justify-center basis-4/12">
		<img class="w-32 h-32 object-cover" src={item.image} alt="produto {item.name}" />
	</div>

	<div class="flex flex-col basis-8/12 gap-3">
		<div class="h-3/6">
			<h5 class="text-lg font-semibold tracking-tight text-red-700">
				{item.name}
			</h5>
			<h6 class="text-base font-normal tracking-tight text-gray-900">
				{item.description}
			</h6>
		</div>

		<div class="flex flex-row justify-between items-center h-3/6">
			<div class="gap-1">
				<span class="font-normal text-gray-600">
					A partir de
				</span>
				<span class="font-normal text-gray-950 tracking-tight">R$ {item.unit_price.toFixed(2)}</span>
			</div>
			
			<button class="text-white bg-blue-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-1.5 text-center" on:click={handleAddToCart}>Adicionar</button>
		</div>
	</div>
</div>
