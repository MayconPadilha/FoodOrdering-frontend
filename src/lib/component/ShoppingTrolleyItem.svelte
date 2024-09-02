<script>
// @ts-nocheck

	import { derived, get } from 'svelte/store';
    import { array } from '../data/store.js';

    export let item;

    const quantidade = derived(array, ($array) => $array.filter(items => items.nome === item.nome).length);

    const valor = derived(array, ($array) => $array.filter(items => items.nome === item.nome).reduce((sum, item) => sum + item.preco, 0));

    let items = get(array);
		console.log(items);

    function mostrarLista() {
		let items = get(array);
		console.log(items);
	}

</script>

<div class="flex justify-between items-start gap-12">
    <div class="flex flex-col gap-2 font-bold">
        <h3 class="titulo">{$quantidade}x {item.nome} </h3>
        <p class="valor text-green-500">R$ {$valor.toFixed(2)}</p>
    </div>
    <button>X</button>
</div>
