import { AxiosResponse } from "axios";
import $api from "../http/axiosSetUp";
import IProfileInfo from "../models/IProfileInfo";
import { UploadAvatarResponse } from "../models/response/UploadAvatarResponse";

export default class ProfileInfoService {
  static async getProfileData(): Promise<AxiosResponse<IProfileInfo>> {
    return $api.get<IProfileInfo>(`profiles-info`);
  }

  static async getProfileDataByMusicianId(
    musicianId: number
  ): Promise<AxiosResponse<IProfileInfo>> {
    return $api.get<IProfileInfo>(`profiles-info/${musicianId}`);
  }

  static async updateAvatar(
    avatar: File
  ): Promise<AxiosResponse<UploadAvatarResponse>> {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    return $api.post<UploadAvatarResponse>(
      `profiles-info/avatar`,
      formData,
      config
    );
  }
}
