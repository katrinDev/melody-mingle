import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";

import Search from "../../components/offersList/Search";
import Pagination from "../../components/offersList/Pagination";
import Filters from "../../components/offersList/Filters";
import HeaderSection from "../../components/offersList/HeaderSection";
import { useContext, useEffect } from "react";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import OfferCard from "../../components/offer/OfferCard";

function OffersDashboard() {
  const { offersStore, snackbarStore } = useContext(Context);

  useEffect(() => {
    offersStore.fetchOffers(snackbarStore);
  }, []);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          display: "grid",
          gridTemplateColumns: "auto",
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
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Filters />
          <Stack spacing={2} sx={{ overflow: "auto" }}>
            {offersStore.offers?.map((offer) => (
              <OfferCard key={offer.id} {...offer} />
            ))}
          </Stack>
        </Stack>
        <Pagination />
      </Box>
    </CssVarsProvider>
  );
}

export default observer(OffersDashboard);
