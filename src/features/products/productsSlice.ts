import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Products } from '../../types';
import { RootState } from '../../app/store';
import { getAllProducts } from '../../app/services/products';

interface ProductsState {
  products: Products[];
  status: 'idle' | 'loading' | 'failed';
  cart: Products[];
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  cart: [],
};

export const getProductsFromApi = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const data = await getAllProducts();
    return data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Products>) => {
      state.cart.push(action.payload);
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex(
        (p) => p.id === action.payload
      );
      state.cart = [
        ...state.cart.slice(0, index),
        ...state.cart.slice(index + 1),
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsFromApi.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getProductsFromApi.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getProductsFromApi.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { addProductToCart, removeProductFromCart } =
  productsSlice.actions;

export const selectProductsList = (state: RootState) =>
  state.products.products;

export const selectProductsState = (state: RootState) =>
  state.products;

export default productsSlice.reducer;
