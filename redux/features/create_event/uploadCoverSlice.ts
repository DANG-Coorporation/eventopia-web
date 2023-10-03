import {
  postCreateEvent,
  uploadDocument,
} from "@/api/eventopia_api/create_event_api";
import { apiStatus } from "@/common/constants/api_status";
import { IEvent } from "@/common/interface/createEvent.interface";
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

export const postEvent = createAsyncThunk(
  "uploadCover/postEvent",
  async (event: IEvent) => {
    try {
      const response = await postCreateEvent(event);
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
    postStatus: apiStatus.IDLE,
    postResponse: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCoverImage.pending, (state) => {
        state.apiStatus = apiStatus.LOADING;
      })
      .addCase(postCoverImage.fulfilled, (state, action) => {
        state.apiStatus = apiStatus.SUCCESS;
        state.coverUrl = action.payload;
      })
      .addCase(postCoverImage.rejected, (state) => {
        state.apiStatus = apiStatus.FAILED;
      });
    builder
      .addCase(postEvent.pending, (state) => {
        state.postStatus = apiStatus.LOADING;
      })
      .addCase(postEvent.fulfilled, (state) => {
        state.postStatus = apiStatus.SUCCESS;
      })
      .addCase(postEvent.rejected, (state) => {
        state.postStatus = apiStatus.FAILED;
      });
  },
});

export default uploadCoverSlice.reducer;
