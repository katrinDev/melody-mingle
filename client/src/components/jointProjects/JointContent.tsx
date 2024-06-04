import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Avatar from '@mui/joy/Avatar';
import Tooltip from '@mui/joy/Tooltip';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ForwardToInboxRoundedIcon from '@mui/icons-material/ForwardToInboxRounded';
import { observer } from 'mobx-react-lite';
import { SmartJoint } from '../../models/jointProject/IJointProject';
import { Context } from '../../main';
import { useContext } from 'react';
import { dateFormat } from './JointListItem';
import SongChunksInterface from './SongChunksInterface';

type JointContentProps = {
	project: SmartJoint;
};

function JointContent({ project }: JointContentProps) {
	const { userStore } = useContext(Context);

	return (
		<Sheet
			variant="outlined"
			sx={{
				minHeight: 500,
				borderRadius: 'sm',
				p: 2,
				m: 3,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: 2,
				}}
			>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Avatar
						src={project.companion.avatarUrl}
						srcSet={`${project.companion.avatarUrl}&dpr=2 2x`}
					/>
					<Box sx={{ ml: 2 }}>
						<Typography level="title-sm" textColor="text.primary" mb={0.5}>
							{project.companion.name}
						</Typography>
						<Typography
							level="body-xs"
							textColor="text.tertiary"
							textAlign="left"
						>
							{`Обновлен ${dateFormat(project.updatedAt)}`}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						height: '32px',
						flexDirection: 'row',
						gap: 1.5,
					}}
				>
					<Button
						size="sm"
						variant="plain"
						color="success"
						startDecorator={<ForwardToInboxRoundedIcon />}
						onClick={() => {}}
					>
						В чат
					</Button>
					<Button
						size="sm"
						variant="plain"
						color="danger"
						startDecorator={<DeleteRoundedIcon />}
						onClick={() => {}}
					>
						Удалить
					</Button>
				</Box>
			</Box>

			<Divider sx={{ mt: 2 }} />
			<Box
				sx={{
					py: 2,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
				}}
			>
				<Typography
					level="title-lg"
					textColor="text.primary"
					endDecorator={
						<Chip component="span" size="sm" variant="outlined" color="warning">
							Трек
						</Chip>
					}
				>
					{project.headline}
				</Typography>
				<Box
					sx={{
						mt: 1,
						display: 'flex',
						alignItems: 'center',
						gap: 1,
						flexWrap: 'wrap',
					}}
				>
					<div>
						<Tooltip size="sm" title="Copy email" variant="outlined">
							<Chip size="sm" variant="soft" color="primary" onClick={() => {}}>
								{project.companion.user.email}
							</Chip>
						</Tooltip>
					</div>
					<div>
						<Typography
							component="span"
							level="body-sm"
							sx={{ mr: 1, display: 'inline-block' }}
						>
							и
						</Typography>
						<Tooltip size="sm" title="Copy email" variant="outlined">
							<Chip size="sm" variant="soft" color="primary" onClick={() => {}}>
								{userStore.user.email}
							</Chip>
						</Tooltip>
					</div>
				</Box>
			</Box>
			<Typography level="body-sm" mt={2} mb={2} textAlign="left">
				{project.description}
			</Typography>
			<Divider />
			<Typography level="title-sm" mt={2} mb={2}>
				Процесс
			</Typography>

			<SongChunksInterface jointProject={project} />
		</Sheet>
	);
}

export default observer(JointContent);
