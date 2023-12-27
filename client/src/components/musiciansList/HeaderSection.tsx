import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function HeaderSection() {
  return (
    <Stack sx={{ mb: 2 }}>
      <Stack direction="column" alignItems="flex-start" sx={{ width: "100%" }}>
        <Typography level="h2">Музыканты</Typography>

        <Typography level="body-md" color="neutral">
          Раскрой свой потенциал по-новому
        </Typography>
      </Stack>
    </Stack>
  );
}
