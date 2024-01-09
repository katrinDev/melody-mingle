import {
  Box,
  Chip,
  ChipDelete,
  ChipPropsColorOverrides,
  ColorPaletteProp,
} from "@mui/joy";
import { OverridableStringUnion } from "@mui/types";

function EditProfileListBox({
  list,
  color,
}: {
  list: string[];
  color:
    | OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides>
    | undefined;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ mb: 1.5, mt: 0.5, display: "flex", gap: 1 }}>
        {list.map((item, itemIndex) => (
          <Chip
            key={itemIndex}
            variant="outlined"
            color={color}
            size="md"
            endDecorator={
              <ChipDelete
                onDelete={() => alert(`${item}`)}
                sx={{ pt: "3px" }}
              />
            }
            sx={{
              px: "10px",
              py: "3px",
              "--Chip-radius": "4px",
            }}
          >
            {item}
          </Chip>
        ))}
      </Box>
    </Box>
  );
}

export default EditProfileListBox;
