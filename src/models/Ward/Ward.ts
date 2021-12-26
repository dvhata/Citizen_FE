import {WardData } from "./WardData";

export interface Ward {
  success?: boolean;
  message?: boolean;
  wards?: WardData[];
  ward?: WardData;
  num_of_done?: number;
}