<script>
	import Search from '$components/search/Search.svelte';
	import CardProdutos from '$components/CardProdutos.svelte';
	import { comidasData } from '$lib/data/comidas';
	import ShoppingTrolley from '$components/ShoppingTrolley.svelte';
	import { category } from '$lib/data/category';
	import Category from '$components/category/Category.svelte';

	let searchTerm = '';

	$: filteredFood = searchTerm
		? comidasData.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
		: comidasData;

	$: pesquisa = searchTerm ? false : true;
</script>

<Search bind:searchTerm />

<main class="flex flex-col-reverse justify-center m-4 gap-4 sm:flex-row">
	{#if pesquisa}
		<section class="flex flex-col gap-4 content-start justify-center">
			{#each category as categoryName}
				<div class="h-20 w-full bg-gradient-to-l to-red-500 from-pink-600">
					<p class="text-3xl text-left text-white p-5">{categoryName}</p>
				</div>
				<Category {categoryName} />
			{/each}
		</section>
	{:else }
		{#if filteredFood.length === 0}
			<h1>Sem resultados</h1>
		{:else}
			<section class="grid lg:grid-cols-2 md:grid-cols-1 gap-4 content-start justify-center">
				{#each filteredFood as item (item.product_id)}
					<CardProdutos {item} />
				{/each}
			</section>
		{/if}
	{/if}
	<ShoppingTrolley />
</main>
