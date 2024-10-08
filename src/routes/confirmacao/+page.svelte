<script>
	// @ts-nocheck
	import ShoppingTrolleyItem from '$components/ShoppingTrolleyItem.svelte';
	import { cartStore } from '$lib/stores.js';
	import { clearCart, getCartTotal } from '$lib/utils/cartHandler';

	let zipCode = '', street = '', complement = '', neighborhood = '', city = '';

	let step = 1;
	let paymentType = 'cartao';

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
			<div class="flex flex-col gap-4 p-4 w-full md:w-1/2 lg:w-1/3 rounded-lg bg-white shadow-lg">
				{#each $cartStore as item}
					<ShoppingTrolleyItem {item} />
				{/each}
				<div class="flex flex-row-reverse">
					<p class="font-normal">Total: R$ {$getCartTotal}</p>
				</div>
			</div>
			<div class="flex flex-row gap-1 p-1 w-full md:w-1/2 lg:w-1/3 justify-between h-auto">
				<a href="/" class="w-full">
					<button class="w-full text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2 text-center" on:click={clearCart}>
						Limpar Carrinho
					</button>
				</a>
				<button on:click={goToNextStep} class="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center">
					Continuar
				</button>
			</div>
		</div>
    </div>

    <div class="{step === 2 ? 'block' : 'hidden'}">
        <div class="flex flex-col h-fit w-auto m-4 items-center gap-2">
            <div class="flex flex-col gap-4 p-4 w-full md:w-1/2 lg:w-1/3 rounded-lg bg-white shadow-lg">
				<h2 class="text-xl font-bold mb-4">Detalhes de Entrega</h2>
				<label class="flex flex-col">Nome do Destinatário
					<input type="text" name="name" required class="p-2 border rounded text-black" />
				</label>
				<label class="flex flex-col">CEP
					<input type="text" name="zipCode" bind:value={zipCode} required class="p-2 border rounded text-black" on:blur={fetchAddressByZipCode} />
				</label>
				<label class="flex flex-col">Rua
					<input type="text" name="street" bind:value={street} required class="p-2 border rounded text-black" />
				</label>
				<label class="flex flex-col">Número
					<input type="text" name="number" required class="p-2 border rounded text-black" />
				</label>
				<label class="flex flex-col">Complemento
					<input type="text" name="complement" bind:value={complement} class="p-2 border rounded text-black" />
				</label>
				<label class="flex flex-col">Bairro
					<input type="text" name="neighborhood" bind:value={neighborhood} required class="p-2 border rounded text-black" />
				</label>
				<label class="flex flex-col">Cidade
					<input type="text" name="city" bind:value={city} required class="p-2 border rounded text-black" />
				</label>
			</div>
            <div class="flex flex-row gap-1 p-1 w-full md:w-1/2 lg:w-1/3 justify-between h-auto">
                <button on:click={goToPrevStep} class="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center">
                    Voltar
                </button>
                <button on:click={goToNextStep} class="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center">
                    Continuar
                </button>
            </div>
        </div>
    </div>

    <div class="{step === 3 ? 'block' : 'hidden'}">
        <div>
            <div class="flex flex-col h-fit w-auto m-4 items-center gap-2">
                <div class="flex flex-row gap-4 p-4 w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg">
                    <button class="{paymentType === 'cartao' ? 'rounded-6px] border-2 border-[#b91c1c]' : ''} select-none justify-center content-center w-full p-2 rounded flex flex-col items-center bg-white cursor-pointer" on:click={() => handlePaymentSelection('cartao')}>
                        <div class="flex justify-center h-5">
                            <img src="/image/paymentCredit.svg" alt="Forma de Pagamento" />
                        </div>
                        <p class="h-5">Cartão</p>
                    </button>
                    <button class="{paymentType === 'dinheiro' ? 'rounded-[6px] border-2 border-[#b91c1c]' : ''} select-none justify-center content-center p-2 w-full rounded flex flex-col items-center bg-white" on:click={() => handlePaymentSelection('dinheiro')}>
                        <div class="flex justify-center h-5">
                            <img class="h-4" src="/image/paymentCash.svg" alt="Forma de Pagamento" />
                        </div>
                        <p class="h-5">Dinheiro</p>
                    </button>
                </div>

                <div class="{paymentType === 'cartao' ? 'block' : 'hidden'} flex flex-col gap-4 p-4 w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg">
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
							<li>
								<label>
									<input type="radio" name="payment-method" value="American Express (crédito)" />
									American Express (crédito)
								</label>
							</li>
							<li>
								<label>
									<input type="radio" name="payment-method" value="Elo (crédito)" />
									Elo (crédito)
								</label>
							</li>
							<li>
								<label>
									<input type="radio" name="payment-method" value="Hipercard (crédito)" />
									Hipercard (crédito)
								</label>
							</li>
							<li>
								<label>
									<input type="radio" name="payment-method" value="Visa (débito)" />
									Visa (débito)
								</label>
							</li>
							<li>
								<label>
									<input type="radio" name="payment-method" value="Mastercard (débito)" />
									Mastercard (débito)
								</label>
							</li>
							<li>
								<label>
									<input type="radio" name="payment-method" value="PayPal" />
									PayPal
								</label>
							</li>
						</ul>
					</div>					
                </div>

                <div class="{paymentType === 'dinheiro' ? 'block' : 'hidden'} flex flex-col gap-4 p-4 w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg ">
					<label>Troco
						<input type="number" name="troco" placeholder="0,00" class="p-2 border rounded text-black" />
					</label>
                </div>
				<div class="flex flex-row gap-1 p-1 w-full md:w-1/2 lg:w-1/3 justify-between h-auto">
					<button on:click={goToPrevStep} class="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center">
						Voltar
					</button>
					<button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center">
						Finalizar Compra
					</button>
				</div>
            </div>
        </div>
    </div>
</form>
