import List from '@mui/joy/List';
import { listItemButtonClasses } from '@mui/joy/ListItemButton';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import { useContext } from 'react';
import { SmartJoint } from '../../models/jointProject/IJointProject';
import JointListItem from '../../components/jointProjects/JointListItem';

export type JointProjectsListProps = {
	setSelectedProject: (chat: SmartJoint) => void;
	selectedProjectId: number;
};

function JointProjectsList({
	setSelectedProject,
	selectedProjectId,
}: JointProjectsListProps) {
	const { jointProjectsStore } = useContext(Context);

	return (
		<List
			sx={{
				[`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]:
					{
						borderLeft: '2px solid',
						borderLeftColor: 'var(--joy-palette-primary-outlinedBorder)',
					},
				height: '100vh',
			}}
		>
			{jointProjectsStore.joints.map(project => (
				<JointListItem
					key={project.id}
					project={project}
					setSelectedProject={setSelectedProject}
					selectedProjectId={selectedProjectId}
				/>
			))}
		</List>
	);
}

export default observer(JointProjectsList);
