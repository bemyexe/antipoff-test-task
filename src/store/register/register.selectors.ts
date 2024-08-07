import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

import { IRegisterState } from './register.slice';

const selectRegisterState: (state: RootState) => IRegisterState = (state) =>
  state.registerState;

const selectRegisterLoading = createSelector(
  selectRegisterState,
  (state) => state.registerLoading
);
const selectRegisterError = createSelector(
  selectRegisterState,
  (state) => state.registerError
);
const selectRegisterSuccess = createSelector(
  selectRegisterState,
  (state) => state.registerSuccess
);

export const registerSelectors = {
  selectRegisterLoading,
  selectRegisterError,
  selectRegisterSuccess,
};
