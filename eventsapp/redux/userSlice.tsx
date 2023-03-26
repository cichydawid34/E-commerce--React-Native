import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  token: string | null;
  loading: boolean;
}
const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    loading: false,
  } as userState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    removeToken(state) {
      state.token = null;
    },
  },
});
export const { setToken, removeToken } = userSlice.actions;
export default userSlice.reducer;
