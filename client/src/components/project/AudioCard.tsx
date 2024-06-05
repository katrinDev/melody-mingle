import { Card, CardContent, Typography, Stack, Box } from '@mui/joy';
import { IProject } from '../../models/IProject';
import AudioButtons from '../audio/AudioButtons';
import { observer } from 'mobx-react-lite';

function AudioCard({ project }: { project: IProject }) {
	return (
		<Card>
			<CardContent>
				<Stack
					direction="row"
					spacing={1}
					justifyContent="space-between"
					alignItems="center"
				>
					<Stack direction="column" minWidth="200px">
						<Typography level="title-md">{project.projectName}</Typography>
						<Typography level="body-sm">{project.performer}</Typography>
					</Stack>
					<AudioButtons audioUrl={project.projectUrl} />

					<Box>
						<Typography
							sx={{
								textIndent: '1.5em',
								padding: '1em',
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

export default observer(AudioCard);
