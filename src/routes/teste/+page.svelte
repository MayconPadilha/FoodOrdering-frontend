<script>
    import Delivery from "$components/delivery/Delivery.svelte";
	// Variáveis reativas e estado inicial
	let step = 1;

	// Funções para navegação entre etapas
	function goToNextStep() {
		step++;
	}

	function goToPrevStep() {
		step--;
	}
</script>

<div class="py-10">
	{#if step === 1}
		<div>
			<p>Conteúdo da etapa 1</p>

            <Delivery />

			<button on:click={goToNextStep} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				Proximo {step}
			</button>
		</div>
	{/if}

	{#if step === 2}
		<div>
			<p>Conteúdo da etapa 2</p>
			<button on:click={goToPrevStep} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Anterior {step-1}</button>
            
            <button on:click={goToNextStep} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				Proximo {step}
			</button>
		</div>
	{/if}

	{#if step === 3}
		<div>
			<p>Conteúdo da etapa 3</p>
			<button on:click={goToPrevStep} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Anterior {step-1}</button>
            
            <button on:click={goToNextStep} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				Proximo {step}
			</button>
		</div>
	{/if}
</div>
