import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type User } from "../../types/User";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (page: number) => {
  const response = await fetch(`https://backend-mysql-api.vercel.app/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page,
      limit: 5000,
    }),
  });
  const data = await response.json();
  return data;
});

export const updateUser = createAsyncThunk("users/updateUser", async (userData: User) => {
  try {
    const response = await fetch(`https://backend-mysql-api.vercel.app/api/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Ошибка при обновлении");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [] as User[],
    selectedUser: null as null | User,
    isLoading: false,
    error: null as string | null,
    updateStatus: "idle" as "idle" | "loading" | "success" | "failed",
    pagination: {
      page: 1,
      hasMore: true,
    },
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = [...state.list, ...action.payload.users];
        state.pagination.page += 1;
        state.pagination.hasMore = action.payload.hasMore;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.updateStatus = "success";
      });
  },
});

export const { setSelectedUser } = usersSlice.actions;

export default usersSlice.reducer;
