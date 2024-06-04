import { observer } from 'mobx-react-lite';
import JointContent from '../../components/jointProjects/JointContent';
import { Box, Button, Typography } from '@mui/joy';
import Layout from './Layout';
import { useContext, useEffect, useState } from 'react';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { Context } from '../../main';
import { SmartJoint } from '../../models/jointProject/IJointProject';
import { AxiosError } from 'axios';
import JointsList from '../../components/jointProjects/JointsList';

function JointProjectsPage() {
	const { jointProjectsStore, snackbarStore, musicianStore } =
		useContext(Context);
	const [selectedProject, setSelectedProject] = useState<SmartJoint | null>(
		null
	);
	const [loadingProjects, setLoadingProjects] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoadingProjects(true);
				await jointProjectsStore.fetchJointsForUser(
					snackbarStore,
					musicianStore.musician.id
				);

				setSelectedProject(jointProjectsStore.joints[0]);
				setLoadingProjects(false);
			} catch (error) {
				if (error instanceof AxiosError) {
					const serverMessage = error.response?.data.message;

					snackbarStore.changeAll(true, 'danger', `${serverMessage}`);
				}
			}
		};

		fetchData();
	}, []);

	if (loadingProjects || !selectedProject) {
		return <div>Loading...</div>;
	} else {
		return (
			<>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							md: 'minmax(300px, 450px) minmax(500px, 1fr)',
						},
					}}
				>
					<Layout.SidePane>
						<Box
							sx={{
								p: 2,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<Box sx={{ alignItems: 'center', gap: 1 }}>
								<Typography
									level="title-lg"
									textColor="text.secondary"
									component="h1"
								>
									Мои проекты
								</Typography>
							</Box>
							<Button
								size="sm"
								startDecorator={<CreateRoundedIcon />}
								onClick={() => {}}
								sx={{ ml: 'auto' }}
							>
								Создать
							</Button>
						</Box>
						<JointsList
							selectedProjectId={selectedProject.id}
							setSelectedProject={setSelectedProject}
						/>
					</Layout.SidePane>
					<Layout.Main>
						<JointContent project={selectedProject} />
					</Layout.Main>
				</Box>
			</>
		);
	}
}

export default observer(JointProjectsPage);
