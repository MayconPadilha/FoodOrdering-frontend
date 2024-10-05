<script>
	// @ts-nocheck
	import ShoppingTrolleyItem from '$components/ShoppingTrolleyItem.svelte';
	import { cartStore } from '$lib/stores.js';
	import { clearCart, getCartTotal } from '$lib/utils/cartHandler';

	let zipCode = '', street = '', complement = '', neighborhood = '', city = '';

	let step = 1;
	let paymentType = 'maquininha';

	function goToNextStep() {
		event.preventDefault();
		step++;
	}

	function goToPrevStep() {
		event.preventDefault();
		step--;
	}

	async function fetchAddressByZipCode() {
		const cleanZipCode = zipCode.replace('-', '');
		if (cleanZipCode.length === 8) {
			try {
				const response = await fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`);
				if (response.ok) {
					const data = await response.json();
					if (!data.erro) {
						street = data.logradouro || '';
						neighborhood = data.bairro || '';
						city = data.localidade || '';
						complement = data.complemento || '';
					} else {
						alert('CEP não encontrado.');
					}
				} else {
					alert('Erro ao buscar o CEP.');
				}
			} catch (error) {
				console.error('Erro ao buscar o CEP:', error);
				alert('Erro ao buscar o CEP.');
			}
		} else {
			alert('CEP inválido. Insira um CEP com 8 dígitos.');
		}
	}

	function handleSend(event) {
		event.preventDefault();

		const data = new FormData(event.target);

		const obj = {};
		data.forEach((value, key) => {
			obj[key] = value;
		});	
	
		if (paymentType === 'dinheiro') {
			obj.payment_method = paymentType;
		} else {
			obj.troco = '';
		}

		obj.items = $cartStore.map(item => ({
			id: item.product_id,
			name: item.name,
			price: item.unit_price,
			quantity: item.quantity
		}));

		obj.total_price = $getCartTotal;

		console.log(obj);
	}

	const handlePaymentSelection = (type) => {
		event.preventDefault();
		paymentType = type;

		if (type === 'dinheiro') {
			uncheckAllRadios();
		}
	};

	function uncheckAllRadios() {
    const radioButtons = document.querySelectorAll('input[type="radio"][name="payment-method"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
}
</script>

<form on:submit={handleSend}>
    <div class="{step === 1 ? 'block' : 'hidden'}">
		<div class="flex flex-col h-fit w-auto m-4 items-center gap-2">
			<div class="flex flex-col gap-4 p-4 w-full md:w-1/2 lg:w-1/3 rounded-lg text-white dark:bg-gray-800">
				{#each $cartStore as item}
					<ShoppingTrolleyItem {item} />
				{/each}
				<div class="flex flex-row-reverse">
					<h3 class="font-bold">Total: R$ {$getCartTotal}</h3>
				</div>
			</div>
			<div class="flex flex-row gap-1 p-1 w-full md:w-1/2 lg:w-1/3 justify-between h-auto">
				<a href="/" class="w-full">
					<button class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" on:click={clearCart}>
						Limpar Carrinho
					</button>
				</a>
				<button on:click={goToNextStep} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Continuar
				</button>
			</div>
		</div>
    </div>

    <div class="{step === 2 ? 'block' : 'hidden'}">
        <div class="flex flex-col h-fit w-auto m-4 items-center gap-2">
            <div class="flex flex-col gap-4 p-4 w-full md:w-1/2 lg:w-1/3 rounded-lg text-white dark:bg-gray-800">
				<h2 class="text-xl font-bold mb-4 text-white">Detalhes de Entrega</h2>
				<label class="flex flex-col text-white">Nome do Destinatário
					<input type="text" name="name" required class="p-2 border rounded text-black" />
				</label>
				<label class="flex flex-col text-white">CEP
					<input type="text" name="zipCode" bind:value={zipCode} required class="p-2 border rounded text-black" on:blur={fetchAddressByZipCode} />
				</label>
				<label class="flex flex-col text-white">Rua
					<input type="text" name="street" bind:value={street} required class="p-2 border rounded text-black" />
				</label>
				<label class="flex flex-col text-white">Número
					<input type="text" name="number" required class="p-2 border rounded text-black" />
				</label>
				<label class="flex flex-col text-white">Complemento
					<input type="text" name="complement" bind:value={complement} class="p-2 border rounded text-black" />
				</label>
				<label class="flex flex-col text-white">Bairro
					<input type="text" name="neighborhood" bind:value={neighborhood} required class="p-2 border rounded text-black" />
				</label>
				<label class="flex flex-col text-white">Cidade
					<input type="text" name="city" bind:value={city} required class="p-2 border rounded text-black" />
				</label>
			</div>
            <div class="flex flex-row gap-1 p-1 w-full md:w-1/2 lg:w-1/3 justify-between h-auto">
                <button on:click={goToPrevStep} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Voltar
                </button>
                <button on:click={goToNextStep} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Continuar
                </button>
            </div>
        </div>
    </div>

    <div class="{step === 3 ? 'block' : 'hidden'}">
        <div>
            <div class="flex flex-col h-fit w-auto m-4 items-center gap-2">
                <div class="flex flex-row gap-4 p-4 w-full md:w-1/2 lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <button class="select-none justify-center content-center w-full rounded flex flex-col items-center bg-white cursor-pointer" on:click={() => handlePaymentSelection('maquininha')}>
                        <div class="icon flex justify-center w-5">
                            <img src="/image/paymentCredit.svg" alt="Forma de Pagamento" />
                        </div>
                        <p>Maquininha</p>
                    </button>
                    <button class="select-none justify-center content-center w-full rounded flex flex-col items-center bg-white" on:click={() => handlePaymentSelection('dinheiro')}>
                        <div class="icon flex justify-center w-5">
                            <img src="/image/paymentCash.svg" alt="Forma de Pagamento" />
                        </div>
                        <p>Dinheiro</p>
                    </button>
                </div>

                <div class="{paymentType === 'maquininha' ? 'block' : 'hidden'} flex flex-col gap-4 p-4 w-full md:w-1/2 lg:w-1/3 bg-white text-white dark:bg-gray-800 rounded-lg shadow">
					<div>
						<ul>
							<li>
								<label>
									<input type="radio" name="payment-method" value="Visa (crédito)" />
									Visa (crédito)
								</label>
							</li>
							<li>
								<label>
									<input type="radio" name="payment-method" value="Mastercard (crédito)" />
									Mastercard (crédito)
								</label>
							</li>
						</ul>
					</div>
                </div>

                <div class="{paymentType === 'dinheiro' ? 'block' : 'hidden'} flex flex-col gap-4 p-4 w-full md:w-1/2 lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow">
					<label class="text-white">Troco
						<input type="number" name="troco" placeholder="0,00" class="p-2 border rounded text-black" />
					</label>
                </div>
				<div class="flex flex-row gap-1 p-1 w-full md:w-1/2 lg:w-1/3 justify-between h-auto">
					<button on:click={goToPrevStep} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Voltar
					</button>
					<button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Finalizar Compra
					</button>
				</div>
            </div>
        </div>
    </div>
</form>
