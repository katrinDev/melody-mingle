import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserStore from "./store/UserStore.ts";
import { createContext } from "react";

interface State {
  userStore: UserStore;
}
const userStore = new UserStore();

export const Context = createContext<State>({
  userStore,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider value={{ userStore }}>
    <App />
  </Context.Provider>
);
