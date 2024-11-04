import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const addToCard = createAsyncThunk(
  'card/addToCard',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/home/product/add-to-card', info)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getCardProducts = createAsyncThunk(
  'card/getCardProducts',
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-card-products/${userId}`
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteCardProduct = createAsyncThunk(
  'card/deleteCardProduct',
  async (cardId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-card-product/${cardId}`
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const quantityIncrement = createAsyncThunk(
  'card/quantityIncrement',
  async (cardId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-inc/${cardId}`)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const quantityDecrement = createAsyncThunk(
  'card/quantityDecrement',
  async (cardId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-dec/${cardId}`)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const addToWishList = createAsyncThunk(
  'wishlist/addToWishList',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/home/product/add-to-wishList', info)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getWishListProducts = createAsyncThunk(
  'wishlist/getWishListProducts',
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-wishlist-products/${userId}`
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const removeWishList = createAsyncThunk(
  'wishlist/removeWishList',
  async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/remove-wishlist-product/${wishlistId}`
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const cardReducer = createSlice({
  name: 'card',
  initialState: {
    cardProducts: [],
    cardProductCount: 0,
    wishListCount: 0,
    wishList: [],
    price: 0,
    errorMessage: '',
    successMessage: '',
    shippingFee: 0,
    outOfStockProducts: [],
    buyProductItem: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
    resetCount: (state) => {
      state.cardProductCount = 0
      state.wishListCount = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCard.rejected, (state, { payload }) => {
        state.errorMessage = payload.error
      })
      .addCase(addToCard.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
        state.cardProductCount = state.cardProductCount + 1
      })
      .addCase(getCardProducts.fulfilled, (state, { payload }) => {
        state.cardProducts = payload.cardProducts
        state.price = payload.price
        state.cardProductCount = payload.cardProductCount
        state.shippingFee = payload.shippingFee
        state.outOfStockProducts = payload.outOfStockProducts
        state.buyProductItem = payload.buyProductItem
      })
      .addCase(deleteCardProduct.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
      })
      .addCase(quantityIncrement.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
      })
      .addCase(quantityDecrement.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
      })
      .addCase(addToWishList.rejected, (state, { payload }) => {
        state.errorMessage = payload.error
      })
      .addCase(addToWishList.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
        state.wishListCount =
          state.wishListCount > 0 ? state.wishListCount + 1 : 1
      })
      .addCase(getWishListProducts.fulfilled, (state, { payload }) => {
        state.wishList = payload.wishList
        state.wishListCount = payload.wishListCount
      })
      .addCase(removeWishList.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
        state.wishList = state.wishList.filter(
          (p) => p._id !== payload.wishlistId
        )
        state.wishListCount = state.wishListCount - 1
      })
  },
})

export const { messageClear, resetCount } = cardReducer.actions
export default cardReducer.reducer
