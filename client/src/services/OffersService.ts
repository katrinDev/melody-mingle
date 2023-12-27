import { AxiosResponse } from "axios";
import $api from "../http/axiosSetUp";
import { IOffer } from "../models/IOffer";

export default class OffersService {
  static async getAllOffers(): Promise<AxiosResponse<IOffer[]>> {
    return $api.get<IOffer[]>(`offers`);
  }
}
