import { observer } from "mobx-react-lite";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import { Link as RouterLink } from "react-router-dom";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CountrySelector from "../../components/CountrySelector";
import TextEditorToolbar from "../../components/toolbars/TextEditorToolbar";
import DropZone from "../../components/uploads/DropZone";
import FileUpload from "../../components/uploads/FileUpload";
import { useContext } from "react";
import { Context } from "../../main";
import { ABOUT } from "../../router/paths";
import { Chip } from "@mui/joy";
import ProfileListBox from "../../components/boxex/ProfileListBox";

function MyProfile() {
  const { musicianStore, userStore, snackbarStore } = useContext(Context);

  const experience = musicianStore.musician.experience;
  const yearsName = experience === 1 ? "год" : experience < 5 ? "года" : "лет";
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
        spacing={2}
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
            maxHeight={400}
            sx={{ flex: 1, minWidth: 250, borderRadius: "2%" }}
          >
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
              srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt=""
            />
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

        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">Био</Typography>
        </Box>
        <Stack spacing={2} sx={{ my: 1 }}>
          <Textarea
            size="sm"
            minRows={4}
            sx={{ mt: 1.5 }}
            defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
          />
          <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
            275 characters left
          </FormHelperText>
        </Stack>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Portfolio projects</Typography>
            <Typography level="body-sm">
              Share a few snippets of your work.
            </Typography>
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
