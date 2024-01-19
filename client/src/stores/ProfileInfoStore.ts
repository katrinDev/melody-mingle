import { makeAutoObservable } from "mobx";
import IProfileInfo from "../models/IProfileInfo";
import SnackbarPropsStore from "./SnackbarPropsStore";
import { AxiosError } from "axios";
import ProfileInfoService from "../services/ProfileInfoService";

export default class ProfileInfoStore {
  profileInfo = {} as IProfileInfo;

  constructor() {
    makeAutoObservable(this);
  }

  setAvatar(avatarUrl: string) {
    this.profileInfo.avatarUrl = avatarUrl;
  }

  setData(profileInfo: IProfileInfo) {
    this.profileInfo = profileInfo;
  }

  async fetchProfileData(snackbarStore: SnackbarPropsStore) {
    try {
      const { data } = await ProfileInfoService.getProfileData();

      this.setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data.message;

        snackbarStore.changeAll(true, "danger", `${serverMessage}`);
      }
    }
  }

  async updateAvatar(avatar: File, snackbarStore: SnackbarPropsStore) {
    try {
      const { data } = await ProfileInfoService.updateAvatar(avatar);
      this.setAvatar(data.avatarUrl);

      snackbarStore.changeAll(true, "success", "Фото профиля успешно изменено");
    } catch (error) {
      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data.message;

        snackbarStore.changeAll(true, "danger", `${serverMessage}`);
      }
    }
  }
}
