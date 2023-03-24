import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  token: string | null;
}
const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
  } as TokenState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    removeToken(state) {
      state.token = null;
    },
  },
});
export const { setToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
