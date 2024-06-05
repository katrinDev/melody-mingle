import AspectRatio from "@mui/joy/AspectRatio";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import { useForm, SubmitHandler } from "react-hook-form";

import ImageIcon from "@mui/icons-material/Image";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import { Select, TabPanel, Option } from "@mui/joy";
import { InfoOutlined } from "@mui/icons-material";
import { IMusician } from "../../models/musician/IMusician";
import EditProjects from "./EditProjects";
import BioEdit from "./BioEdit";
import EditStringArrayListBox from "../../components/profile/editProfile/EditStringArrayListBox";

function EditProfilePage() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IMusician>();

  const { musicianStore, profileStore, snackbarStore } = useContext(Context);
  const profileData = profileStore.profileInfo;
  const musician = musicianStore.musician;
  const inputAvatarRef = useRef<HTMLInputElement>(null);
  const [newSubRole, setNewSubRole] = useState("");

  const handleEditAvatarButtonClick = () => {
    inputAvatarRef.current?.click();
  };

  const handleAddSubRoleClick = () => {
    if (newSubRole) {
      musicianStore.addSubRole(newSubRole);
      setNewSubRole("");
    }
  };

  const updateMusicianSubmit: SubmitHandler<IMusician> = async (
    data,
    event
  ) => {
    event?.preventDefault();
    if (Object.keys(errors).length === 0) {
      await musicianStore.updateMusician({...musician, ...data}, snackbarStore);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const MAX_SIZE = 3 * 1024 * 1024;

    if (!file) {
      return;
    }

    if (file.size > MAX_SIZE) {
      snackbarStore.changeAll(
        true,
        "danger",
        "Размер файла не должен превышать 3 Мбайт!"
      );
    } else {
      profileStore.updateAvatar(file, snackbarStore);
    }
  };

  useEffect(() => {
    if (
      musician.city &&
      musician.name &&
      musician.mainRole &&
      musician.experience
    ) {
      reset({
        city: musician.city,
        name: musician.name,
        mainRole: musician.mainRole,
        experience: musician.experience,
      });
    }
  }, [musician, reset]);

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
              <Card sx={{ pb: 0 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography level="title-md">Персональные данные</Typography>
                </Box>

                <Divider />

                <form onSubmit={handleSubmit(updateMusicianSubmit)}>
                  <Stack
                    direction="row"
                    spacing={3}
                    sx={{ display: "flex", my: 2 }}
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
                            <ImageIcon
                              sx={{ fontSize: "3rem", opacity: 0.2 }}
                            />
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
                        onClick={handleEditAvatarButtonClick}
                      >
                        <EditRoundedIcon />
                        <input
                          ref={inputAvatarRef}
                          type="file"
                          accept="image/jpeg"
                          style={{ display: "none" }}
                          onChange={(event) => handleImageChange(event)}
                        />
                      </IconButton>
                    </Stack>

                    <Stack spacing={3} sx={{ flexGrow: 1 }}>
                      <Stack direction="row" spacing={2}>
                        <FormControl
                          sx={{
                            display: { sm: "flex-column", md: "flex-row" },
                            flexGrow: 0.8,
                          }}
                          error={!!errors.name}
                        >
                          <FormLabel>Псевдоним</FormLabel>
                          <Input
                            size="sm"
                            defaultValue={musician.name}
                            sx={{ flexGrow: 0.8 }}
                            {...register("name", {
                              minLength: {
                                value: 2,
                                message: "Слишком короткое имя",
                              },
                              maxLength: {
                                value: 40,
                                message: "Слишком длинное имя",
                              },
                            })}
                          />
                          {errors.name && (
                            <FormHelperText>
                              <InfoOutlined />
                              {errors.name.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <FormControl
                          sx={{ flexGrow: 0.2 }}
                          error={!!errors.experience}
                        >
                          <FormLabel>Опыт</FormLabel>
                          <Input
                            type="number"
                            size="sm"
                            defaultValue={musician.experience}
                            key={musician.experience}
                            sx={{ flexGrow: 0.2 }}
                            {...register("experience", {
                              valueAsNumber: true,
                              min: {
                                value: 0.1,
                                message: "Указанный опыт менее 0.1",
                              },
                              max: {
                                value: 70.0,
                                message: "Слишком большое значение",
                              },
                            })}
                          />
                          {errors.experience && (
                            <FormHelperText>
                              <InfoOutlined />
                              {errors.experience.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <FormControl
                          sx={{ flexGrow: 0.5 }}
                          error={!!errors.mainRole}
                        >
                          <FormLabel>Главная роль</FormLabel>
                          <Input
                            size="sm"
                            defaultValue={musician.mainRole}
                            sx={{ flexGrow: 0.5 }}
                            {...register("mainRole", {
                              validate: (value) =>
                                (value.length >= 2 && value.length <= 15) ||
                                "Некорректная длина роли",
                            })}
                          />
                          {errors.mainRole?.message && (
                            <FormHelperText>
                              <InfoOutlined />
                              {errors.mainRole.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <FormControl
                          sx={{ flexGrow: 0.5 }}
                          error={!!errors.city}
                        >
                          <FormLabel>Город</FormLabel>
                          <Input
                            size="sm"
                            startDecorator={<LocationOnRoundedIcon />}
                            defaultValue={musician.city}
                            {...register("city", {
                              validate: (value) =>
                                (value.length >= 2 && value.length <= 10) ||
                                "Некорректная длина поля",
                            })}
                          />
                          {errors.city?.message && (
                            <FormHelperText>
                              <InfoOutlined />
                              {errors.city.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Stack>
                      <div>
                        <FormControl sx={{ display: { sm: "contents" } }}>
                          <FormLabel>Дополнительные навыки</FormLabel>
                          {musician.subRoles && (
                            <EditStringArrayListBox list={musician.subRoles} />
                          )}
                          <Input
                            size="sm"
                            placeholder="Навык"
                            value={newSubRole}
                            onChange={(e) => setNewSubRole(e.target.value)}
                            endDecorator={
                                <Stack direction="row">
                                  <IconButton onClick={handleAddSubRoleClick}>
                                    <AddRoundedIcon />
                                  </IconButton>
                                  <IconButton onClick={() => setNewSubRole("")}>
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
                            <EditStringArrayListBox list={musician.genres} />
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
                            <EditStringArrayListBox list={musician.languages} />
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
                    <CardActions sx={{ alignSelf: "flex-end" }}>
                      <Button size="sm" variant="outlined" color="neutral" type="button" onClick={() => reset()}>
                        Отменить
                      </Button>
                      <Button type="submit" size="sm" variant="solid">
                        Сохранить
                      </Button>
                    </CardActions>
                  </CardOverflow>
                </form>
              </Card>
              
              <BioEdit/>
            </Stack>
          </TabPanel>

          <TabPanel value={1}>
            <EditProjects/>
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  ) : (
    <>Loading...</>
	);
}

export default observer(EditProfilePage);
