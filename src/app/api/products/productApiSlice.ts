import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import enviroments from "~/app/config/enviroments";
import { RootState } from "~/app/store";
import { APIProductIndex } from "./productApiTypes";

export const productoApiSlice = createApi({
    reducerPath: "productoApi",
    baseQuery: retry(
        fetchBaseQuery({
            baseUrl: enviroments.API_URL,
            prepareHeaders(headers, { getState }) {
                // puedes usarlo para authenicacion. debes poner un token en el estado gl0bal auth
                const token = (getState() as RootState).counter.value;
                if (token === 2) {
                    headers.set("Authorization", `Bearer ${token}`);
                }
                return headers;
            },
        }),
        {
            maxRetries: 2,
            // backoff: numero de los seg que e}ndra cada rety
        } // importando retry puedes personalizar los retrys de error
    ),
    tagTypes: ["products"],
    endpoints: (builder) => ({
        productsIndex: builder.query<APIProductIndex[], void>({
            query: () => `/products`,
            // providesTags: ["products"],
            keepUnusedDataFor: 10, // mantiene fresco en segundos - defaul=para siempre
        }),
        productsCreate: builder.mutation<
            any,
            { nombre: string; imagen: string }
        >({
            query: (data) => ({
                url: "/products",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["products"],
        }),
        productsDelete: builder.mutation<any, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, err, id) => {
                // return [{ type: "products", id }]; -- no hacer fetching cuando el id de ese} cambie
                return [{ type: "products" }];
            },
            extraOptions: { maxRetries: 0 },
        }),
    }),
});

export const {
    useProductsIndexQuery,
    useProductsCreateMutation,
    useProductsDeleteMutation,
} = productoApiSlice;
