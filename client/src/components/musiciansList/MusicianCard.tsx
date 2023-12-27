import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import { IMusician } from "../../models/IMusician";
import { useState } from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { expStringCalculater } from "../../pages/profile/MyProfile";
import { observer } from "mobx-react-lite";
import PianoRoundedIcon from "@mui/icons-material/PianoRounded";
import { TheaterComedyRounded } from "@mui/icons-material";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";

function MusicianCard(props: IMusician) {
  const {
    mainRole,
    languages,
    city,
    genres,
    subRoles,
    experience,
    name,
    avatarUrl,
    user,
  } = props;

  const [isLiked, setIsLiked] = useState(false);
  const yearsName = expStringCalculater(experience);

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
          <img alt="" src={avatarUrl} />
          <Stack
            alignItems="center"
            direction="row"
            sx={{ position: "absolute", top: 0, width: "100%", p: 1 }}
          >
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
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack direction="column" alignItems="flex-start">
            <Typography level="body-sm">{mainRole}</Typography>
            <Typography level="title-md">
              <Link
                overlay
                underline="none"
                href="#interactive-card"
                sx={{ color: "text.primary" }}
              >
                {name}
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
          <Typography level="body-xs" startDecorator={<FmdGoodRoundedIcon />}>
            {city}
          </Typography>
          <Typography level="body-xs" startDecorator={<TheaterComedyRounded />}>
            {genres.map((item, index) => (
              <span key={index}>
                {item}
                {index < genres.length - 1 && " | "}
              </span>
            ))}
          </Typography>

          {subRoles ? (
            <Typography level="body-xs" startDecorator={<PianoRoundedIcon />}>
              {subRoles?.map((item, index) => (
                <span key={index}>
                  {item}
                  {index < subRoles.length - 1 && " |  "}
                </span>
              ))}
            </Typography>
          ) : (
            <Typography
              level="body-xs"
              startDecorator={<LanguageRoundedIcon />}
            >
              {languages.map((item, index) => (
                <span key={index}>
                  {item}
                  {index < languages.length - 1 && " |  "}
                </span>
              ))}
            </Typography>
          )}
        </Stack>

        <Stack
          direction="row"
          sx={{ mt: "auto" }}
          justifyContent="space-between"
        >
          <Typography level="body-xs" startDecorator={<EmailRoundedIcon />}>
            {user.email}
          </Typography>
          <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: "right" }}>
            <Typography level="body-md">{`${experience} ${yearsName} опыта`}</Typography>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default observer(MusicianCard);
