import { makeAutoObservable } from "mobx";
import { IOffer } from "../models/IOffer";
import SnackbarPropsStore from "./SnackbarPropsStore";
import { AxiosError } from "axios";
import OffersService from "../services/OffersService";

export default class OffersStore {
  offers = [] as IOffer[];
  offersCount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setOffers(offers: IOffer[]) {
    this.offers = offers;
  }

  setOffersCount(count: number) {
    this.offersCount = count;
  }

  async fetchOffers(snackbarStore: SnackbarPropsStore) {
    try {
      const { data } = await OffersService.getAllOffers();

      this.setOffers(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data.message;

        snackbarStore.changeAll(true, "danger", `${serverMessage}`);
      }
    }
  }

  searchOffers(searchTerm: string) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = this.offers.filter((offer) => {
      let { id, createdAt, photoUrl, musician, ...searchObj } = offer;
      searchObj = Object.assign({}, searchObj, {
        name: musician.name,
        email: musician.user.email,
      });

      const offerValues = new Set(
        Object.values(searchObj)
          .map((value) => value.toString().toLowerCase())
          .flatMap((value) => value.split(" "))
      );

      return offerValues.has(lowerCaseSearchTerm);
    });

    this.setOffers(results);
  }

  async fetchOffersCount(snackbarStore: SnackbarPropsStore) {
    try {
      const { data } = await OffersService.getOffersCount();

      this.setOffersCount(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data.message;

        snackbarStore.changeAll(true, "danger", `${serverMessage}`);
      }
    }
  }
}
