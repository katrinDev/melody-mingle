import * as React from 'react';
import { useContext, useEffect } from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import PianoRoundedIcon from '@mui/icons-material/PianoRounded';
import LyricsRoundedIcon from '@mui/icons-material/LyricsRounded';
import { closeSidebar } from './toggleSidebar';
import ColorSchemeProfileToggle from '../mainLayout/ColorSchemeProfileToggle';
import {
	ABOUT,
	EDIT_PROFILE,
	MUSICIANS,
	OFFERS,
	MY_PROFILE,
	MY_OFFERS,
	CHATS,
	JOINT_PROJECTS,
	USERS_MANAGEMENT,
} from '../../router/paths';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

function Toggler({
	defaultExpanded = false,
	renderToggle,
	children,
}: {
	defaultExpanded?: boolean;
	children: React.ReactNode;
	renderToggle: (params: {
		open: boolean;
		setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	}) => React.ReactNode;
}) {
	const [open, setOpen] = React.useState(defaultExpanded);
	return (
		<React.Fragment>
			{renderToggle({ open, setOpen })}
			<Box
				sx={{
					display: 'grid',
					gridTemplateRows: open ? '1fr' : '0fr',
					transition: '0.2s ease',
					'& > *': {
						overflow: 'hidden',
					},
				}}
			>
				{children}
			</Box>
		</React.Fragment>
	);
}

const Sidebar: React.FC = observer(() => {
	const {
		musicianStore,
		userStore,
		snackbarStore,
		profileStore,
		offersStore,
		chatsStore,
	} = useContext(Context);

	const { avatarUrl } = profileStore.profileInfo;

	const onLogoutClick = async () => {
		await userStore.logout(snackbarStore);
	};

	useEffect(() => {
		musicianStore.fetchMusicianByUser(snackbarStore);
		profileStore.fetchProfileData(snackbarStore);
		offersStore.fetchOffersCount(snackbarStore);
		chatsStore.fetchChatsCount(snackbarStore);
	}, []);

	return (
		<Sheet
			className="Sidebar"
			sx={{
				position: { xs: 'fixed', md: 'sticky' },
				transform: {
					xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
					md: 'none',
				},
				transition: 'transform 0.4s, width 0.4s',
				zIndex: 10000,
				height: '100dvh',
				width: 'var(--Sidebar-width)',
				top: 0,
				p: 2,
				flexShrink: 0,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				borderRight: '1px solid',
				borderColor: 'divider',
			}}
		>
			<GlobalStyles
				styles={theme => ({
					':root': {
						'--Sidebar-width': '230px',
						[theme.breakpoints.up('lg')]: {
							'--Sidebar-width': '240px',
						},
					},
				})}
			/>
			<Box
				className="Sidebar-overlay"
				sx={{
					position: 'fixed',
					zIndex: 9998,
					top: 0,
					left: 0,
					width: '100vw',
					height: '100vh',
					JOINT_PROJECTS,
					opacity: 'var(--SideNavigation-slideIn)',
					backgroundColor: 'var(--joy-palette-background-backdrop)',
					transition: 'opacity 0.4s',
					transform: {
						xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
						lg: 'translateX(-100%)',
					},
				}}
				onClick={() => closeSidebar()}
			/>
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				<IconButton variant="soft" color="primary" size="sm">
					<LibraryMusicRoundedIcon />
				</IconButton>
				<Typography level="title-md">Melody Mingle</Typography>
				<ColorSchemeProfileToggle sx={{ ml: 'auto' }} />
			</Box>
			<Input
				size="sm"
				startDecorator={<SearchRoundedIcon />}
				placeholder="Search"
			/>
			<Box
				sx={{
					minHeight: 0,
					overflow: 'hidden auto',
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					[`& .${listItemButtonClasses.root}`]: {
						gap: 1.5,
					},
				}}
			>
				<List
					size="sm"
					sx={{
						gap: 1,
						'--List-nestedInsetStart': '30px',
						'--ListItem-radius': theme => theme.vars.radius.sm,
					}}
				>
					<ListItem>
						<ListItemButton component={Link} to={ABOUT}>
							<HomeRoundedIcon />
							<ListItemContent>
								<Typography level="title-sm">Главная</Typography>
							</ListItemContent>
						</ListItemButton>
					</ListItem>

					{!userStore.isAdmin && (
						<ListItem>
							<ListItemButton component={Link} to={MY_PROFILE}>
								<GroupRoundedIcon />
								<ListItemContent>
									<Typography level="title-sm">Профиль</Typography>
								</ListItemContent>
							</ListItemButton>
						</ListItem>
					)}
					<ListItem nested>
						<Toggler
							renderToggle={({ open, setOpen }) => (
								<ListItemButton onClick={() => setOpen(!open)}>
									<DashboardRoundedIcon />
									<ListItemContent>
										<Typography level="title-sm">Сотрудничество</Typography>
									</ListItemContent>
									<KeyboardArrowDownIcon
										sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
									/>
								</ListItemButton>
							)}
						>
							<List sx={{ gap: 0.5 }}>
								<ListItem sx={{ mt: 0.5 }}>
									<ListItemButton component={Link} to={OFFERS}>
										Актуальные заявки
									</ListItemButton>

									<Chip size="sm" color="primary" variant="solid">
										{offersStore.offersCount}
									</Chip>
								</ListItem>
								<ListItem>
									<ListItemButton component={Link} to={MUSICIANS}>
										Музыканты
									</ListItemButton>
								</ListItem>
							</List>
						</Toggler>
					</ListItem>

					<ListItem>
						<ListItemButton component={Link} to={CHATS}>
							<LyricsRoundedIcon />
							<ListItemContent>
								<Typography level="title-sm">Чаты</Typography>
							</ListItemContent>

							<Chip size="sm" color="primary" variant="solid">
								{chatsStore.chatsCount}
							</Chip>
						</ListItemButton>
					</ListItem>

					{userStore.isAdmin && (
						<ListItem>
							<ListItemButton component={Link} to={USERS_MANAGEMENT}>
								<LyricsRoundedIcon />
								<ListItemContent>
									<Typography level="title-sm">
										Управление пользователями
									</Typography>
								</ListItemContent>
							</ListItemButton>
						</ListItem>
					)}

					{!userStore.isAdmin && (
						<>
							<ListItem>
								<ListItemButton component={Link} to={JOINT_PROJECTS}>
									<PianoRoundedIcon />
									<ListItemContent>
										<Typography level="title-sm">Творчество</Typography>
									</ListItemContent>
								</ListItemButton>
							</ListItem>
							<ListItem>
								<ListItemButton role="menuitem" component={Link} to={MY_OFFERS}>
									<ShoppingCartRoundedIcon />
									<ListItemContent>
										<Typography level="title-sm">Личные заявки</Typography>
									</ListItemContent>
								</ListItemButton>
							</ListItem>
							<ListItem nested>
								<Toggler
									renderToggle={({ open, setOpen }) => (
										<ListItemButton onClick={() => setOpen(!open)}>
											<SettingsRoundedIcon />
											<ListItemContent>
												<Typography level="title-sm">Настройки</Typography>
											</ListItemContent>
											<KeyboardArrowDownIcon
												sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
											/>
										</ListItemButton>
									)}
								>
									<List sx={{ gap: 0.5 }}>
										<ListItem sx={{ mt: 0.5 }}>
											<ListItemButton component={Link} to={EDIT_PROFILE}>
												Изменить профиль
											</ListItemButton>
										</ListItem>
										<ListItem sx={{ mt: 0.5 }}>
											<ListItemButton component={Link} to={EDIT_PROFILE}>
												Удалить профиль
											</ListItemButton>
										</ListItem>
									</List>
								</Toggler>
							</ListItem>
						</>
					)}
				</List>
			</Box>
			<Divider />
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				{avatarUrl && <Avatar variant="outlined" size="lg" src={avatarUrl} />}
				<Box sx={{ minWidth: 0, flex: 1 }}>
					<Typography level="title-md">
						{musicianStore.musician.name}
					</Typography>
					<Typography level="body-sm">{userStore.user.email}</Typography>
				</Box>
				<IconButton size="md" variant="plain" color="neutral">
					<LogoutRoundedIcon onClick={onLogoutClick} />
				</IconButton>
			</Box>
		</Sheet>
	);
});

export default Sidebar;
