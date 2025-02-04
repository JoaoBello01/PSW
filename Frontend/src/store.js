// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    categories: ['Entradas', 'Prato Principal', 'Sobremesa', 'Bebidas'],
    drinkSubCategories: ['Alcoólicas', 'Não Alcoólicas'],
    items: {
      entradas: [
        { id: 1, name: 'Bruschetta', price: 15.90 },
        { id: 2, name: 'Bolinhos de Queijo', price: 12.50 }
      ],
      principais: [
        { id: 3, name: 'Filé Mignon', price: 89.90 },
        { id: 4, name: 'Risoto de Cogumelos', price: 65.00 },
        { id: 5, name: 'Picanha Grelhada', price: 95.00 },
        { id: 6, name: 'Lasanha Bolonhesa', price: 45.00 }
      ],
      sobremesas: [
        { id: 7, name: 'Cheesecake', price: 25.00 },
        { id: 8, name: 'Mousse de Chocolate', price: 18.50 },
        { id: 9, name: 'Tiramisu', price: 22.00 },
        { id: 10, name: 'Pudim de Leite', price: 15.00 }
      ],
      bebidas: [
        { 
          id: 11, 
          name: 'Vinho Tinto', 
          subCategory: 'Alcoólicas',
          sizes: [
            { size: '300ml', price: 45.00 },
            { size: '750ml', price: 90.00 }
          ]
        },
        { 
          id: 12, 
          name: 'Cerveja Artesanal', 
          subCategory: 'Alcoólicas',
          sizes: [
            { size: '300ml', price: 18.00 },
            { size: '500ml', price: 25.00 }
          ]
        },
        { 
          id: 13, 
          name: 'Suco Natural', 
          subCategory: 'Não Alcoólicas',
          sizes: [
            { size: '300ml', price: 12.00 },
            { size: '500ml', price: 18.00 }
          ]
        },
        { 
          id: 14, 
          name: 'Água com Gás', 
          subCategory: 'Não Alcoólicas',
          sizes: [
            { size: '300ml', price: 8.00 },
            { size: '500ml', price: 12.00 }
          ]
        },
        { 
          id: 15, 
          name: 'Whisky', 
          subCategory: 'Alcoólicas',
          sizes: [
            { size: '50ml', price: 35.00 },
            { size: '100ml', price: 60.00 }
          ]
        },
        { 
          id: 16, 
          name: 'Refrigerante', 
          subCategory: 'Não Alcoólicas',
          sizes: [
            { size: '350ml', price: 10.00 },
            { size: '600ml', price: 15.00 }
          ]
        }
      ]
    }
  },
  reducers: {}
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.size === action.payload.size
      );
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          size: action.payload.size,
          quantity: action.payload.quantity
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => 
        !(item.id === action.payload.id && item.size === action.payload.size)
      );
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => 
        item.id === action.payload.id && 
        item.size === action.payload.size
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    cart: cartSlice.reducer
  }
});