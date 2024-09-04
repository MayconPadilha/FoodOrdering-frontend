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
  payment_method: String, // "credit_card", "debit_card", "pix", etc.
  status: String, // "pending", "preparing", "out_for_delivery", "delivered", "cancelled"
  created_at: Date,
  updated_at: Date,
  estimated_delivery_time: Date,
  actual_delivery_time: Date,
  notes: String,
  cnpj: String
}