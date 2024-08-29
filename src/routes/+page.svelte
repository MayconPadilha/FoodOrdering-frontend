<script>
    import Search from '$lib/search/Search.svelte';
	import CardProdutos from '$lib/component/CardProdutos.svelte';
	import { comidasData } from '$lib/data/comidas';
	import ShoppingTrolley from '$lib/component/ShoppingTrolley.svelte';
   
	let filteredFood = [];
	let searchTerm = '';

	$: filteredFood = comidasData.filter((food) => {
		let foodName = food.nome.toLocaleLowerCase();
		return foodName.includes(searchTerm.toLocaleLowerCase());
	});

</script>

<Search bind:searchTerm />

<main>
	<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#if searchTerm && filteredFood.length === 0}
			<h1>sem resultados</h1>
		{:else if filteredFood.length > 0}
			{#each filteredFood as { nome, imagem, preco }}
				<CardProdutos {nome} {imagem} {preco}/>
			{/each}
		{:else}
			{#each comidasData as { nome, imagem, preco }}
				<CardProdutos {nome} {imagem} {preco}/>
			{/each}
		{/if}
	</section>
	<ShoppingTrolley></ShoppingTrolley>
</main>

<style>

	main{
		display: flex;
		margin-top: 10px;
		justify-content: center;
		gap: 10px;
	}
	section {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>

