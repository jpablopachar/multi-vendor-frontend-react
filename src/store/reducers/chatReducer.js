import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const addFriend = createAsyncThunk(
  'chat/addFriend',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        '/chat/customer/add-customer-friend',
        info
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        '/chat/customer/send-message-to-seller',
        info
      )

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const chatReducer = createSlice({
  name: 'chat',
  initialState: {
    friends: [],
    fb_messages: [],
    currentFriend: '',
    successMessage: '',
    errorMessage: '',
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
    updateMessage: (state, { payload }) => {
      state.fb_messages = [...state.fb_messages, payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFriend.fulfilled, (state, { payload }) => {
        state.fb_messages = payload.messages
        state.currentFriend = payload.currentFriend
        state.friends = payload.friends
      })
      .addCase(sendMessage.rejected, (state, { payload }) => {
        let tempFriends = state.friends
        let index = tempFriends.findIndex(
          (friend) => friend.fdId === payload.message.receiverId
        )

        while (index > 0) {
          let temp = tempFriends[index]

          tempFriends[index] = tempFriends[index - 1]
          tempFriends[index - 1] = temp
          index--
        }

        state.friends = tempFriends
        state.fb_messages = [...state.fb_messages, payload.message]
        state.successMessage = 'Message send successfully'
      })
  },
})

export const { messageClear, updateMessage } = chatReducer.actions
export default chatReducer.reducer
