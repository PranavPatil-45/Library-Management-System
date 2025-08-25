import React from 'react'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Fetch members
export const fetchMembers = createAsyncThunk('members/fetchMembers', async () => {
  const response = await fetch('http://localhost:3000/members')
  return response.json()
})

// Add new member
export const addMember = createAsyncThunk(
  'members/addMember',
  async (newMember) => {
    const response = await fetch('http://localhost:3000/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMember),
    })
    return response.json()
  }
)

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchMembers
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

      // addMember
      .addCase(addMember.pending, (state) => {
        state.loading = true
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.loading = false
        state.members.push(action.payload) // add new member to state
      })
      .addCase(addMember.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default membersSlice.reducer
