<script>
	// @ts-nocheck
	import { get } from 'svelte/store';
	import { array } from '../data/store.js';

	export let product_id = 0;
	export let name = '';
	export let image = '';
	export let unit_price = 0;

	function addToCart() {
		

		array.update((items) => {
        let productFound = false;

        // Verificar se o item já existe no carrinho
        const updatedItems = items.map(item => {
            if (item.product_id === product_id) {
                productFound = true;
                // Atualizar a quantidade do item existente
                return { ...item, quantity: (item.quantity || 1) + 1 };
            }
            return item;
        });

        // Se o item não foi encontrado, adicioná-lo ao carrinho
        if (!productFound) {
            updatedItems.push({ product_id, name, unit_price, quantity: 1 });
        }

		

        return updatedItems;
    }); console.log(get(array));
	}
</script>

<div class="flex h-fit p-2 rounded-lg h-min-fit shadow dark:bg-gray-800 gap-2">
	<div class="flex items-center justify-center basis-4/12">
		<img class="w-44 h-auto" src={image} alt="product {name}" />
	</div>

	<div class="flex flex-col basis-8/12 gap-3">
		<div class=" h-3/6">
			<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
			<h6 class="text-x2 font-semibold tracking-tight text-gray-900 dark:text-white">
				Uma descrição dos produtos aqui
			</h6>
		</div>

		<div class="flex flex-row justify-between items-center h-3/6">
			<span class="font-bold text-gray-900 dark:text-white text-xl">R$ {unit_price.toFixed(2)}</span
			>
			<button
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				on:click={addToCart}>Add to cart</button
			>
		</div>
	</div>
</div>