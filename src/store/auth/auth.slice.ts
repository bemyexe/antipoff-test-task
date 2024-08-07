import { createSlice } from '@reduxjs/toolkit';

import StorageService from '../../storage-services/auth-storage.service/auth-storage.service';

import { login, logout } from './auth.thunks';

export interface IAuthState {
  loginLoading: boolean;
  loginError: undefined | string;
  loginSuccess: boolean;
}

const AUTH_SLICE_NAME = 'auth-state';
const INITIAL_AUTH_STATE: IAuthState = {
  loginLoading: false,
  loginError: undefined,
  loginSuccess: false,
};

const authSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState: INITIAL_AUTH_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = undefined;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loginLoading = false;
        StorageService.setToken(payload.token);
        state.loginSuccess = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loginLoading = false;
        state.loginError = payload;
      })
      .addCase(logout, () => {
        StorageService.clearToken();
        return INITIAL_AUTH_STATE;
      });
  },
});

export const authReducer = authSlice.reducer;
