<script>
	import ShoppingTrolleyItem from '$components/ShoppingTrolleyItem.svelte';
	import { cartStore } from '$lib/stores.js';
</script>

<div class="flex flex-col h-fit w-auto m-4 items-center">
    <div class="flex flex-col w-1/4 gap-4 rounded-lg p-4 text-white dark:bg-gray-800">
        {#each $cartStore as item}
            <ShoppingTrolleyItem {item} />
        {/each}
    </div>
</div>
