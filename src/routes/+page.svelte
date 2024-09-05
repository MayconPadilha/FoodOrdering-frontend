<script>
	import Search from '$components/search/Search.svelte';
	import CardProdutos from '$components/CardProdutos.svelte';
	import { comidasData } from '$lib/data/comidas';
	import ShoppingTrolley from '$components/ShoppingTrolley.svelte';

	let searchTerm = '';

	$: filteredFood = searchTerm
		? comidasData.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
		: comidasData;
</script>

<Search bind:searchTerm />

<main class="flex flex-col-reverse justify-center m-4 gap-4 sm:flex-row">
	<section class="grid lg:grid-cols-2 md:grid-cols-1 gap-4 content-start justify-center">
		{#if filteredFood.length === 0}
			<h1>Sem resultados</h1>
		{:else}
			{#each filteredFood as item (item.product_id)}
				<CardProdutos {item} />
			{/each}
		{/if}
	</section>
	<ShoppingTrolley />
</main>
