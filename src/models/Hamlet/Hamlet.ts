import { HamletData } from "./HamletData";


export interface Hamlet {
  success?: boolean;
  message?: boolean;
  hamlets?: HamletData[];
  hamlet?: HamletData;
}