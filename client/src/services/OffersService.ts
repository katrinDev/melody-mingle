import { AxiosResponse } from 'axios';
import $api from '../http/axiosSetUp';
import { CreateOfferDto, IOffer } from '../models/IOffer';
import { keys } from 'mobx';

export default class OffersService {
	static async getAllOffers(): Promise<AxiosResponse<IOffer[]>> {
		return $api.get<IOffer[]>('offers');
	}

	static async getOffersCount(): Promise<AxiosResponse<number>> {
		return $api.get<number>('offers/count');
	}

	static async getOffersForMusician(): Promise<AxiosResponse<IOffer[]>> {
		return $api.get<IOffer[]>('offers/musician');
	}

	static async createOffer(
		createOfferDto: CreateOfferDto,
		photo: File
	): Promise<AxiosResponse<IOffer>> {
		const formData = new FormData();
		formData.append('photo', photo);

		for (let [key, value] of Object.entries(createOfferDto)) {
			if (Array.isArray(value) || typeof value === 'object') {
				formData.append(key, JSON.stringify(value));
			} else {
				formData.append(key, value);
			}
		}

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
		return $api.post<IOffer>('offers', formData, config);
	}
}
