import {
  getCities,
  getFormatsEvent,
  getProvinces,
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

export const fetchProvinces = createAsyncThunk(
  "masterData/fetchProvinces",
  async () => {
    try {
      const response = await getProvinces();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchCities = createAsyncThunk(
  "masterData/fetchCities",
  async (provinceId: number) => {
    try {
      const response = await getCities(provinceId);
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
        state.statusApiFormats = apiStatus.FAILED;
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
        state.statusApiTopics = apiStatus.FAILED;
      });
    builder
      .addCase(fetchProvinces.pending, (state) => {
        state.statusApiProvinces = apiStatus.LOADING;
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.statusApiProvinces = apiStatus.SUCCESS;
        state.provinces = action.payload.data;
      })
      .addCase(fetchProvinces.rejected, (state) => {
        state.statusApiProvinces = apiStatus.FAILED;
      });
    builder
      .addCase(fetchCities.pending, (state) => {
        state.statusApiCities = apiStatus.LOADING;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.statusApiCities = apiStatus.SUCCESS;
        state.cities = action.payload.data;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.statusApiCities = apiStatus.FAILED;
      });
  },
});

export default masterDataSlice.reducer;
