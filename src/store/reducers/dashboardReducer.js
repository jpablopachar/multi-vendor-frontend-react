import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const getDashboardData = createAsyncThunk(
  'dashboard/getDashboardData',
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-dashboard-data/${userId}`
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState: {
    recentOrders: [],
    errorMessage: '',
    successMessage: '',
    totalOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDashboardData.fulfilled, (state, { payload }) => {
      state.totalOrders = payload.totalOrders
      state.pendingOrders = payload.pendingOrders
      state.cancelledOrders = payload.cancelledOrders
      state.recentOrders = payload.recentOrders
    })
  },
})

export const { messageClear } = dashboardReducer.actions
export default dashboardReducer.reducer
