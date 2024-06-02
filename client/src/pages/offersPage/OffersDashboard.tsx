import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";

import Search from "../../components/tools/Search";
import Pagination from "../../components/tools/Pagination";
import Filters from "../../components/offersList/Filters";
import HeaderSection from "../../components/offersList/HeaderSection";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import OfferCard from "../../components/offer/OfferCard";
import { Typography} from "@mui/joy";
import { IOffer } from "../../models/IOffer";
import AddOfferFormModal from "./AddOfferFormModal";

const ITEMS_PER_PAGE = 3;

type OffersDashboardProps = {
  my: boolean;
  title: string;
}

function OffersDashboard(props: OffersDashboardProps) {
  const {my, title} = props;

  const { offersStore, snackbarStore } = useContext(Context);

  const [offers, setOffers] = useState<IOffer[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesCount, setTotalPagesCount] = useState(currentPage);
  const [loadingOffers, setLoadingOffers] = useState<boolean>(false)
  

  const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false);

   const fetchData = () => {
      if(my) {
        offersStore.fetchOffersForMusician(snackbarStore);
      } else {
        offersStore.fetchOffers(snackbarStore);
      }
    }

  useEffect(() => {
    setLoadingOffers(true);
    fetchData();
    setLoadingOffers(false);
  }, []);

  useEffect(() => {
    setOffers(my ? offersStore.myOffers : offersStore.offers);
  }, [offersStore.offers, offersStore.myOffers, my])

  useEffect(() => {
    setTotalPagesCount(
      offers ? Math.ceil(offers.length / ITEMS_PER_PAGE) : currentPage
    );
  }, [currentPage, offers]);

  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = offers!.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems;
  };

  const handleSearch = (searchTerm: string) => {
    offersStore.searchOffers(searchTerm);
  };

  const resetSearch = () => {
    fetchData();
    setSearchTerm("");
  };

  if (loadingOffers || !offers) {
    return <div>Loading...</div>;
  } else {
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
          <HeaderSection
            title={title}
            subTitle="Расширь свои творческие возможности"
            my={my}
            isOfferModalOpen = {isAddFormOpen}
            setIsOfferModalOpen = {setIsAddFormOpen}
          />
          <Search
            handleSearch={handleSearch}
            resetSearch={resetSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Stack>
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          {!my && <Filters />}
          {offers.length ? (
            <Stack spacing={2} sx={{ overflow: "auto" }}>
              {getCurrentItems().map((offer) => (
                <OfferCard key={offer.id} offer={offer} my={my}/>
              ))}
            </Stack>
          ) : (
            <Typography>
              На текущий момент нет актуальных предложений
            </Typography>
          )}
        </Stack>
        {offers && (
          <Pagination
            key={2}
            setCurrentPage={setCurrentPage}
            totalPagesCount={totalPagesCount}
            currentPage={currentPage}
          />
        )}
        
        <AddOfferFormModal isOpen={isAddFormOpen} setIsOpen={setIsAddFormOpen}/>
      </Box>
    </CssVarsProvider>
  );
}
}

export default observer(OffersDashboard);
