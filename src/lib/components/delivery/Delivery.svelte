<script>
	import { order } from '$lib/stores';

	// Definindo variáveis para os campos do formulário
	let name = '';
	let zipCode = '';
	let street = '';
	let number = '';
	let complement = '';
	let neighborhood = '';
	let city = '';

	// Função para lidar com o envio do formulário
	function handleSubmit() {
		// Atualizar o store order com os dados do formulário
		order.update(o => ({
			...o,
			delivery_address: {
				street,
				number,
				complement,
				neighborhood,
				city,
				zipCode
			},
			updated_at: new Date()
		}));

		// Aqui você pode enviar os dados para um servidor ou processá-los conforme necessário
		alert('Formulário enviado com sucesso!');
		
		// Usar subscribe para acessar o valor atualizado do store
		order.subscribe(updatedOrder => {
			console.log('Formulário:', name, zipCode, street, number, complement, neighborhood, city);
			console.log('Order atualizado:', updatedOrder);
		})();
	}

	// Função para buscar dados de endereço pelo CEP
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
						number = data.numero || '';
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
		on:submit|preventDefault={handleSubmit}
		class="flex flex-col gap-4 p-4 w-full max-w-full md:w-1/2 lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow"
	>
		<h2 class="text-xl font-bold mb-4 text-white">Detalhes de Entrega</h2>

		<label class="flex flex-col text-white">
			Nome do Destinatário
			<input type="text" bind:value={name} required class="p-2 border rounded text-black" />
		</label>

		<label class="flex flex-col text-white">
			CEP
			<input
				type="text"
				bind:value={zipCode}
				required
				class="p-2 border rounded text-black"
				on:blur={fetchAddressByZipCode}
			/>
		</label>

		<label class="flex flex-col text-white">
			Rua
			<input type="text" bind:value={street} required class="p-2 border rounded text-black" />
		</label>

		<label class="flex flex-col text-white">
			Número
			<input type="text" bind:value={number} required class="p-2 border rounded text-black" />
		</label>

		<label class="flex flex-col text-white">
			Complemento
			<input type="text" bind:value={complement} class="p-2 border rounded text-black" />
		</label>

		<label class="flex flex-col text-white">
			Bairro
			<input type="text" bind:value={neighborhood} required class="p-2 border rounded text-black" />
		</label>

		<label class="flex flex-col text-white">
			Cidade
			<input type="text" bind:value={city} required class="p-2 border rounded text-black" />
		</label>

		<button type="submit" class="bg-blue-500 text-white p-2 rounded">Enviar</button>
	</form>
</div>
