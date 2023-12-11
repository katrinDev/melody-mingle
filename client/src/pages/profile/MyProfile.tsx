import { observer } from "mobx-react-lite";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import { Link as RouterLink } from "react-router-dom";
import Card from "@mui/joy/Card";
import ImageIcon from "@mui/icons-material/Image";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import DropZone from "../../components/uploads/DropZone";
import FileUpload from "../../components/uploads/FileUpload";
import { useContext } from "react";
import { Context } from "../../main";
import { ABOUT } from "../../router/paths";
import { Chip } from "@mui/joy";
import ProfileListBox from "../../components/boxex/ProfileListBox";

function MyProfile() {
  const { musicianStore, profileStore } = useContext(Context);

  const experience = musicianStore.musician.experience;
  const yearsName = experience === 1 ? "год" : experience < 5 ? "года" : "лет";

  const { avatarUrl, bio } = profileStore.profileInfo;

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="small" />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              component={RouterLink}
              to={ABOUT}
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              Профиль
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Stack
        spacing={3}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Stack direction="row" spacing={3} sx={{ display: "flex", mb: 0.5 }}>
          <AspectRatio
            ratio="1"
            maxHeight={500}
            sx={{ flex: 1, minWidth: 250, borderRadius: "2%" }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                srcSet={`${avatarUrl}&dpr=2 2x`}
                loading="lazy"
                alt=""
              />
            ) : (
              <div>
                <ImageIcon sx={{ fontSize: "3rem", opacity: 0.2 }} />
              </div>
            )}
          </AspectRatio>
          <Stack spacing={3} sx={{ flexGrow: 1 }}>
            <div>
              <Typography level="h2" component="h1" sx={{ mt: 1 }}>
                {musicianStore.musician.name}
              </Typography>
              <Typography>
                {musicianStore.musician.mainRole} - {experience} {yearsName}{" "}
                опыта
              </Typography>
            </div>

            <Stack direction="row" spacing={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography level="title-sm" sx={{ mb: 1.5 }}>
                  Город
                </Typography>
                <Chip
                  variant="outlined"
                  color="neutral"
                  size="sm"
                  sx={{ px: "10px", py: "3px", "--Chip-radius": "4px" }}
                >
                  <Typography level="body-sm" color="primary">
                    {musicianStore.musician.city}
                  </Typography>
                </Chip>
              </Box>

              {musicianStore.musician.subRoles && (
                <ProfileListBox
                  title="Дополнительные навыки"
                  list={musicianStore.musician.subRoles}
                  color="primary"
                />
              )}
            </Stack>

            <Stack direction="row" spacing={6}>
              {musicianStore.musician.languages && (
                <ProfileListBox
                  title="Языки"
                  color="neutral"
                  list={musicianStore.musician.languages}
                />
              )}

              {musicianStore.musician.genres && (
                <ProfileListBox
                  title="Жанры"
                  color="neutral"
                  list={musicianStore.musician.genres}
                />
              )}
            </Stack>
          </Stack>
        </Stack>
        <Divider />

        {bio && (
          <Stack spacing={2} sx={{ my: 1 }}>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Био</Typography>
            </Box>
            <Card>
              <Typography
                sx={{
                  textAlign: "justify",
                  textIndent: "1.5em",
                  padding: "1em",
                }}
              >
                {profileStore.profileInfo.bio}
              </Typography>
            </Card>
          </Stack>
        )}
        <Card sx={{ mt: 2 }}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Проекты</Typography>
            <Typography level="body-sm">вдохновляйся и создавай</Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <DropZone />
            <FileUpload
              icon={<InsertDriveFileRoundedIcon />}
              fileName="Tech design requirements.pdf"
              fileSize="200 kB"
              progress={100}
            />
            <FileUpload
              icon={<VideocamRoundedIcon />}
              fileName="Dashboard prototype recording.mp4"
              fileSize="16 MB"
              progress={40}
            />
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

export default observer(MyProfile);
