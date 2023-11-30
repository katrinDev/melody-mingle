import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Context } from "./main";
import Snackbar, { SnackbarCloseReason } from "@mui/joy/Snackbar";
import { SyntheticEvent, useContext, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportIcon from "@mui/icons-material/Report";
import { IconButton } from "@mui/joy";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AppRouter from "./router/AppRouter";
import { IUser } from "./models/IUser";
import { jwtDecode } from "jwt-decode";

const App: React.FC = observer(() => {
  const { userStore, snackbarStore } = useContext(Context);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      userStore.setAuth(true);

      const userData: IUser = jwtDecode(accessToken);
      userStore.setUser(userData);
    }
  }, []);

  const handleClose = (
    event: Event | SyntheticEvent<any, Event> | null,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    snackbarStore.isOpen = false;
  };

  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <Snackbar
        open={snackbarStore.isOpen}
        color={snackbarStore.color}
        size="md"
        variant="soft"
        autoHideDuration={3000}
        onClose={handleClose}
        startDecorator={
          snackbarStore.color === "success" ? (
            <CheckCircleIcon />
          ) : (
            <ReportIcon />
          )
        }
        endDecorator={
          <IconButton
            variant="soft"
            size="sm"
            color={snackbarStore.color}
            onClick={() => {
              snackbarStore.isOpen = false;
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        }
      >
        {snackbarStore.text}
      </Snackbar>
    </>
  );
});

export default App;
