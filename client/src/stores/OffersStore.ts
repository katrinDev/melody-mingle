import { makeAutoObservable } from "mobx";
import { IOffer } from "../models/IOffer";
import SnackbarPropsStore from "./SnackbarPropsStore";
import { AxiosError } from "axios";
import OffersService from "../services/OffersService";

export default class OffersStore {
  offers = [] as IOffer[];

  constructor() {
    makeAutoObservable(this);
  }

  setOffers(offers: IOffer[]) {
    this.offers = offers;
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
      const offerValues = new Set(
        Object.values(offer).map((value) => value.toString().toLowerCase())
      );
      return offerValues.has(lowerCaseSearchTerm);
    });

    this.setOffers(results);
  }
}
