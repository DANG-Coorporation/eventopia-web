import axios from "axios";

const openStreetMapApi = axios.create({
  baseURL: "https://nominatim.openstreetmap.org/",
});

export default openStreetMapApi;
