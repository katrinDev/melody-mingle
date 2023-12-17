import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "./Header";

export default function BasicLayout({ children }: React.PropsWithChildren) {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: "calc(12px + var(--Header-height))" },
            pb: 2,
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
