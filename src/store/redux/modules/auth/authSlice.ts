import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JwtResponseToken } from 'src/api/login/login';
import { findJwtToken, setJwtToken } from 'src/api/login/utils';
import { RootState } from 'src/store/redux/store';
import clog from 'src/utils/cuteLog';

const initialState = {
  token: (null as unknown) as JwtResponseToken
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<JwtResponseToken>) => {
      state.token = action.payload;
      setJwtToken(state.token);
    }
  }
});
export const { setToken } = authSlice.actions;
export const selectToken = (state: RootState) => {
  clog('Redux-JwtToken', 'info', state.auth)();
  return findJwtToken();
};

export default authSlice.reducer;
