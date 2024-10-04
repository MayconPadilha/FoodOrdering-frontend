<script>
	// @ts-nocheck
	import ShoppingTrolleyItem from '$components/ShoppingTrolleyItem.svelte';
	import { cartStore } from '$lib/stores.js';
	import { clearCart } from '$lib/utils/cartHandler';
	import { derived } from 'svelte/store';
	import { getCartTotal } from '$lib/utils/cartHandler';
	import Delivery from '$components/delivery/Delivery.svelte';
	import Payment from '$components/payment/Payment.svelte';

	let step = 1;

	function goToNextStep() {
		step++;
	}

	function goToPrevStep() {
		step--;
	}

	const total = derived(cartStore, ($array) =>
		$array.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)
	);

	function handleSend(event) {
		event.preventDefault(); // Impede o comportamento padrão do formulário

		const data = new FormData(event.target); // Cria um FormData a partir do formulário
		const obj = {};

		// Converte o FormData em um objeto
		data.forEach((value, key) => {
			obj[key] = value;
		});

		console.log(obj); // Exibe os dados no console

		// console.log(formData);
		// try {
		//     const response = await fetch('/api/criar-pedido', {
		//         method: 'POST',
		//         headers: { 'Content-Type': 'application/json' },
		//         body: JSON.stringify({
		//             form,
		//         })
		//     });
		// } catch (error) {
		//     console.error('Erro ao processar a mensagem:', error);
		// }
	}
</script>

<form on:submit={handleSend}>
	{#if step === 1}
		<div>
			<p>Conteúdo da etapa 1</p>

			<div class="flex flex-col h-fit w-auto m-4 items-center gap-2">
				<div
					class="flex flex-col gap-4 p-4 w-full md:w-1/2 lg:w-1/3 rounded-lg text-white dark:bg-gray-800"
				>
					{#each $cartStore as item}
						<ShoppingTrolleyItem {item} />
					{/each}
					<div class="flex flex-row-reverse">
						<h3 class="font-bold">Total: R$ {$getCartTotal}</h3>
					</div>
				</div>
				<div class="flex flex-row gap-1 p-1 w-full md:w-1/2 lg:w-1/3 justify-between h-auto">
					<a href="/" class="w-full">
						<button
							class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
							on:click={clearCart}
						>
							Limpar Carrinho
						</button>
					</a>

					<button
						on:click={goToNextStep}
						class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Continuar
					</button>
				</div>
			</div>
		</div>
	{/if}

	{#if step === 2}
		<div>
			<p>Conteúdo da etapa 2</p>
			<Delivery />
			<button
				on:click={goToPrevStep}
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>Anterior {step - 1}</button
			>

			<button
				on:click={goToNextStep}
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Proximo {step + 1}
			</button>
		</div>
	{/if}

	{#if step === 3}
		<div>
			<p>Conteúdo da etapa 3</p>
			<Payment />
			<button
				on:click={goToPrevStep}
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>Anterior {step - 1}</button
			>

			<button
				on:click={goToNextStep}
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Proximo {step}
			</button>
		</div>
	{/if}

	<button
		type="submit"
		class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
	>
		salvar tudo {step}
	</button>
</form>
