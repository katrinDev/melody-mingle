import * as React from "react";
import { useEffect } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import imageLight from "/src/assets/musicians1.jpg";
import imageDark from "/src/assets/musicians2.jpg";
import { useContext } from "react";
import { FormHelperText, Link } from "@mui/joy";
import { InfoOutlined } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Context } from "../../main";
import { AuthRequest } from "../../models/request/AuthRequest";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { SIGN_UP } from "../../router/paths";

export function ColorSchemeToggle({ onClick, ...props }: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="md" variant="outlined" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
      sx={{
        position: "fixed",
        zIndex: 999,
        top: "2rem",
        right: "2rem",
        borderRadius: "50%",
        boxShadow: "sm",
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function SignIn() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<AuthRequest>();

  const { userStore, snackbarStore } = useContext(Context);
  const navigate = useNavigate();

  const signInSubmit: SubmitHandler<AuthRequest> = async (data, event) => {
    event?.preventDefault();
    if (Object.keys(errors).length === 0) {
      await userStore.login(data, snackbarStore);

      navigate("/about");
    }
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              px: 2,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                gap: 2,
                mt: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton variant="soft" color="primary" size="sm">
                <LibraryMusicRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Melody Mingle</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              pb: 5,
              display: "flex",
              flexDirection: "column",
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                flexDirection: "column",
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={1}>
              <Typography level="h3">Вход</Typography>
              <Typography level="body-sm">
                Пока нет профиля?{" "}
                <Link component={RouterLink} to={SIGN_UP} level="title-sm">
                  Зарегистрируйся!
                </Link>
              </Typography>
            </Stack>
            <Stack gap={3}>
              <form noValidate onSubmit={handleSubmit(signInSubmit)}>
                <FormControl sx={{ py: 2 }} required error={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Обязательное поле",
                      pattern: {
                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                        message: "Некорректный формат почты",
                      },
                    })}
                  />
                  {errors.email ? (
                    <FormHelperText>
                      <InfoOutlined />
                      {errors.email?.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl required error={!!errors.password}>
                  <FormLabel>Пароль</FormLabel>
                  <Input
                    type="password"
                    autoComplete="password"
                    {...register("password", {
                      required: "Обязательное поле",
                      minLength: { value: 5, message: "Длина пароля менее 5" },
                      maxLength: {
                        value: 10,
                        message: "Длина пароля более 10",
                      },
                    })}
                  />

                  {errors.password ? (
                    <FormHelperText>
                      <InfoOutlined />
                      {errors.password?.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <Stack gap={4} sx={{ mt: 4 }}>
                  <Button type="submit" fullWidth>
                    Подтвердить
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Melody Mingle {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${imageLight})`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: `url(${imageDark})`,
          },
        })}
      />
    </CssVarsProvider>
  );
}
