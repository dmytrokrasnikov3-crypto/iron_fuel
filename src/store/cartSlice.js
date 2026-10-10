import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('ironfuel_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
        return [];
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCartFromStorage(),
    },
    reducers: {
        addToCart: (state, action) => {
            const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingIndex >= 0) {
                state.items[existingIndex].quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem('ironfuel_cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('ironfuel_cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = Math.max(1, quantity);
            }
            localStorage.setItem('ironfuel_cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('ironfuel_cart');
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;