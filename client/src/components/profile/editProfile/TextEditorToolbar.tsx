import Box, { BoxProps } from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";

import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";

export default function EditorToolbar(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      {...other}
      sx={[
        {
          display: "flex",
          gap: 0.5,
          "& > button": { "--Icon-fontSize": "16px" },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <IconButton size="sm" variant="plain" color="neutral">
        <FormatBoldRoundedIcon />
      </IconButton>
      <IconButton size="sm" variant="plain" color="neutral">
        <FormatItalicRoundedIcon />
      </IconButton>
      <IconButton size="sm" variant="plain" color="neutral">
        <StrikethroughSRoundedIcon />
      </IconButton>
      <IconButton size="sm" variant="plain" color="neutral">
        <FormatListBulletedRoundedIcon />
      </IconButton>
    </Box>
  );
}
