import {DistrictData } from "./DistrictData";

export interface District {
  success?: boolean;
  message?: boolean;
  districts?: DistrictData[];
  district?: DistrictData;
}