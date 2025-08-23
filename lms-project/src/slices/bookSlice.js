import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Api Called By Request

const base_api = "http://localhost:3000/books";

//Here We Will fetxh Books dsata form api

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(base_api);
  return response.data;
});
// Here We Will Delete Books By Api
export const deleteBook = createAsyncThunk("books/deleteBook", async (bookId) => {
  await axios.delete(`${base_api}/${bookId}`);
  return bookId;
});


const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    
///Get Request/////
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    ///Delete Request/////
    builder
      .addCase(deleteBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = state.books.filter((book) => book.id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});







export default bookSlice.reducer;
