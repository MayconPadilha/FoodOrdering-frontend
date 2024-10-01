<script>
	import { writable } from 'svelte/store';

	// Definindo stores para os campos do formulário
	const name = writable('');
	const zipCode = writable('');
	const street = writable('');
	const number = writable('');
	const complement = writable('');
	const neighborhood = writable('');
	const city = writable('');

	// Função para lidar com o envio do formulário
	function handleSubmit() {
		const delivery_address = {
			name: $name,
			zipCode: $zipCode,
			street: $street,
			number: $number,
			complement: $complement,
			neighborhood: $neighborhood,
			city: $city
		};

		console.log('Delivery Address:', delivery_address);

		// Aqui você pode enviar os dados para um servidor ou processá-los conforme necessário
		alert('Formulário enviado com sucesso!');
	}

	// Função para buscar dados de endereço pelo CEP
	async function fetchAddressByZipCode() {
		if ($zipCode.length === 9) {
			$zipCode = $zipCode.replace('-', '');
		}

		if ($zipCode.length === 8) {
			try {
				const response = await fetch(`https://viacep.com.br/ws/${$zipCode}/json/`);
				if (response.ok) {
					const data = await response.json();
					if (!data.erro) {
						street.set(data.logradouro || '');
						neighborhood.set(data.bairro || '');
						city.set(data.localidade || '');
                        complement.set(data.complemento || '');
                        number.set(data.numero || '');
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
</script>

<div class="flex flex-col h-fit w-auto m-4 items-center gap-2">
	<form
		on:submit={handleSubmit}
		class="flex flex-col gap-4 p-4 w-full max-w-full md:w-1/2 lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow"
	>
		<h2 class="text-xl font-bold mb-4 text-white">Detalhes de Entrega</h2>

		<label class="flex flex-col text-white">
			Nome do Destinatário
			<input type="text" bind:value={$name} required class="p-2 border rounded text-black" />
		</label>

		<label class="flex flex-col text-white">
			CEP
			<input
				type="text"
				bind:value={$zipCode}
				required
				class="p-2 border rounded text-black"
				on:blur={fetchAddressByZipCode}
			/>
		</label>

		<label class="flex flex-col text-white">
			Rua
			<input type="text" bind:value={$street} required class="p-2 border rounded text-black" />
		</label>

		<label class="flex flex-col text-white">
			Número
			<input type="text" bind:value={$number} required class="p-2 border rounded text-black" />
		</label>

		<label class="flex flex-col text-white">
			Bairro
			<input type="text" bind:value={$neighborhood} required class="p-2 border rounded text-black" />
		</label>

		<label class="flex flex-col text-white">
			Cidade
			<input type="text" bind:value={$city} required class="p-2 border rounded text-black" />
		</label>

        <label class="flex flex-col text-white">
			Complemento
			<input bind:value={$complement} class="p-2 border rounded text-black" />
		</label>

		<button
			type="submit"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			Continuar
		</button>
	</form>
</div>
