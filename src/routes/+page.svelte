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

<main class="flex m-4">
	<section class="flex flex-wrap w-3/4 justify-center gap-4">
		{#if searchTerm && filteredFood.length === 0}
			<h1>sem resultados</h1>
		{:else if filteredFood.length > 0}
			{#each filteredFood as { name, image, unit_price }}
				<CardProdutos {name} {image} {unit_price}/>
			{/each}
		{:else}
			{#each comidasData as { name, image, unit_price }}
				<CardProdutos {name} {image} {unit_price}/>
			{/each}
		{/if}
	</section>
	<ShoppingTrolley></ShoppingTrolley>
</main>
