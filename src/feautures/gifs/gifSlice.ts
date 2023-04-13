import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

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
