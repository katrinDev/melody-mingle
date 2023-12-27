import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useContext, useState } from "react";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

function Search() {
  const { offersStore, snackbarStore } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    offersStore.searchOffers(searchTerm);
  };

  const resetSearch = () => {
    offersStore.fetchOffers(snackbarStore);
    setSearchTerm("");
  };

  return (
    <div>
      <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
        <FormControl sx={{ flex: 1 }}>
          <Input
            placeholder="Поиск"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startDecorator={<SearchRoundedIcon />}
            aria-label="Search"
          />
        </FormControl>
        <Button variant="solid" color="primary" onClick={handleSearch}>
          Найти
        </Button>
        <Button variant="solid" color="primary" onClick={resetSearch}>
          Сброс
        </Button>
      </Stack>
    </div>
  );
}

export default observer(Search);
