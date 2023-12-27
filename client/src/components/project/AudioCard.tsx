import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  ButtonGroup,
  Box,
} from "@mui/joy";
import { useRef } from "react";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";

export default function AudioCard() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Stack direction="column" minWidth="200px">
            <Typography level="title-md">Just give me a reason</Typography>
            <Typography level="body-sm">Pink</Typography>
          </Stack>
          <audio
            ref={audioRef}
            src="https://melody-mingle-bucket.s3.eu-central-1.amazonaws.com/project-b507960e-58bf-4796-9ac5-2752c1366167.mp3"
          />
          <ButtonGroup>
            <IconButton color="primary" size="md" onClick={handlePlay}>
              <PlayCircleFilledRoundedIcon />
            </IconButton>
            <IconButton color="primary" size="md" onClick={handlePause}>
              <PauseCircleFilledRoundedIcon />
            </IconButton>
          </ButtonGroup>

          <Box>
            <Typography
              sx={{
                textIndent: "1.5em",
                padding: "1em",
              }}
            >
              В этой композии я выступаю ведущим вокалистом и соавтором{" "}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
