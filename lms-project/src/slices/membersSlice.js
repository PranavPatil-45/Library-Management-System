import React from 'react'
import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'

export const fetchMembers = createAsyncThunk('members/fetchMembers', async () => {
  const response = await fetch('http://localhost:3000/members')
  return response.json()
})

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false
        state.members = action.payload
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})



export default membersSlice.reducer

  


