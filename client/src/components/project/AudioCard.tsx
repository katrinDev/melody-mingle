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
import { IProject } from "../../models/IProject";

export default function AudioCard({ project }: { project: IProject }) {
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
            <Typography level="title-md">{project.projectName}</Typography>
            <Typography level="body-sm">{project.performer}</Typography>
          </Stack>
          <audio ref={audioRef} src={project.projectUrl} />
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
              {project.description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
