import {
	Avatar,
	Box,
	Button,
	List,
	ListItem,
	ListItemContent,
	ListItemDecorator,
	Sheet,
	Typography,
} from '@mui/joy';
import { observer } from 'mobx-react-lite';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { SmartJoint } from '../../models/jointProject/IJointProject';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import AudioButtons from '../../components/audio/AudioButtons';
import AddSongChunkModal from './AddSongChunkModal';
type SongChunksInterfaceProps = {
	jointProject: SmartJoint;
};

function dateFormatWithTime(date: Date): string {
	date = new Date(date);
	const month = date.getMonth() + 1;
	const monthString: string = month < 10 ? `0${month}` : `${month}`;
	return `${date.getDate()}.${monthString} ${date.getHours()}:${date.getMinutes()}`;
}

function SongChunksInterface({ jointProject }: SongChunksInterfaceProps) {
	const [songChunks, setSongChunks] = useState(jointProject.songChunks);
	const { musicianStore, profileStore } = useContext(Context);
	const [isAddChunkOpen, setIsAddChunkModal] = useState<boolean>(false);

	useEffect(() => {
		setSongChunks(jointProject.songChunks);
	}, [jointProject.songChunks]);

	return (
		<List
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
				gap: 2,
			}}
		>
			<Sheet
				component="li"
				variant="outlined"
				sx={{
					borderRadius: 'sm',
					p: 2,
					listStyle: 'none',
				}}
			>
				<List sx={{ '--ListItemDecorator-size': '30px', gap: 2 }}>
					{songChunks.map((songChunk, index) => (
						<ListItem
							key={index}
							sx={{
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<Box sx={{ display: 'flex', minWidth: '300px' }}>
								<ListItemDecorator
									sx={{
										'&::before': {
											content: '""',
											position: 'absolute',
											height: '100%',
											width: '1px',
											bgcolor: 'divider',
											left: 'calc(var(--ListItem-paddingLeft) + 18px)',
											top: '50%',
										},

										mr: '20px',
									}}
								>
									<Avatar
										variant="outlined"
										src={
											songChunk.creatorId === musicianStore.musician.id
												? profileStore.profileInfo.avatarUrl!
												: jointProject.companion.avatarUrl!
										}
										sx={{
											borderRadius: '50%',
											'--Avatar-size': '35px',
										}}
									/>
								</ListItemDecorator>

								<ListItemContent sx={{ textAlign: 'left' }}>
									<Typography level="title-sm">{songChunk.name}</Typography>
									<Typography level="body-xs">
										{songChunk.description}
									</Typography>
								</ListItemContent>
							</Box>
							<AudioButtons audioUrl={songChunk.audioUrl} />
							<Typography level="body-xs">
								{dateFormatWithTime(songChunk.createdAt)}
							</Typography>
						</ListItem>
					))}
				</List>
				<Button
					size="sm"
					variant="plain"
					endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
					sx={{ px: 1, mt: 1 }}
					onClick={() => setIsAddChunkModal(true)}
				>
					Добавить
				</Button>
			</Sheet>
			<AddSongChunkModal
				jointProjectId={jointProject.id}
				isOpen={isAddChunkOpen}
				setIsOpen={setIsAddChunkModal}
			/>
		</List>
	);
}

export default observer(SongChunksInterface);
