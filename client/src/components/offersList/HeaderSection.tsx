import { Button } from "@mui/joy";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  title: string;
  subTitle: string;
  my: boolean;
  isOfferModalOpen?: boolean;
  setIsOfferModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function HeaderSection({ title, subTitle, my, setIsOfferModalOpen}: IProps) {
  return (
    <Stack sx={{ mb: 2 }} justifyContent="space-between" direction="row">
      <Stack direction="column" alignItems="flex-start" sx={{ width: "100%" }}>
        <Typography level="h2">{title}</Typography>

        <Typography level="body-md" color="neutral">
          {subTitle}
        </Typography>
      </Stack>

      {my && setIsOfferModalOpen && <Button variant="soft" color="success" sx={{alignSelf: "center"}}
      onClick={() => setIsOfferModalOpen(true)}>Добавить</Button>}
    </Stack>
  );
}
