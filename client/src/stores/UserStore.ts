import { makeAutoObservable } from 'mobx';
import { AuthRequest } from '../models/request/AuthRequest';
import AuthService from '../services/AuthService';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../models/IUser';
import SnackbarPropsStore from './SnackbarPropsStore';
import axios, { AxiosError } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { API_URL } from '../http/axiosSetUp';
import { RolesEnum } from '../models/RolesEnum';
import { IManagedUser } from '../models/manageUsers/IManagedUser';
import UsersService from '../services/UsersService';

export default class UserStore {
	user = {} as IUser;
	isAuth = false;
	isAdmin = false;
	notAdminUsers = [] as IManagedUser[];

	constructor() {
		makeAutoObservable(this);
	}

	setAuth(bool: boolean) {
		this.isAuth = bool;
	}

	setUser(user: IUser) {
		this.user = user;
		if (user.roles.includes(RolesEnum.ADMIN)) {
			this.setIsAdmin(true);
		}
	}

	setIsAdmin(bool: boolean) {
		this.isAdmin = bool;
	}

	setAllUsers(users: IManagedUser[]) {
		this.notAdminUsers = users;
	}

	async login(requestData: AuthRequest, snackbarStore: SnackbarPropsStore) {
		try {
			const { data } = await AuthService.login(requestData);

			localStorage.setItem('accessToken', data.accessToken);
			this.setAuth(true);

			const userData: IUser = jwtDecode(data.accessToken);
			this.setUser(userData);

			snackbarStore.changeAll(true, 'success', 'Добро пожаловать!');
		} catch (error) {
			if (error instanceof AxiosError) {
				const serverMessage = error.response?.data.message;

				snackbarStore.changeAll(true, 'danger', `${serverMessage}`);
			}
		}
	}

	async registation(
		requestData: AuthRequest,
		snackbarStore: SnackbarPropsStore
	) {
		try {
			const { data } = await AuthService.registration(requestData);

			localStorage.setItem('accessToken', data.accessToken);
			this.setAuth(true);

			const userData: IUser = jwtDecode(data.accessToken);
			this.setUser(userData);

			snackbarStore.changeAll(true, 'success', 'Регистрация прошла успешно');
		} catch (error) {
			if (error instanceof AxiosError) {
				const serverMessage = error.response?.data.message;

				snackbarStore.changeAll(true, 'danger', `${serverMessage}`);
			}
		}
	}

	async logout(snackbarStore: SnackbarPropsStore) {
		try {
			await AuthService.logout();
			localStorage.removeItem('accessToken');

			this.setAuth(false);

			this.setUser({} as IUser);
		} catch (error) {
			if (error instanceof AxiosError) {
				const serverMessage = error.response?.data.message;

				snackbarStore.changeAll(true, 'danger', `${serverMessage}`);
			}
		}
	}

	async refresh(snackbarStore: SnackbarPropsStore) {
		try {
			const { data } = await axios.get<AuthResponse>(
				`${API_URL}/auth/refresh`,
				{
					withCredentials: true,
				}
			);

			localStorage.setItem('accessToken', data.accessToken);
			this.setAuth(true);

			const userData: IUser = jwtDecode(data.accessToken);
			this.setUser(userData);
		} catch (error) {
			if (error instanceof AxiosError) {
				const serverMessage = error.response?.data.message;

				snackbarStore.changeAll(true, 'danger', `${serverMessage}`);
			}
		}
	}

	async getAllUsers(snackbarStore: SnackbarPropsStore) {
		try {
			const { data } = await UsersService.getAllUsers();
			this.setAllUsers(data);
		} catch (error) {
			if (error instanceof AxiosError) {
				const serverMessage = error.response?.data.message;

				snackbarStore.changeAll(true, 'danger', `${serverMessage}`);
			}
		}
	}
}
