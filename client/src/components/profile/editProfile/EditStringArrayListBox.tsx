import { Box, Chip, ChipDelete, IconButton } from '@mui/joy';
import { useState } from 'react';
import SettingsBackupRestoreRoundedIcon from '@mui/icons-material/SettingsBackupRestoreRounded';

function EditStringArrayListBox({ list }: { list: string[] }) {
	const [deleteClicked, setDeleteClicked] = useState(
		new Array(list.length).fill(false)
	);

	function changeDeleteValue(index: number, newValue: boolean) {
		setDeleteClicked(prevDeleteClicked => {
			const newDeleteClicked = prevDeleteClicked.map((value, i) =>
				i === index ? newValue : value
			);
			console.log(newDeleteClicked); // Log the new state
			return newDeleteClicked;
		});
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
			}}
		>
			<Box sx={{ mb: 1.5, mt: 0.5, display: 'flex', gap: 1 }}>
				{list.map((item, itemIndex) => (
					<Chip
						key={itemIndex}
						variant="outlined"
						color={deleteClicked[itemIndex] ? 'danger' : 'primary'}
						size="md"
						endDecorator={
							deleteClicked[itemIndex] ? (
								<IconButton onClick={() => changeDeleteValue(itemIndex, false)}>
									<SettingsBackupRestoreRoundedIcon
										style={{ maxWidth: '20px' }}
									/>
								</IconButton>
							) : (
								<ChipDelete
									onDelete={() => changeDeleteValue(itemIndex, true)}
									sx={{ pt: '3px' }}
								/>
							)
						}
						sx={{
							maxHeight: '30px',
							py: '3px',
							'--Chip-radius': '4px',
						}}
					>
						{item}
					</Chip>
				))}
			</Box>
		</Box>
	);
}

export default EditStringArrayListBox;
