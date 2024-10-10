<script>
    import CardProdutos from "$components/CardProdutos.svelte";
    import { comidasData } from "$lib/data/comidas";

    export let categoryName;
    let categoriaDesejada = categoryName;
</script>

<section class="grid lg:grid-cols-2 md:grid-cols-1 gap-4 content-start justify-center">
    {#each comidasData as item}
        {#if item.category === categoriaDesejada}
            <CardProdutos {item} />
        {/if}
    {/each}
</section>
