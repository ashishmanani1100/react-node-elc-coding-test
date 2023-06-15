import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./Constants";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
   
    getSearchedProducts: builder.mutation({
      query: (params) => ({
        url: "data",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const {  useGetSearchedProductsMutation } = productsAPI;
