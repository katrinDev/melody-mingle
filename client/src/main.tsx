import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserStore from "./stores/UserStore.ts";
import { createContext } from "react";
import SnackbarPropsStore from "./stores/SnackbarPropsStore.ts";
import MusicianStore from "./stores/MusicianStore.ts";
import ProfileInfoStore from "./stores/ProfileInfoStore.ts";
import OffersStore from "./stores/OffersStore.ts";
import ProjectsStore from "./stores/ProjectsStore.ts";

interface State {
  userStore: UserStore;
  snackbarStore: SnackbarPropsStore;
  musicianStore: MusicianStore;
  profileStore: ProfileInfoStore;
  offersStore: OffersStore;
  projectsStore: ProjectsStore;
}

const userStore = new UserStore();
const snackbarStore = new SnackbarPropsStore();
const musicianStore = new MusicianStore();
const profileStore = new ProfileInfoStore();
const offersStore = new OffersStore();
const projectsStore = new ProjectsStore();

export const Context = createContext<State>({
  userStore,
  snackbarStore,
  musicianStore,
  profileStore,
  offersStore,
  projectsStore,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider
    value={{
      userStore,
      snackbarStore,
      musicianStore,
      profileStore,
      offersStore,
      projectsStore,
    }}
  >
    <App />
  </Context.Provider>
);
