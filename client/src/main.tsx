import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserStore from "./stores/UserStore.ts";
import { createContext } from "react";
import SnackbarPropsStore from "./stores/SnackbarPropsStore.ts";
import MusicianStore from "./stores/MusicianStore.ts";

interface State {
  userStore: UserStore;
  snackbarStore: SnackbarPropsStore;
  musicianStore: MusicianStore;
}

const userStore = new UserStore();
const snackbarStore = new SnackbarPropsStore();
const musicianStore = new MusicianStore();

export const Context = createContext<State>({
  userStore,
  snackbarStore,
  musicianStore,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ userStore, snackbarStore, musicianStore }}>
    <App />
  </Context.Provider>
);
