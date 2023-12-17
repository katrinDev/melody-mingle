import { makeAutoObservable } from "mobx";
import { IMusician } from "../models/IMusician";
import UserStore from "./UserStore";
import MusicianService from "../services/MusicianService";
import { AxiosError } from "axios";
import SnackbarPropsStore from "./SnackbarPropsStore";

export default class MusicianStore {
  musician = {} as IMusician;
  isNew = false;

  constructor() {
    makeAutoObservable(this);
  }

  setMusician(musician: IMusician) {
    this.musician = musician;
  }

  setIsNew(value: boolean) {
    this.isNew = value;
  }

  async fetchMusicianData(
    userStore: UserStore,
    snackbarStore: SnackbarPropsStore
  ) {
    try {
      const { data } = await MusicianService.getMusicianByUserId(
        userStore.user.id
      );
      this.setMusician(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          this.setIsNew(true);
        } else {
          const serverMessage = error.response?.data.message;

          snackbarStore.changeAll(true, "danger", `${serverMessage}`);
        }
      }
    }
  }
}
