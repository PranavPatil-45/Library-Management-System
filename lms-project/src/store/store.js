import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../slices/bookSlice";
import memberReduces from "../slices/membersSlice";



export const store = configureStore({
  reducer: {
    books: bookReducer,
    members: memberReduces,
  },
});
