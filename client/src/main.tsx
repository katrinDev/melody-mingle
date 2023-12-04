import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserStore from "./stores/UserStore.ts";
import { createContext } from "react";
import SnackbarPropsStore from "./stores/SnackbarPropsStore.ts";

interface State {
  userStore: UserStore;
  snackbarStore: SnackbarPropsStore;
}
const userStore = new UserStore();
const snackbarStore = new SnackbarPropsStore();

export const Context = createContext<State>({
  userStore,
  snackbarStore,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ userStore, snackbarStore }}>
    <App />
  </Context.Provider>
);
