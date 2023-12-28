import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

interface IProps {
  title: string;
  subTitle: string;
}

export default function HeaderSection({ title, subTitle }: IProps) {
  return (
    <Stack sx={{ mb: 2 }}>
      <Stack direction="column" alignItems="flex-start" sx={{ width: "100%" }}>
        <Typography level="h2">{title}</Typography>

        <Typography level="body-md" color="neutral">
          {subTitle}
        </Typography>
      </Stack>
    </Stack>
  );
}
