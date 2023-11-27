import { AxiosResponse } from "axios";
import $api from "../http/axiosSetUp";
import { AuthResponse } from "../models/response/AuthResponse";
import { AuthRequest } from "../models/request/AuthRequest";

export default class AuthService {
  static async login(
    userData: AuthRequest
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/login", userData);
  }

  static async registration(
    userData: AuthRequest
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("auth/registration", userData);
  }

  static async logout(): Promise<void> {
    return $api.post("auth/logout");
  }
}
