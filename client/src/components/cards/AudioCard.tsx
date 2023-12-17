import { Card, CardContent, Typography, Button, Stack } from "@mui/joy";
import { useRef } from "react";

export default function AudioCard() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Stack direction="column">
            <Typography level="title-md">Song Title</Typography>
            <Typography level="body-sm">Artist Name</Typography>
          </Stack>
          <audio
            ref={audioRef}
            src="https://melody-mingle-bucket.s3.eu-central-1.amazonaws.com/project-b507960e-58bf-4796-9ac5-2752c1366167.mp3"
          />
          <Button onClick={handlePlay}>Play</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
