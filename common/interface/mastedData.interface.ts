export interface IFormat {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITopic extends IFormat {}

export interface IProvince extends IFormat {}
export interface IMasterDataState {
  statusApiFormats: string;
  formats: IFormat[];
  statusApiTopics: string;
  topics: ITopic[];
  statusApiProvinces: string;
  provinces: IProvince[];
  statusApiCities: string;
  cities: any[];
}
