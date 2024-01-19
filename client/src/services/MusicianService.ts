import { AxiosResponse } from "axios";
import { IMusician } from "../models/musician/IMusician";
import $api from "../http/axiosSetUp";
import { UpdateMusicianDto } from "../models/musician/UpdateMusicianDto";

export default class MusicianService {
  static async getMusicianByUserId(): Promise<AxiosResponse<IMusician>> {
    return $api.get<IMusician>(`musicians/by-user`);
  }

  static async getMusicianById(id: number): Promise<AxiosResponse<IMusician>> {
    return $api.get<IMusician>(`musicians/${id}`);
  }

  static async getAllOtherMusicians(): Promise<AxiosResponse<IMusician[]>> {
    return $api.get<IMusician[]>("musicians/others");
  }

  static async getAllMusicians(): Promise<AxiosResponse<IMusician[]>> {
    return $api.get<IMusician[]>("musicians");
  }

  static async updateMusician(
    updateMusicianDto: UpdateMusicianDto
  ): Promise<AxiosResponse<IMusician>> {
    return $api.patch<IMusician>("musicians", updateMusicianDto);
  }
}
