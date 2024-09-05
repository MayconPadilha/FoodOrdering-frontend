<script>
	// @ts-nocheck

	import Search from '$lib/search/Search.svelte';
	import CardProdutos from '$lib/component/CardProdutos.svelte';
	import { comidasData } from '$lib/data/comidas';
	import ShoppingTrolley from '$lib/component/ShoppingTrolley.svelte';

	let filteredFood = [];
	let searchTerm = '';

	$: filteredFood = comidasData.filter((food) => {
		let foodName = food.name.toLocaleLowerCase();
		return foodName.includes(searchTerm.toLocaleLowerCase());
	});
</script>

<Search bind:searchTerm />

<main class="flex flex-col-reverse justify-center m-4 gap-4 sm:flex-row">
	<section class="grid lg:grid-cols-2 md:grid-cols-1 gap-4 content-start justify-center">
		{#if searchTerm && filteredFood.length === 0}
			<h1>sem resultados</h1>
			<!-- {:else if filteredFood.length > 0} -->
			<!-- {#each filteredFood as { product_id, name, image, unit_price }}
				<CardProdutos data={ product_id, name, image, unit_price } />
			{/each} -->
			<!-- {:else} -->
		{/if}
		{#each comidasData as item}
			<CardProdutos {item}/>
		{/each}
	</section>
	<ShoppingTrolley />
</main>
