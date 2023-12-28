import { makeAutoObservable } from "mobx";
import { IProject } from "../models/IProject";
import SnackbarPropsStore from "./SnackbarPropsStore";
import { AxiosError } from "axios";
import ProjectsService from "../services/ProjectsService";

export default class ProjectsStore {
  projects = [] as IProject[];

  constructor() {
    makeAutoObservable(this);
  }

  setProjects(projects: IProject[]) {
    this.projects = projects;
  }

  async fetchProjects(musicianId: number, snackbarStore: SnackbarPropsStore) {
    try {
      const { data } = await ProjectsService.getProjectsByMusician(musicianId);

      this.setProjects(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data.message;

        snackbarStore.changeAll(true, "danger", `${serverMessage}`);
      }
    }
  }
}
