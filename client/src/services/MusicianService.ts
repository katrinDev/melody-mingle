import { AxiosResponse } from "axios";
import { IMusician } from "../models/IMusician";
import $api from "../http/axiosSetUp";

export default class MusicianService {
  static async getMusicianByUserId(): Promise<AxiosResponse<IMusician>> {
    return $api.get<IMusician>(`musicians/user`);
  }

  static async getAllMusicians(): Promise<AxiosResponse<IMusician[]>> {
    return $api.get<IMusician[]>("musicians");
  }
}
