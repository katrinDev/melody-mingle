import AspectRatio from "@mui/joy/AspectRatio";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";

import ImageIcon from "@mui/icons-material/Image";
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
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import TextEditorToolbar from "../../components/profile/editProfile/TextEditorToolbar";
import { Context } from "../../main";
import DropZone from "../../components/profile/editProfile/DropZone";
import FileUpload from "../../components/profile/editProfile/FileUpload";
import { Select, TabPanel, Option } from "@mui/joy";
import EditProfileListBox from "../../components/profile/editProfile/EditProfileListBox";

function EditProfile() {
  const { musicianStore, profileStore } = useContext(Context);

  const profileData = profileStore.profileInfo;
  const musician = musicianStore.musician;

  return musician ? (
    <Box sx={{ flex: 1, width: "100%", pt: "20px" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            {musicianStore.musician.name}
          </Typography>
        </Box>
        <Tabs
          defaultValue={0}
          sx={{
            bgcolor: "transparent",
          }}
        >
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: { xs: 0, md: 4 },
              justifyContent: "left",
              [`&& .${tabClasses.root}`]: {
                fontWeight: "600",
                flex: "initial",
                color: "text.tertiary",
                [`&.${tabClasses.selected}`]: {
                  bgcolor: "transparent",
                  color: "text.primary",
                  "&::after": {
                    height: "2px",
                    bgcolor: "primary.500",
                  },
                },
              },
            }}
          >
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={0}>
              Характеристика
            </Tab>
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={1}>
              Проекты
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <Stack
              spacing={4}
              sx={{
                display: "flex",
                maxWidth: "850px",
                mx: "auto",
                px: { xs: 2, md: 6 },
                py: { xs: 2, md: 3 },
              }}
            >
              <Card>
                <Box sx={{ mb: 1 }}>
                  <Typography level="title-md">Персональные данные</Typography>
                </Box>
                <Divider />
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ display: "flex", my: 1 }}
                >
                  <Stack direction="column" spacing={1}>
                    <AspectRatio
                      ratio="1"
                      maxHeight={300}
                      sx={{ flex: 1, minWidth: 140, borderRadius: "100%" }}
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
                    <IconButton
                      aria-label="upload new picture"
                      size="sm"
                      variant="outlined"
                      color="neutral"
                      sx={{
                        bgcolor: "background.body",
                        position: "absolute",
                        zIndex: 2,
                        borderRadius: "50%",
                        left: 110,
                        top: 190,
                        boxShadow: "sm",
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </Stack>
                  <Stack spacing={3} sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={2}>
                      <FormControl
                        sx={{
                          display: { sm: "flex-column", md: "flex-row" },
                          flexGrow: 0.8,
                        }}
                      >
                        <FormLabel>Псевдоним</FormLabel>
                        <Input
                          size="sm"
                          defaultValue={musician.name}
                          sx={{ flexGrow: 0.8 }}
                        />
                      </FormControl>
                      <FormControl sx={{ flexGrow: 0.2 }}>
                        <FormLabel>Опыт</FormLabel>
                        <Input
                          size="sm"
                          defaultValue={musician.experience}
                          sx={{ flexGrow: 0.2 }}
                        />
                      </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <FormControl sx={{ flexGrow: 0.5 }}>
                        <FormLabel>Главная роль</FormLabel>
                        <Input
                          size="sm"
                          defaultValue={musician.mainRole}
                          sx={{ flexGrow: 0.5 }}
                        />
                      </FormControl>
                      <FormControl sx={{ flexGrow: 0.5 }}>
                        <FormLabel>Город</FormLabel>
                        <Input
                          size="sm"
                          startDecorator={<LocationOnRoundedIcon />}
                          defaultValue={musician.city}
                        />
                      </FormControl>
                    </Stack>
                    <div>
                      <FormControl sx={{ display: { sm: "contents" } }}>
                        <FormLabel>Дополнительные навыки</FormLabel>
                        {musician.subRoles && (
                          <EditProfileListBox
                            list={musician.subRoles}
                            color="primary"
                          />
                        )}
                        <Input
                          size="sm"
                          placeholder="Навык"
                          endDecorator={
                            <Stack direction="row">
                              <IconButton>
                                <AddRoundedIcon />
                              </IconButton>
                              <IconButton>
                                <RemoveRoundedIcon />
                              </IconButton>
                            </Stack>
                          }
                        />
                      </FormControl>
                    </div>

                    <div>
                      <FormControl sx={{ display: { sm: "contents" } }}>
                        <FormLabel>Жанры</FormLabel>
                        {musician.genres && (
                          <EditProfileListBox
                            list={musician.genres}
                            color="primary"
                          />
                        )}
                        <Input
                          size="sm"
                          placeholder="Жанр"
                          endDecorator={
                            <Stack direction="row">
                              <IconButton>
                                <AddRoundedIcon />
                              </IconButton>
                              <IconButton>
                                <RemoveRoundedIcon />
                              </IconButton>
                            </Stack>
                          }
                        />
                      </FormControl>
                    </div>
                    <div>
                      <FormControl sx={{ display: { sm: "contents" } }}>
                        <FormLabel>Языки</FormLabel>
                        {musician.languages && (
                          <EditProfileListBox
                            list={musician.languages}
                            color="primary"
                          />
                        )}
                        <Select
                          size="sm"
                          startDecorator={<TranslateRoundedIcon />}
                          placeholder="Китайский"
                        >
                          <Option value="Китайский">Китайский</Option>
                          <Option value="Корейский">Корейский</Option>
                        </Select>
                      </FormControl>
                    </div>
                  </Stack>
                </Stack>
                <CardOverflow
                  sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                    <Button size="sm" variant="outlined" color="neutral">
                      Отменить
                    </Button>
                    <Button size="sm" variant="solid">
                      Сохранить
                    </Button>
                  </CardActions>
                </CardOverflow>
              </Card>
              <Card>
                <Box sx={{ mb: 1 }}>
                  <Typography level="title-md">Био</Typography>
                  <Typography level="body-sm">
                    Краткое описание твоего опыта и целей сотрудничества
                  </Typography>
                </Box>
                <Divider />
                <Stack spacing={2} sx={{ my: 1 }}>
                  <TextEditorToolbar />
                  <Textarea
                    size="sm"
                    minRows={4}
                    defaultValue={
                      profileData.bio ? profileData.bio : "Добавь описание"
                    }
                  />
                  <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
                    275 characters left
                  </FormHelperText>
                </Stack>
                <CardOverflow
                  sx={{ borderTop: "1px solid", borderColor: "divider" }}
                >
                  <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                    <Button size="sm" variant="outlined" color="neutral">
                      Отменить
                    </Button>
                    <Button size="sm" variant="solid">
                      Сохранить
                    </Button>
                  </CardActions>
                </CardOverflow>
              </Card>
            </Stack>
          </TabPanel>

          <TabPanel value={1}>
            <Card
              sx={{
                display: "flex",
                maxWidth: "800px",
                mx: "auto",
                my: { xs: 2, md: 3 },
              }}
            >
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
              <CardOverflow
                sx={{ borderTop: "1px solid", borderColor: "divider" }}
              >
                <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                  <Button size="sm" variant="outlined" color="neutral">
                    Отменить
                  </Button>
                  <Button size="sm" variant="solid">
                    Сохранить
                  </Button>
                </CardActions>
              </CardOverflow>
            </Card>
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  ) : (
    <>Loading...</>
  );
}

export default observer(EditProfile);
