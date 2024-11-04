import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async ({
    price,
    products,
    shippingFee,
    items,
    shippingInfo,
    userId,
    navigate,
  }) => {
    try {
      const { data } = await api.post('/home/order/place-order', {
        price,
        products,
        shippingFee,
        items,
        shippingInfo,
        userId,
        navigate,
      })

      navigate('/payment', {
        state: {
          price: price + shippingFee,
          orderId: data.orderId,
          items,
        },
      })
    } catch (error) {
      console.log(error.response)
    }
  }
)

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-orders/${customerId}/${status}`
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-order-details/${orderId}`
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const orderReducer = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    order: {},
    errorMessage: '',
    successMessage: '',
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.orders = payload.orders
      })
      .addCase(getOrderDetails.fulfilled, (state, { payload }) => {
        state.order = payload.order
      })
  },
})

export const { messageClear } = orderReducer.actions
export default orderReducer.reducer
