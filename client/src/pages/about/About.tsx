import {
  Box,
  CssBaseline,
  CssVarsProvider,
  IconButton,
  StyledEngineProvider,
} from "@mui/joy";
import { ColorSchemeToggle } from "../authPages/SignIn";
import framesxTheme from "../../themes/extendTheme";
import HeadlineAbout from "./HeadlineAbout";
import ChartsAbout from "./ChartsAbout";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useContext } from "react";
import { Context } from "../../main";

export default function About() {
  const { userStore, snackbarStore } = useContext(Context);

  const logoutClick = async () => {
    await userStore.logout(snackbarStore);
  };

  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
        <CssBaseline />

        <Box>
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={logoutClick}
            sx={{
              position: "fixed",
              zIndex: 999,
              top: "2rem",
              right: "5rem",
              borderRadius: "50%",
              boxShadow: "sm",
            }}
          >
            <LogoutRoundedIcon />
          </IconButton>
          <ColorSchemeToggle />
        </Box>

        <Box
          sx={{
            height: "100vh",
            overflowY: "scroll",
            scrollSnapType: "y mandatory",
            "& > div": {
              scrollSnapAlign: "start",
            },
          }}
        >
          <HeadlineAbout />
          <ChartsAbout />
        </Box>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}
