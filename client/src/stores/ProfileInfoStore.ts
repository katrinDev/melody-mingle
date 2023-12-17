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
}
