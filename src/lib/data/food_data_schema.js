const product_schema = {
  _id: ObjectId,
  name: String,
  description: String,
  base_price: parseFloat,
  category: String, // 'burger', 'pizza', 'xis', etc.
  image_url: String,
  is_available: Boolean,
  options: {
    removable_items: [
      {
        name: String,
        price_impact: parseFloat // 0 ou negativo
      }
    ],
    additional_items: [
      {
        name: String,
        price: parseFloat
      }
    ],
    required_choices: [
      {
        name: String,
        options: [
          {
            name: String,
            price: parseFloat
          }
        ],
        min_choices: Number,
        max_choices: Number
      }
    ]
  }
}

const product_burguer = {
  _id: ObjectId("5f8a7b2c1c9d440000a1b2c3"),
  name: "Hambúrguer Clássico",
  description: "Hambúrguer com carne, queijo, alface e tomate",
  base_price: 15.99,
  category: "Hambúrgueres",
  image_url: "https://exemplo.com/imagens/hamburguer-classico.jpg",
  is_available: true,
  options: {
    removable_items: [
      { name: "Alface", price_impact: 0 },
      { name: "Tomate", price_impact: 0 },
      { name: "Cebola", price_impact: 0 }
    ],
    additional_items: [
      { name: "Queijo Cheddar", price: 2.50 },
      { name: "Carne Extra", price: 5.00 },
      { name: "Bacon", price: 3.00 }
    ],
    required_choices: []
  }
}

const product_pizza = {
  _id: ObjectId("5f8a7b2c1c9d440000a1b2c4"),
  name: "Pizza Personalizada",
  description: "Monte sua pizza com até 2 sabores",
  base_price: 30.00,
  category: "Pizzas",
  image_url: "https://exemplo.com/imagens/pizza-personalizada.jpg",
  is_available: true,
  options: {
    removable_items: [
      
    ],
    additional_items: [
      { name: "Borda Recheada", price: 5.00 },
      { name: "Extra Queijo", price: 4.00 }
    ],
    required_choices: [
      {
        name: "Sabores",
        options: [
          { name: "Mussarela", price: 0 },
          { name: "Calabresa", price: 0 },
          { name: "Frango com Catupiry", price: 2.00 },
          { name: "Quatro Queijos", price: 3.00 }
        ],
        min_choices: 1,
        max_choices: 2
      }
    ]
  }
}

const user_schema = {
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String, // 'admin', 'staff', 'customer'
  address: {
    street: String,
    number: String,
    complement: String, // (opcional)
    neighborhood: String,
    city: String,
    zipCode: String,
  },
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  isActive: Boolean
}

const user_example = {
  _id: ObjectId("5f8a7b2c1c9d440000a1b2c5"),
  name: "João Silva",
  email: "joao.silva@email.com",
  password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM7nh5QDWra6ZC4dszg.", // Hash
  phone: "+55 51 98765-4321",
  role: "customer",
  address: {
    street: "Rua das Flores",
    number: "123",
    complement: "Apto 45",
    neighborhood: "Jardim Primavera",
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
    zipCode: "01234-567",
  },
  createdAt: ISODate("2023-03-15T10:30:00Z"),
  updatedAt: ISODate("2023-03-15T10:30:00Z"),
  lastLogin: ISODate("2023-03-15T14:45:00Z"),
  isActive: true
}

const order = {
  _id: ObjectId,
  customer_name: String,
  customer_phone: String,
  customer_id: ObjectId, // Opcional, referência ao usuário se estiver cadastrado
  items: [
    {
      product_id: ObjectId, // Referência ao produto
      name: String,
      quantity: Number,
      unit_price: parseFloat,
      options: {
        removable_items: [
          {
            name: String,
            price_impact: parseFloat // 0 ou negativo
          }
        ],
        additional_items: [
          {
            name: String,
            price: parseFloat
          }
        ],
        required_choices: [
          {
            name: String,
            selected_options: [
              {
                name: String,
                price: parseFloat
              }
            ]
          }
        ]
      }
    }
  ],
  total_price: parseFloat,
  delivery_address: {
    street: String,
    number: String,
    complement: String,
    neighborhood: String,
    city: String,
    zipCode: String,
  },
  payment: {
    payment_method: String, // "credit_card", "debit_card", "pix", etc.
    troco: String,
  },
  status: String, // "pending", "preparing", "out_for_delivery", "delivered", "cancelled"
  created_at: Date,
  updated_at: Date,
  estimated_delivery_time: Date,
  actual_delivery_time: Date,
  notes: String,
  cnpj: String
}
