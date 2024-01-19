import { makeAutoObservable } from "mobx";
import { IMusician } from "../models/musician/IMusician";
import MusicianService from "../services/MusicianService";
import { AxiosError } from "axios";
import SnackbarPropsStore from "./SnackbarPropsStore";

export default class MusicianStore {
  musician = {} as IMusician;
  isNew = false;
  allMusicians = [] as IMusician[];

  constructor() {
    makeAutoObservable(this);
  }

  setMusician(musician: IMusician) {
    this.musician = musician;
  }

  setIsNew(value: boolean) {
    this.isNew = value;
  }

  setAllMusicians(musicians: IMusician[]) {
    this.allMusicians = musicians;
  }

  async fetchAllMusicians(snackbarStore: SnackbarPropsStore) {
    try {
      const { data } = await MusicianService.getAllOtherMusicians();
      this.setAllMusicians(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data.message;

        snackbarStore.changeAll(true, "danger", `${serverMessage}`);
      }
    }
  }

  async fetchMusicianByUser(snackbarStore: SnackbarPropsStore) {
    try {
      const { data } = await MusicianService.getMusicianByUserId();
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

  private diffMusicianObj(newMusician: IMusician) {
    let diff: Record<string, unknown> = {};
    Object.keys(newMusician).forEach((key) => {
      if (
        this.musician.hasOwnProperty(key) &&
        JSON.stringify(this.musician[key as keyof IMusician]) !==
          JSON.stringify(newMusician[key as keyof IMusician])
      ) {
        diff[key] = newMusician[key as keyof IMusician];
      }
    });
    return diff;
  }

  async updateMusician(
    newMusician: IMusician,
    snackbarStore: SnackbarPropsStore
  ) {
    try {
      const updateMusicianDto = this.diffMusicianObj(newMusician);
      const { data } = await MusicianService.updateMusician(updateMusicianDto);
      this.setMusician(data);

      snackbarStore.changeAll(
        true,
        "success",
        "Данные пользователя успешно изменены"
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data.message;

        snackbarStore.changeAll(true, "danger", `${serverMessage}`);
      }
    }
  }

  searchMusicians(searchTerm: string) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = this.allMusicians.filter((musician) => {
      let { id, avatarUrl, ...searchObj } = musician;
      searchObj = Object.assign({}, searchObj, {
        email: musician.user?.email,
      });

      const musicianValues = new Set(
        Object.values(searchObj)
          .map((value) => value?.toString().toLowerCase())
          .flatMap((value) => value?.split(" "))
      );

      return musicianValues.has(lowerCaseSearchTerm);
    });

    this.setAllMusicians(results);
  }
}
