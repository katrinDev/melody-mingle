import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { toggleMessagesPane } from '../../pages/messages/utils';
import { IChatUser } from '../../models/chat/IChat';

type MessagesPaneHeaderProps = {
	sender: IChatUser;
};

export default function MessagesPaneHeader(props: MessagesPaneHeaderProps) {
	const { sender } = props;
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			sx={{
				borderBottom: '1px solid',
				borderColor: 'divider',
				backgroundColor: 'background.body',
			}}
			py={{ xs: 2, md: 2 }}
			px={{ xs: 1, md: 2 }}
		>
			<Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
				<IconButton
					variant="plain"
					color="neutral"
					size="sm"
					sx={{
						display: { xs: 'inline-flex', sm: 'none' },
					}}
					onClick={() => toggleMessagesPane()}
				>
					<ArrowBackIosNewRoundedIcon />
				</IconButton>
				<Avatar size="lg" src={sender.avatarUrl} />

				<div>
					<Typography
						fontWeight="lg"
						fontSize="lg"
						component="h2"
						noWrap
						endDecorator={
							sender.online ? (
								<Chip
									variant="outlined"
									size="sm"
									color="neutral"
									sx={{
										borderRadius: 'sm',
									}}
									startDecorator={
										<CircleIcon sx={{ fontSize: 8 }} color="success" />
									}
									slotProps={{ root: { component: 'span' } }}
								>
									Онлайн
								</Chip>
							) : undefined
						}
						textAlign="left"
					>
						{sender.name}
					</Typography>
					<Typography sx={{ textAlign: 'left' }} level="body-sm">
						{sender.mainRole}
					</Typography>
				</div>
			</Stack>
			<Stack spacing={1} direction="row" alignItems="center">
				<Button
					color="neutral"
					variant="outlined"
					size="sm"
					sx={{
						display: { xs: 'none', md: 'inline-flex' },
					}}
				>
					Посмотреть профиль
				</Button>
				<IconButton size="sm" variant="plain" color="neutral">
					<MoreVertRoundedIcon />
				</IconButton>
			</Stack>
		</Stack>
	);
}
