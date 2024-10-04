<script>
	//@ts-nocheck
	import { writable } from 'svelte/store';

	const paymentType = writable('maquininha');

	const handlePaymentSelection = (type) => {
		paymentType.set(type);
	};

	// Função para lidar com o envio do formulário
	function handleSubmit(event) {
		event.preventDefault();

		const trocoInput = event.target.querySelector('input[name="troco"]');
		const selectedPaymentMethod = event.target.querySelector(
			'input[name="payment-method"]:checked'
		);

		const payment_method = {
			method: selectedPaymentMethod ? selectedPaymentMethod.value : 'Dinheiro',
			value: trocoInput ? trocoInput.value : null
		};

		console.log('Detalhes do pagamento selecionado:', payment_method);
		alert(
			`Método de pagamento selecionado: ${payment_method.method} ${trocoInput ? ' - Troco para: ' + payment_method.value : ''}`
		);
	}
</script>

<div class="flex flex-col h-fit w-auto m-4 items-center gap-2">
	<div
		class="flex flex-row gap-4 p-4 w-full md:w-1/2 lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow"
	>
		<button
			class="select-none justify-center content-center w-full rounded flex flex-col items-center bg-white cursor-pointer"
			on:click={() => handlePaymentSelection('maquininha')}
		>
			<div class="icon flex justify-center w-5">
				<img src="/image/paymentCredit.svg" alt="Forma de Pagamento" />
			</div>
			<p>Maquininha</p>
		</button>

		<button
			class="select-none justify-center content-center w-full rounded flex flex-col items-center bg-white"
			on:click={() => handlePaymentSelection('dinheiro')}
		>
			<div class="icon flex justify-center w-5">
				<img src="/image/paymentCash.svg" alt="Forma de Pagamento" />
			</div>
			<p>Dinheiro</p>
		</button>
	</div>

	{#if $paymentType === 'maquininha'}
		<form
			on:submit|preventDefault={handleSubmit}
			class="flex flex-col gap-4 p-4 w-full md:w-1/2 lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow"
		>
			<div>
				<ul>
					<li>
						<label>
							<input type="radio" name="payment-method" value="Visa (crédito)" />
							<span>Visa (crédito)</span>
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="payment-method" value="Mastercard (crédito)" />
							<span>Mastercard (crédito)</span>
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="payment-method" value="Elo" />
							<span>Elo</span>
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="payment-method" value="Hipercard" />
							<span>Hipercard</span>
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="payment-method" value="Hiper" />
							<span>Hiper</span>
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="payment-method" value="Visa Electron (débito)" />
							<span>Visa Electron (débito)</span>
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="payment-method" value="M. Maestro (débito)" />
							<span>M. Maestro (débito)</span>
						</label>
					</li>
				</ul>
			</div>
			<button
				type="submit"
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Confirmar Pagamento
			</button>
		</form>
	{/if}

	{#if $paymentType === 'dinheiro'}
		<form
			on:submit|preventDefault={handleSubmit}
			class="flex flex-col gap-4 p-4 w-full md:w-1/2 lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow"
		>
			<div class="flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
				<label for="troco" class="mb-2">Troco para:</label>
				<input
					type="text"
					id="troco"
					name="troco"
					placeholder="Valor do troco"
					class="p-2 border rounded"
				/>
			</div>
			<button
				type="submit"
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Confirmar Pagamento
			</button>
		</form>
	{/if}
</div>
