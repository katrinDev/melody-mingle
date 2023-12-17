import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";

import RentalCard from "./components/RentalCard";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";
import HeaderSection from "./components/HeaderSection";

export default function RequestsDashboard() {
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
            <RentalCard
              title="A Stylish Apt, 5 min walk to Queen Victoria Market"
              searcherName="Pink"
              rareFind
              image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
            />
            <RentalCard
              title="Designer NY style loft"
              searcherName="Entire loft in central business district"
              liked
              image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400"
            />
            <RentalCard
              title="5 minute walk from University of Melbourne"
              searcherName="Entire rental unit in Carlton"
              image="https://images.unsplash.com/photo-1537726235470-8504e3beef77?auto=format&fit=crop&w=400"
            />
            <RentalCard
              title="Magnificent apartment next to public transport"
              searcherName="Entire apartment rental in Collingwood"
              image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400"
            />
            <RentalCard
              title="Next to shoppng mall and public transport"
              searcherName="Entire apartment rental in Collingwood"
              image="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=400"
            />
            <RentalCard
              title="Endless ocean view"
              searcherName="A private room in a shared apartment in Docklands"
              image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400"
            />
            <RentalCard
              title="A Stylish Apt, 5 min walk to Queen Victoria Market"
              searcherName="one bedroom apartment in Collingwood"
              image="https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=400"
            />
          </Stack>
        </Stack>
        <Pagination />
      </Box>
    </CssVarsProvider>
  );
}
