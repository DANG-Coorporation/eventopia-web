import { getAddressSuggestions } from "@/api/openStreetMap/geo_os_map";
import { apiStatus } from "@/common/constants/api_status";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAddressSuggestions = createAsyncThunk(
  "openStreetMap/fetchAddressSuggestions",
  async (address: string) => {
    try {
      const response = await getAddressSuggestions(address);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

const openStreetMapSlice = createSlice({
  name: "openStreetMap",
  initialState: {
    statusApi: apiStatus.IDLE,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddressSuggestions.pending, (state) => {
      state.statusApi = apiStatus.LOADING;
    });
    builder.addCase(fetchAddressSuggestions.fulfilled, (state, action) => {
      state.statusApi = apiStatus.SUCCESS;
      state.data = action.payload;
    });
    builder.addCase(fetchAddressSuggestions.rejected, (state) => {
      state.statusApi = apiStatus.FAILED;
    });
  },
});

export default openStreetMapSlice.reducer;
