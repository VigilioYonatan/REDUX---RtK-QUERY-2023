import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface car {
    name: string;
}
export interface CartState {
    cart: car[];
}

const initialState: CartState = {
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addtocart: (state, action: PayloadAction<car>) => {
            state.cart = [...state.cart, action.payload];
        },
    },
});

export const { addtocart } = cartSlice.actions;
export default cartSlice;
