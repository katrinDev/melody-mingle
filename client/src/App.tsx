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

const App: React.FC = observer(() => {
  const { userStore, snackbarStore } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      userStore.refresh(snackbarStore);
    }
  }, []);

  const handleClose = (
    event: Event | SyntheticEvent<any, Event> | null,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway" && event) {
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

// import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

// function App() {
//   const position = { lat: 61.2176, lng: -149.8997 };
//   const API_KEY = "AIzaSyAoeEjDC2Mllzp2YqvuEJaXumtbyBtq25c";
//   return (
//     <APIProvider apiKey={API_KEY}>
//       <Map center={position} zoom={10}>
//         <Marker position={position} />
//       </Map>
//     </APIProvider>
//   );
// }

// export default App;
