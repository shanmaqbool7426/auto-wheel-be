import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async ({ url, method = 'GET', body = null, key }, thunkAPI) => {
    const state = thunkAPI.getState();
    const existingData = state.data.entities[key];

    if (existingData && method === 'GET') {
      return thunkAPI.fulfillWithValue({ data: existingData, key, fromCache: true });
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      return { data, key };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'An error occurred while fetching data.');
    }
  }
);
