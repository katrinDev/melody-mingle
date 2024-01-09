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
import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { ABOUT, MUSICIANS } from "../../router/paths";
import { Chip } from "@mui/joy";
import ProfileListBox from "../../components/profile/ProfileListBox";
import AudioCard from "../../components/project/AudioCard";
import { useParams } from "react-router-dom";
import { IMusician } from "../../models/IMusician";
import MusicianService from "../../services/MusicianService";
import { AxiosError } from "axios";
import ProfileInfoService from "../../services/ProfileInfoService";
import IProfileInfo from "../../models/IProfileInfo";
import { IProject } from "../../models/IProject";
import ProjectsService from "../../services/ProjectsService";

export function expStringCalculater(experience: number) {
  const yearsName = experience === 1 ? "год" : experience < 5 ? "года" : "лет";
  return yearsName;
}

function Profile() {
  const { id } = useParams();

  const numberMusicianId = Number(id);
  const { musicianStore, profileStore, snackbarStore } = useContext(Context);

  const [musician, setMusician] = useState<IMusician>(musicianStore.musician);
  const [profileData, setProfileData] = useState<IProfileInfo>(
    profileStore.profileInfo
  );
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(false);
  const [loadingMusician, setLoadingMusician] = useState<boolean>(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const { data } = await ProjectsService.getProjectsByMusician(
          numberMusicianId || musicianStore.musician.id
        );

        setProjects(data);
        setLoadingProjects(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          const serverMessage = error.response?.data.message;

          snackbarStore.changeAll(true, "danger", `${serverMessage}`);
        }
      }
    };

    const fetchMusicianAndProfileData = async () => {
      try {
        setLoadingMusician(true);
        const { data } = await MusicianService.getMusicianById(
          numberMusicianId
        );
        setMusician(data);

        const profileResponse =
          await ProfileInfoService.getProfileDataByMusicianId(numberMusicianId);

        setProfileData(profileResponse.data);

        setLoadingMusician(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          const serverMessage = error.response?.data.message;

          snackbarStore.changeAll(true, "danger", `${serverMessage}`);
        }
      }
    };

    if (id) {
      fetchMusicianAndProfileData();
    }
    fetchProjects();
  }, []);

  const experience = musician.experience;
  const yearsName = expStringCalculater(experience);

  if ((loadingMusician && id) || loadingProjects) {
    return <Box>Loading...</Box>;
  } else {
    return (
      <Box sx={{ flex: 1, width: "100%", pt: "20px" }}>
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
              {id ? (
                <Typography color="neutral" fontWeight={500} fontSize={12}>
                  <Link
                    underline="none"
                    color="primary"
                    component={RouterLink}
                    to={MUSICIANS}
                  >
                    Музыканты
                  </Link>
                </Typography>
              ) : (
                <Typography color="primary" fontWeight={500} fontSize={12}>
                  Профиль
                </Typography>
              )}
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
              {profileData.avatarUrl ? (
                <img
                  src={profileData.avatarUrl}
                  srcSet={`${profileData.avatarUrl}&dpr=2 2x`}
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
                  {musician.name}
                </Typography>
                <Typography>
                  {musician.mainRole} - {experience} {yearsName} опыта
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
                      {musician.city}
                    </Typography>
                  </Chip>
                </Box>

                {musician.subRoles && (
                  <ProfileListBox
                    title="Дополнительные навыки"
                    list={musician.subRoles}
                    color="primary"
                  />
                )}
              </Stack>

              <Stack direction="row" spacing={6}>
                {musician.languages && (
                  <ProfileListBox
                    title="Языки"
                    color="neutral"
                    list={musician.languages}
                  />
                )}

                {musician.genres && (
                  <ProfileListBox
                    title="Жанры"
                    color="neutral"
                    list={musician.genres}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>
          <Divider />

          {profileData.bio && (
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
                  {profileData.bio}
                </Typography>
              </Card>
            </Stack>
          )}

          {projects.length > 0 ? (
            <Card sx={{ mt: 2 }}>
              <Box sx={{ mb: 1 }}>
                <Typography level="title-md">Творческие проекты</Typography>
              </Box>
              <Divider />
              <Stack spacing={2} sx={{ my: 1 }}>
                {projects.map((project) => (
                  <AudioCard project={project} key={project.id} />
                ))}
              </Stack>
            </Card>
          ) : null}
        </Stack>
      </Box>
    );
  }
}

export default observer(Profile);
