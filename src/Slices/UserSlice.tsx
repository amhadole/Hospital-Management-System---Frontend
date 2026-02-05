import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { setJwt, removeJwt } from "./JwtSlice";

interface JwtPayload {
   sub: string;
  id: number;
  email: string;
  name: string;   
  role: string;
  iat: number;
  exp: number;
}

const initialState: JwtPayload | null =
  localStorage.getItem("token")
    ? jwtDecode<JwtPayload>(localStorage.getItem("token")!)
    : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setJwt, (_, action) => {
        return jwtDecode<JwtPayload>(action.payload);
      })
      .addCase(removeJwt, () => {
        return null;
      });
  },
});

export default userSlice.reducer;
