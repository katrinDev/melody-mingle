import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import musTogether from "../../assets/mus_together.jpg";

import HeaderSection from "../../components/offersList/HeaderSection";
import Pagination from "../../components/offersList/Pagination";
import Search from "../../components/offersList/Search";
import { useContext, useEffect } from "react";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import MusicianCard from "../../components/musiciansList/MusicianCard";

function MusiciansDashboard() {
  const { musicianStore, snackbarStore } = useContext(Context);

  useEffect(() => {
    musicianStore.fetchAllMusicians(snackbarStore);
  }, []);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          height: "100vh",
          display: "grid",
          gridTemplateColumns: { xs: "auto", md: "60% 40%" },
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <Stack
          sx={{
            backgroundColor: "background.surface",
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <HeaderSection />

          <Search />
        </Stack>
        <Box
          sx={{
            gridRow: "span 3",
            display: { xs: "none", md: "flex" },
            backgroundColor: "background.level1",
            backgroundSize: "cover",
            backgroundImage: `url(${musTogether})`,
          }}
        />
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Stack spacing={2} sx={{ overflow: "auto" }}>
            {musicianStore.allMusicians?.map((musician) => (
              <MusicianCard key={musician.id} {...musician} />
            ))}
          </Stack>
        </Stack>
        <Pagination />
      </Box>
    </CssVarsProvider>
  );
}

export default observer(MusiciansDashboard);
