import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Dispatch, SetStateAction } from "react";
import { observer } from "mobx-react-lite";

type SearchProps = {
  handleSearch: (term: string) => void;
  resetSearch: () => void;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

function Search(props: SearchProps) {
  const { handleSearch, resetSearch, setSearchTerm, searchTerm } = props;

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
        <Button
          variant="solid"
          color="primary"
          onClick={() => handleSearch(searchTerm)}
        >
          Найти
        </Button>
        <Button variant="solid" color="primary" onClick={() => resetSearch()}>
          Сброс
        </Button>
      </Stack>
    </div>
  );
}

export default observer(Search);
