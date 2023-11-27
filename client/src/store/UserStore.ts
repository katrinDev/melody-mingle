import { makeAutoObservable } from "mobx";
import { AuthRequest } from "../models/request/AuthRequest";
import AuthService from "../services/AuthService";
import { jwtDecode } from "jwt-decode";
import { User } from "../models/User";

export default class UserStore {
  user = {} as User;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: User) {
    this.user = user;
  }

  async login(requestData: AuthRequest) {
    try {
      const { data } = await AuthService.login(requestData);

      localStorage.setItem("token", data.accessToken);
      this.setAuth(true);

      const userData: User = jwtDecode(data.accessToken);
      this.setUser(userData);
    } catch (error) {
      console.log(error);
    }
  }
}
