import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const apiUrl = "https://api.giphy.com/v1/gifs";

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

interface GifState {
  gifs: Gif[];
  hasMore: boolean;
  offset: number;
}

const initialState: GifState = {
  gifs: [],
  hasMore: true,
  offset: 0,
};

export const fetchGifs = createAsyncThunk(
  "gifs/fetchGifs",
  async ({
    query,
    offset,
    reset,
  }: {
    query: string;
    offset: number;
    reset: boolean;
  }) => {
    const response = await axios.get(`${apiUrl}/search`, {
      params: {
        api_key: apiKey,
        q: query,
        limit: 10,
        offset,
      },
    });

    return { data: response.data, reset };
  }
);

const gifSlice = createSlice({
  name: "gifs",
  initialState,
  reducers: {
    resetOffset: (state) => {
      state.offset = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchGifs.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: { data: Gif[]; pagination: { total_count: number } };
          reset: boolean;
        }>
      ) => {
        if (action.payload.reset) {
          state.gifs = action.payload.data.data;
        } else {
          state.gifs = [...state.gifs, ...action.payload.data.data];
        }
        state.hasMore =
          action.payload.data.pagination.total_count > state.offset;
        state.offset += action.payload.data.data.length;
      }
    );
  },
});

export const { resetOffset } = gifSlice.actions;

export const selectGifs = (state: { gifs: GifState }) => state.gifs;

export default gifSlice.reducer;
