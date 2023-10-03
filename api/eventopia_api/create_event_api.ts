import { IEvent } from "@/common/interface/createEvent.interface";
import { eventopiaApi } from "./eventopia";

export const createEvent = async (event: IEvent) => {
  return await eventopiaApi.post("/event", event, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
};

export const getFormatsEvent = async () => {
  return await eventopiaApi.get("/master-data/formats", {});
};

export const getTopicsEvent = async () => {
  return await eventopiaApi.get("/master-data/topics", {});
};

export const getProvinces = async () => {
  return await eventopiaApi.get("/master-data/provinces", {});
};

export const getCities = async (provinceId: number) => {
  return await eventopiaApi.get(`/master-data/cities/${provinceId}`, {});
};

export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const headers = {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
    "Content-Type": "multipart/form-data",
  };

  try {
    const response = await eventopiaApi.post("/document/uploads", formData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};

export const postCreateEvent = async (event: IEvent) => {
  const token = localStorage.getItem("accessToken");
  const headers = {
    Authorization: "Bearer " + token,
  };

  try {
    const response = await eventopiaApi.post("/event", event, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};