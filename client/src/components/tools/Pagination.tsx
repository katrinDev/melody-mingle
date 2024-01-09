import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PaginationProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPagesCount: number;
  currentPage: number;
};

export default function Pagination(props: PaginationProps) {
  const { setCurrentPage, totalPagesCount, currentPage } = props;

  const [numbersArray, setNumbersArray] = useState<string[]>([]);

  const handleNextPageClick = () => {
    const nextPage = currentPage + 1;

    setCurrentPage(nextPage <= totalPagesCount ? nextPage : currentPage);
  };

  const handlePrevPageClick = () => {
    const prevPage = currentPage - 1;

    setCurrentPage(prevPage > 0 ? prevPage : currentPage);
  };

  useEffect(() => {
    let array: string[] = [];

    if (totalPagesCount > 7) {
      if (currentPage > 3 || currentPage < totalPagesCount - 2) {
        array = ["1", "...", "...", totalPagesCount.toString()];

        let subArray: string[] = [];

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          subArray.push(i.toString());
        }

        array.splice(2, 0, ...subArray);
      } else {
        array = ["1", "2", "3", "..."];

        for (let i = totalPagesCount - 2; i <= totalPagesCount; i++) {
          array.push(i.toString());
        }
      }
    } else {
      for (let i = 1; i <= totalPagesCount; i++) {
        array.push(i.toString());
      }
    }

    setNumbersArray(array);
  }, [currentPage, totalPagesCount]);

  return (
    <div>
      <Box
        className="Pagination-laptopUp"
        sx={{
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: "flex",
          mx: 4,
          my: 2,
        }}
      >
        <Button
          size="sm"
          variant="plain"
          color="neutral"
          startDecorator={<ArrowBackIosRoundedIcon />}
          onClick={handlePrevPageClick}
          disabled={currentPage === 1}
        >
          Назад
        </Button>

        <Box sx={{ flex: 1 }} />

        {numbersArray.map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? "plain" : "soft"}
            color="neutral"
            disabled={Number(page) ? false : true}
            onClick={() => setCurrentPage(Number(page))}
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="plain"
          color="neutral"
          endDecorator={<ArrowForwardIosRoundedIcon />}
          onClick={handleNextPageClick}
          disabled={currentPage === totalPagesCount}
        >
          Вперёд
        </Button>
      </Box>
    </div>
  );
}
