import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { productoApiSlice } from "./api/products/productApiSlice";
import cartSlice from "./store/cart/cartSlice";
import counterSlice from "./store/counter/counterSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        car: cartSlice.reducer,
        [productoApiSlice.reducerPath]: productoApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productoApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;
