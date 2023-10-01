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
