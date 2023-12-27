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
import { IOffer } from "../../models/IOffer";
import { useState } from "react";
import moment from "moment";
import MapModal from "../googleMap/MapModal";

function countSoonExp(expirationDate: Date) {
  const now = moment();
  const expiry = moment(expirationDate);
  const diffInDays = expiry.diff(now, "days");
  return diffInDays < 3;
}

export default function OfferCard(props: IOffer) {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const {
    headline,
    body,
    location,
    mainRoles,
    genres,
    expirationDate,
    photoUrl,
    musician,
  } = props;
  const [isLiked, setIsLiked] = useState(false);
  const formattedDate = moment(expirationDate).format("DD.MM.YYYY");

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
          <img alt="" src={photoUrl} />
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
                <Typography level="body-sm">{musician.name}</Typography>
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
              spacing="0.2rem 1rem"
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={{ my: 0.25 }}
            >
              <Typography
                level="body-xs"
                startDecorator={
                  <IconButton
                    size="sm"
                    onClick={() => setIsMapOpen(true)}
                    sx={{
                      minWidth: "25px",
                      paddingInline: 0,
                      "&:hover": {
                        color: "danger.500",
                      },
                    }}
                  >
                    <FmdGoodRoundedIcon />
                  </IconButton>
                }
              >
                {location}
              </Typography>

              <MapModal
                isOpen={isMapOpen}
                setIsOpen={setIsMapOpen}
                headline={headline}
                address={location}
              />
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
              {musician.user.email}
            </Typography>
            <Typography
              level="title-lg"
              sx={{ flexGrow: 1, textAlign: "right" }}
            >
              <Typography level="body-md">{`до ${formattedDate}`}</Typography>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
