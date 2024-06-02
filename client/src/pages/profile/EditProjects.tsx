import { Box, Card, Divider, Stack, Typography } from '@mui/joy';
import DropZone from '../../components/profile/editProfile/DropZone';
import { observer } from 'mobx-react-lite';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import FileUpload from '../../components/profile/editProfile/FileUpload';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Button from '@mui/joy/Button';

function EditProjects() {
	return (
		<Card
			sx={{
				display: 'flex',
				maxWidth: '800px',
				mx: 'auto',
				my: { xs: 2, md: 3 },
			}}
		>
			<Box sx={{ mb: 1 }}>
				<Typography level="title-md">Ваши проекты</Typography>
				<Typography level="body-sm">Добавьте свои работы</Typography>
			</Box>
			<Divider />
			<Stack spacing={2} sx={{ my: 1 }}>
				<DropZone />
				<FileUpload
					icon={<InsertDriveFileRoundedIcon />}
					fileName="Tech design requirements.pdf"
					fileSize="200 kB"
					progress={100}
				/>
				<FileUpload
					icon={<VideocamRoundedIcon />}
					fileName="Dashboard prototype recording.mp4"
					fileSize="16 MB"
					progress={40}
				/>
			</Stack>
			<CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
				<CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
					<Button size="sm" variant="outlined" color="neutral">
						Отменить
					</Button>
					<Button size="sm" variant="solid">
						Сохранить
					</Button>
				</CardActions>
			</CardOverflow>
		</Card>
	);
}

export default observer(EditProjects);
