import { SmartJoint } from '../../models/jointProject/IJointProject';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { observer } from 'mobx-react-lite';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import { Fragment } from 'react';

type JointProjectsListItemProps = {
	project: SmartJoint;
	setSelectedProject: (chat: SmartJoint) => void;
	selectedProjectId: number;
};

export function dateFormat(date: Date): string {
	date = new Date(date);
	const month = date.getMonth() + 1;
	const monthString: string = month < 10 ? `0${month}` : `${month}`;

	return `${date.getDate()}.${monthString}.${date.getFullYear()}`;
}

function JointListItem({
	project,
	setSelectedProject,
	selectedProjectId,
}: JointProjectsListItemProps) {
	const selected = selectedProjectId === project.id;

	return (
		<Fragment>
			<ListItem sx={{ height: '140px' }}>
				<ListItemButton
					onClick={() => {
						setSelectedProject({ ...project });
					}}
					selected={selected}
					color="neutral"
					sx={{ p: 2, alignItems: 'flex-start' }}
				>
					<ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
						<Avatar alt="Аватар" src={project.companion.avatarUrl} />
					</ListItemDecorator>

					<Box sx={{ pl: 2, width: '100%' }}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								mb: 0.5,
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
								<Typography level="body-xs">
									{project.companion.name}
								</Typography>
								<Box
									sx={{
										width: '8px',
										height: '8px',
										borderRadius: '99px',
										bgcolor: 'primary.500',
									}}
								/>
							</Box>
							<Typography level="body-xs" textColor="text.tertiary">
								{dateFormat(project.createdAt)}
							</Typography>
						</Box>
						<div>
							<Typography level="title-sm" sx={{ mb: 0.5 }}>
								{project.headline}
							</Typography>
							<Typography level="body-sm">{project.description}</Typography>
						</div>
					</Box>
				</ListItemButton>
			</ListItem>
			<ListDivider sx={{ m: 0 }} />
		</Fragment>
	);
}

export default observer(JointListItem);
