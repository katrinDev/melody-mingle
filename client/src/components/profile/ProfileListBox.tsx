import {
	Box,
	Chip,
	ChipPropsColorOverrides,
	ColorPaletteProp,
	Typography,
} from '@mui/joy';
import { OverridableStringUnion } from '@mui/types';

function ProfileListBox({
	list,
	title,
	color,
}: {
	list: string[];
	title: string;
	color:
		| OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides>
		| undefined;
}) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
			}}
		>
			<Typography level="title-sm">{title}:</Typography>
			<Box
				sx={{
					mt: 1.5,
					display: 'flex',
					flexWrap: 'wrap',
					maxWidth: '240px',
					gap: 1,
				}}
			>
				{list.map((item, itemIndex) => (
					<Chip
						key={itemIndex}
						variant="outlined"
						color={color}
						size="md"
						sx={{ px: '10px', py: '3px', '--Chip-radius': '4px' }}
					>
						{item}
					</Chip>
				))}
			</Box>
		</Box>
	);
}

export default ProfileListBox;
