import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type User } from "../../types/User";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://5306c0b5eb0e543f.mokky.dev/users");
  const data = await response.json();
  return data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [] as User[],
    selectedUser: null as null | User,
    isLoading: false,
    error: null as string | null,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateUserInfo: (state) => {
      console.log("тест");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { setSelectedUser, updateUserInfo } = usersSlice.actions;

export default usersSlice.reducer;
