import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "../navigation/Sidebar";
import BasicHeader from "./BasicHeader";

export default function BasicLayout({ children }: React.PropsWithChildren) {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <BasicHeader />
        <Box
          component="main"
          className="MainContent"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            minHeight: "100dvh",
            gap: 1,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
