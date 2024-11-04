import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'
import api from '../../api/api'

export const customerRegister = createAsyncThunk(
  'auth/customerRegister',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/customer/customer-register', info)

      localStorage.setItem('customerToken', data.token)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const customerLogin = createAsyncThunk(
  'auth/customerLogin',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/customer/customer-login', info)

      localStorage.setItem('customerToken', data.token)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const decodeToken = (token) => {
  if (!token) return ''

  const decodedToken = jwtDecode(token)

  return decodedToken
}

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    loader: false,
    userInfo: decodeToken(localStorage.getItem('customerToken')),
    errorMessage: '',
    successMessage: '',
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = ''
      state.successMessage = ''
    },

    userReset: (state) => {
      state.userInfo = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(customerRegister.pending, (state) => {
        state.loader = true
      })
      .addCase(customerRegister.rejected, (state, { payload }) => {
        state.errorMessage = payload.error
        state.loader = false
      })
      .addCase(customerRegister.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token)

        state.successMessage = payload.message
        state.loader = false
        state.userInfo = userInfo
      })
      .addCase(customerLogin.pending, (state) => {
        state.loader = true
      })
      .addCase(customerLogin.rejected, (state, { payload }) => {
        state.errorMessage = payload.error
        state.loader = false
      })
      .addCase(customerLogin.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token)

        state.successMessage = payload.message
        state.loader = false
        state.userInfo = userInfo
      })
  },
})

export const { messageClear, userReset } = authReducer.actions
export default authReducer.reducer
