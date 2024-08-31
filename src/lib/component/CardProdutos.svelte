<script>
	import { get } from 'svelte/store';
	import { array } from '../data/store.js';

	export let nome = '';
	export let imagem = '';
	export let preco = '';

	function addToCart() {
		// @ts-ignore
		array.update((items) => [...items, { nome, preco }]);
		// console.log(get(array))
	}
</script>

<div class="flex p-2 rounded-lg shadow dark:bg-gray-800 gap-2 w-auto">
	<div class="flex items-center justify-center h-full basis-4/12">
		<img class="w-44 h-auto" src={imagem} alt="product {imagem}" />
	</div>

	<div class="flex h-full flex-col basis-8/12 gap-3">
		<div class="w-full h-3/6">
			<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{nome}</h5>
			<h6 class="text-x2 font-semibold tracking-tight text-gray-900 dark:text-white">
				Uma descricao dos produtos aqui
			</h6>
		</div>

		<div class="flex w-full flex-row justify-between items-center  h-3/6">
			<span class="font-bold text-gray-900 dark:text-white text-xl">R$ {preco}</span>
			<button
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				on:click={addToCart}>Add to cart</button>
		</div>
	</div>
</div>

<!-- <style>
	.main {
		display: flex;
		width: 434px;
		background-color: brown;
		padding: 10px;
		background-color: rgb(17 24 39 / 1);
		border-radius: 8px;
	}

	.main__left {
		display: flex;
		width: 70%;
		height: 100%;
		flex-direction: column;
		gap: 10px;
		/* background-color: chocolate; */
	}

	.left__header {
		/* background-color: blueviolet; */
		width: 100%;
		height: 50%;
	}

	.left__buttom {
		display: flex;
		/* background-color: rgb(39, 241, 29); */
		width: 100%;
		height: 50%;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.left__buttom span {
		font-size: 20px;
	}

	.main__right {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30%;
		height: 100%;
		/* background-color: blue; */
	}

	.main__right img {
		width: 100%;
		height: auto;
	}
</style> -->
