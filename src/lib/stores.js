import { writable } from 'svelte/store';


export const cartStore = writable([]);

// Inicialize o objeto de ordem com campos padrão
const initialOrder = {
    _id: null,
    customer_name: '',
    customer_phone: '',
    customer_id: null, // Opcional, referência ao usuário se estiver cadastrado
    items: [],
    total_price: 0.0,
    delivery_address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      zipCode: '',
    },
    payment_method: '', // "credit_card", "debit_card", "pix", etc.
    status: 'pending', // "pending", "preparing", "out_for_delivery", "delivered", "cancelled"
    created_at: new Date(),
    updated_at: new Date(),
    estimated_delivery_time: null,
    actual_delivery_time: null,
    notes: '',
    cnpj: '',
  };
  
  // Crie um store para a ordem
  export const order = writable(initialOrder);