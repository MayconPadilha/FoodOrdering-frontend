<script>
	import ShoppingTrolleyItem from '$components/ShoppingTrolleyItem.svelte';
	import { cartStore } from '$lib/stores.js';
</script>

<div class="flex flex-col h-fit w-auto m-4 items-center gap-2">
    <div class="flex flex-col lg:w-1/4 md:w-4/4 gap-4 rounded-lg p-4 text-white dark:bg-gray-800">
        {#each $cartStore as item}
            <ShoppingTrolleyItem {item} />
        {/each}
    </div>
    <div>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Comprar </button>
    </div>
</div>
