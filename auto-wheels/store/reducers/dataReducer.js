import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../thunks/fetchData';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    entities: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { data, key } = action.payload;
        state.entities[key] = data;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
