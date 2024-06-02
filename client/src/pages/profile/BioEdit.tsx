import { observer } from 'mobx-react-lite';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Box from '@mui/joy/Box';
import TextEditorToolbar from '../../components/profile/editProfile/TextEditorToolbar';
import CardActions from '@mui/joy/CardActions';
import FormHelperText from '@mui/joy/FormHelperText';
import CardOverflow from '@mui/joy/CardOverflow';
import { useContext } from 'react';
import { Context } from '../../main';

function BioEdit() {
	const { profileStore } = useContext(Context);

	const profileData = profileStore.profileInfo;

	return (
		<Card>
			<Box sx={{ mb: 1 }}>
				<Typography level="title-md">Био</Typography>
				<Typography level="body-sm">
					Краткое описание твоего опыта и целей сотрудничества
				</Typography>
			</Box>
			<Divider />
			<Stack spacing={2} sx={{ my: 1 }}>
				<TextEditorToolbar />
				<Textarea
					size="sm"
					minRows={4}
					defaultValue={profileData.bio ? profileData.bio : 'Добавь описание'}
				/>
				<FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
					275 characters left
				</FormHelperText>
			</Stack>
			<CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
				<CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
					<Button size="sm" variant="outlined" color="neutral" type="button">
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

export default observer(BioEdit);
