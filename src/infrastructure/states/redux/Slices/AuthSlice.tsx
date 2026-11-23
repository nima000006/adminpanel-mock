import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type userType = {
  token: string;
  isUserValid: boolean;
};
const authInitialState: userType = {
  token: "",
  isUserValid: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setLocalUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isUserValid = true;
    },
    logoutUser: (state) => {
      state.token = "";
      state.isUserValid = false;
    },
  },
});

export default AuthSlice.reducer;
// eslint-disable-next-line react-refresh/only-export-components
export const { setLocalUser, logoutUser } = AuthSlice.actions;
