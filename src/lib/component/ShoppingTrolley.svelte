<script>
	import { array } from '../data/store.js';
	import { derived, get } from 'svelte/store';

	// @ts-ignore
	const total = derived(array, ($array) => $array.reduce((sum, item) => sum + item.preco, 0));

	function mostrarLista() {
		// @ts-ignore
		let items = get(array);
		console.log(items);
	}
</script>

<div class="area">
    <div class="header">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z" clip-rule="evenodd"/>
        </svg>
        <span>Carrinho</span>
    </div>

    <div class="total">
        <p>Total: R$ {$total.toFixed(2)}</p>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" on:click={mostrarLista}>Comprar</button>
    </div>
</div>

<style>
    .area {
        display: flex;
        width: 30%;
        flex-direction: column;
        gap: 30px;
        border-radius: 8px;
        padding: 10px;
        color: #ffffff;
        background-color: rgb(17 24 39 / 1);
        height: 150px;
        justify-content: space-around;
    }

    .header {
        display: flex;
        gap: 5px;
    }

    .total {
        display: flex;
        justify-content: space-between;
    }

    .total p {
        font-weight: bold;
    }
</style>
