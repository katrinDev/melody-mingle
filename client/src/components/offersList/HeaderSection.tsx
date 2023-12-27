import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function HeaderSection() {
  return (
    <Stack sx={{ mb: 2 }}>
      <Stack direction="column" alignItems="flex-start" sx={{ width: "100%" }}>
        <Typography level="h2">Заявки на сотрудничество</Typography>

        <Typography level="body-md" color="neutral">
          Расширь свои творческие возможности
        </Typography>
      </Stack>
    </Stack>
  );
}
