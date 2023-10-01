export interface IFormat {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITopic {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMasterDataState {
  statusApiFormats: string;
  formats: IFormat[];
  statusApiTopics: string;
  topics: ITopic[];
  statusApiProvinces: string;
  provinces: any[];
  statusApiCities: string;
  cities: any[];
}
