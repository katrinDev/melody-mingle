import { AxiosResponse } from "axios";
import $api from "../http/axiosSetUp";
import IProfileInfo from "../models/IProfileInfo";

export default class ProfileInfoService {
  static async getProfileData(): Promise<AxiosResponse<IProfileInfo>> {
    return $api.get<IProfileInfo>(`profiles-info`);
  }

  static async getProfileDataByMusicianId(
    musicianId: number
  ): Promise<AxiosResponse<IProfileInfo>> {
    return $api.get<IProfileInfo>(`profiles-info/${musicianId}`);
  }
}
