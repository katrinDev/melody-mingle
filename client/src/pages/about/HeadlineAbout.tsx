import AvatarGroup from "@mui/joy/AvatarGroup";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
import TwoSidedLayout from "./TwoSidedLayout";
import avatar3 from "../../assets/flea.jpg";
import avatar2 from "../../assets/taylor_momsen.jpg";
import avatar1 from "../../assets/chester_2.jpg";
import { Link } from "react-router-dom";
import { MY_PROFILE, OFFERS } from "../../router/paths";

export default function HeadlineAbout() {
  return (
    <TwoSidedLayout>
      <Typography color="primary" fontSize="lg" fontWeight="lg">
        Melody Mingle
      </Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        We help musicians implementing their biggest ideas
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
        Create magical sounds and inspire without limits
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          my: 2,
          "& > *": { flex: "auto" },
        }}
      >
        <Link to={OFFERS}>
          <Button size="lg" variant="outlined" color="neutral">
            Сотрудничать
          </Button>
        </Link>
        <Link to={MY_PROFILE}>
          <Button size="lg" endDecorator={<ArrowForward fontSize="large" />}>
            Мой профиль
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          textAlign: "left",
          "& > *": {
            flexShrink: 0,
          },
        }}
      >
        <AvatarGroup size="lg">
          <Avatar src={avatar1} />
          <Avatar src={avatar2} />
          <Avatar src={avatar3} />
        </AvatarGroup>
        <Typography textColor="text.secondary">
          Присоединяйся к комьюнити более <b>10K</b> <br />
          музыкантов.
        </Typography>
      </Box>
      <Typography
        sx={{
          position: "absolute",
          top: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <b>
          {" "}
          <i>Unleash the power to do more</i>
        </b>
      </Typography>
    </TwoSidedLayout>
  );
}
