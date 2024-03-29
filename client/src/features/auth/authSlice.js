import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  CONSTANT VARIABLES
*/

//if window.localStorage('token3') is corrupt or was
//set with a different JWT secret 
//auth will fail no matter what so we have to find
//a way to delete it
const TOKEN = 'mancalaToken';   //original 'token' key in  localStorage was somehow corrupt

/*
  THUNKS
*/
export const me = createAsyncThunk('auth/me', async () => {
  const token = window.localStorage.getItem(TOKEN);

  //console.log('in slice')
  try {
    if (token) {
      const res = await axios.get('/auth/me', {
        headers: {
          authorization: token,
        },
      });

      console.log('zzzzzzzzz',res.data);
      return res.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      //return thunkAPI.rejectWithValue(err.response.data);
      return err.response.data
    } else {
      return 'There was an issue with your request.';
    }
  }
});

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async ({ username, password, method }, thunkAPI) => {
    try {
      
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me());
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return 'There was an issue with your request.';
      }
    }
  }
);

/*
  SLICE
*/
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    me: {},
    error: null,
  },
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem(TOKEN);
      state.me = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
      console.log('got here',state.me);
    });
    builder.addCase(me.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

/*
  ACTIONS
*/
export const { logout } = authSlice.actions;

/*
  REDUCER
*/
export default authSlice.reducer;
