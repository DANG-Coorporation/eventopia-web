import { uploadDocument } from "@/api/eventopia_api/create_event_api";
import { apiStatus } from "@/common/constants/api_status";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postCoverImage = createAsyncThunk(
  "uploadCover/postCoverImage",
  async (file: File) => {
    try {
      const response = await uploadDocument(file);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const uploadCoverSlice = createSlice({
  name: "uploadCover",
  initialState: {
    apiStatus: apiStatus.IDLE,
    coverUrl: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postCoverImage.pending, (state) => {
      state.apiStatus = apiStatus.LOADING;
    });
    builder.addCase(postCoverImage.fulfilled, (state, action) => {
      state.apiStatus = apiStatus.SUCCESS;
      state.coverUrl = action.payload;
    });
    builder.addCase(postCoverImage.rejected, (state) => {
      state.apiStatus = apiStatus.FAILED;
    });
  },
});

export default uploadCoverSlice.reducer;
