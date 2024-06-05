import { AxiosResponse } from 'axios';
import $api from '../http/axiosSetUp';
import { IManagedUser } from '../models/manageUsers/IManagedUser';

export default class UsersService {
	static async getAllUsers(): Promise<AxiosResponse<IManagedUser[]>> {
		return $api.get<IManagedUser[]>(`users/not-admins`);
	}
}
