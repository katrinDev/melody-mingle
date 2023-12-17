import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded";
import FaceRetouchingNaturalRoundedIcon from "@mui/icons-material/FaceRetouchingNaturalRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { Box } from "@mui/joy";

type RentalCardProps = {
  searcherName: string;
  email: string;
  headline: string;
  body: string;

  location: string;
  mainRoles: string[];
  genres: string[];
  image: string;
  expirationDate: Date;
  liked?: boolean;
  rareFind?: boolean;
};

function countSoonExp(expirationDate: Date) {
  let currentDate = new Date();
  let diff = expirationDate.getTime() - currentDate.getTime();
  let daysNumber = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (daysNumber <= 3) {
    return true;
  }

  return false;
}

export default function RentalCard(props: RentalCardProps) {
  const {
    searcherName,
    email,

    headline,
    body,
    location,
    mainRoles,
    genres,
    expirationDate,
    liked = false,
    image,
  } = props;
  const [isLiked, setIsLiked] = React.useState(liked);
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        bgcolor: "neutral.softBg",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        "&:hover": {
          boxShadow: "lg",
          borderColor: "var(--joy-palette-neutral-outlinedDisabledBorder)",
        },
      }}
    >
      <CardOverflow
        sx={{
          mr: { xs: "var(--CardOverflow-offset)", sm: 0 },
          mb: { xs: 0, sm: "var(--CardOverflow-offset)" },
          "--AspectRatio-radius": {
            xs: "calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0",
            sm: "calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))",
          },
        }}
      >
        <AspectRatio
          ratio="1"
          flex
          sx={{
            minWidth: { sm: 120, md: 160 },
            "--AspectRatio-maxHeight": { xs: "160px", sm: "9999px" },
          }}
        >
          <img alt="" src={image} />
          <Stack
            alignItems="center"
            direction="row"
            sx={{ position: "absolute", top: 0, width: "100%", p: 1 }}
          >
            {countSoonExp(expirationDate) && (
              <Chip
                variant="soft"
                color="success"
                startDecorator={<WorkspacePremiumRoundedIcon />}
                size="md"
              >
                Expires soon
              </Chip>
            )}
            <IconButton
              variant="plain"
              size="sm"
              color={isLiked ? "danger" : "neutral"}
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                display: { xs: "flex", sm: "none" },
                ml: "auto",
                borderRadius: "50%",
                zIndex: "20",
              }}
            >
              <FavoriteRoundedIcon />
            </IconButton>
          </Stack>
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Box>
            <Stack
              spacing={1}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Stack direction="column" alignItems="flex-start">
                <Typography level="body-sm">{searcherName}</Typography>
                <Typography level="title-md">
                  <Link
                    overlay
                    underline="none"
                    href="#interactive-card"
                    sx={{ color: "text.primary" }}
                  >
                    {headline}
                  </Link>
                </Typography>
              </Stack>
              <IconButton
                variant="plain"
                size="sm"
                color={isLiked ? "danger" : "neutral"}
                onClick={() => setIsLiked((prev) => !prev)}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  borderRadius: "50%",
                }}
              >
                <FavoriteRoundedIcon />
              </IconButton>
            </Stack>
            <Stack
              spacing="0.25rem 1rem"
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={{ my: 0.25 }}
            >
              <Typography
                level="body-xs"
                startDecorator={<FmdGoodRoundedIcon />}
              >
                {location}
              </Typography>
              <Typography
                level="body-xs"
                startDecorator={<FaceRetouchingNaturalRoundedIcon />}
              >
                {mainRoles.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index < mainRoles.length - 1 && " | "}
                  </span>
                ))}
              </Typography>

              <Typography
                level="body-xs"
                startDecorator={<TheaterComedyRoundedIcon />}
              >
                {genres.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index < genres.length - 1 && " | "}
                  </span>
                ))}
              </Typography>
            </Stack>
          </Box>
          <Stack direction="row">
            <Typography level="body-sm" sx={{ textAlign: "justify" }}>
              {body}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mt: "auto" }}
          >
            <Typography level="body-xs" startDecorator={<EmailRoundedIcon />}>
              {email}
            </Typography>
            <Typography
              level="title-lg"
              sx={{ flexGrow: 1, textAlign: "right" }}
            >
              <Typography level="body-md">{`до ${expirationDate.toLocaleDateString()}`}</Typography>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
