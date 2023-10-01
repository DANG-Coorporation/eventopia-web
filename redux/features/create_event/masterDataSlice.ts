import {
  getFormatsEvent,
  getTopicsEvent,
} from "@/api/eventopia_api/create_event_api";
import { apiStatus } from "@/common/constants/api_status";
import { IMasterDataState } from "@/common/interface/mastedData.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFormats = createAsyncThunk(
  "masterData/fetchFormats",
  async () => {
    try {
      const response = await getFormatsEvent();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchTopics = createAsyncThunk(
  "masterData/fetchTopics",
  async () => {
    try {
      const response = await getTopicsEvent();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState: IMasterDataState = {
  statusApiFormats: apiStatus.IDLE,
  formats: [],
  statusApiTopics: apiStatus.IDLE,
  topics: [],
  statusApiProvinces: apiStatus.IDLE,
  provinces: [],
  statusApiCities: apiStatus.IDLE,
  cities: [],
};

const masterDataSlice = createSlice({
  name: "masterData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormats.pending, (state) => {
        state.statusApiFormats = apiStatus.LOADING;
      })
      .addCase(fetchFormats.fulfilled, (state, action) => {
        state.statusApiFormats = apiStatus.SUCCESS;
        state.formats = action.payload.data;
      })
      .addCase(fetchFormats.rejected, (state) => {
        state.statusApiFormats = apiStatus.IDLE;
      });
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.statusApiTopics = apiStatus.LOADING;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.statusApiTopics = apiStatus.SUCCESS;
        state.topics = action.payload.data;
      })
      .addCase(fetchTopics.rejected, (state) => {
        state.statusApiTopics = apiStatus.IDLE;
      });
  },
});

export default masterDataSlice.reducer;
