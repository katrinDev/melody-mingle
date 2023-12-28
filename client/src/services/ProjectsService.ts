import { AxiosResponse } from "axios";
import { IProject } from "../models/IProject";
import $api from "../http/axiosSetUp";

export default class ProjectsService {
  static async getProjectsByMusician(
    musicianId: number
  ): Promise<AxiosResponse<IProject[]>> {
    return $api.get<IProject[]>(`projects/${musicianId}`);
  }
}
