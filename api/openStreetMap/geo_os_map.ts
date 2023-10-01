import openStreetMapApi from "./open_street_map";

export const getAddressSuggestions = async (address: string) => {
  const result = await openStreetMapApi.get(
    `search?q=${address}&format=json&polygon=1&addressdetails=1&limit=8`
  );
  return result.data;
};
