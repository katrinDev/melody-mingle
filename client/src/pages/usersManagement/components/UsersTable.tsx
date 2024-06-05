import * as React from 'react';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import NoAccountsRoundedIcon from '@mui/icons-material/NoAccountsRounded';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Context } from '../../../main';
import { IManagedUser } from '../../../models/manageUsers/IManagedUser';
import { dateFormatWithTime } from '../../../components/jointProjects/SongChunksInterface';
import { observer } from 'mobx-react-lite';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function UsersTable() {
	const [order, setOrder] = React.useState<Order>('desc');
	const [loadingUsers, setLoadingUsers] = React.useState<boolean>(false);
	const { userStore, snackbarStore } = React.useContext(Context);
	const [users, setUsers] = React.useState<IManagedUser[]>(
		userStore.notAdminUsers
	);

	const [activeRecord, setActiveRecord] = React.useState<
		Record<number, boolean>
	>({});

	React.useEffect(() => {
		const fetchData = async () => {
			setLoadingUsers(true);
			await userStore.getAllUsers(snackbarStore);

			const userMap: Record<string, boolean> = {};
			userStore.notAdminUsers.forEach(user => {
				const key = user.id;
				userMap[key] = true;
			});

			setActiveRecord(userMap);
			setLoadingUsers(false);
		};

		fetchData();
	}, []);

	React.useEffect(() => {
		setUsers(userStore.notAdminUsers);
	}, [userStore.notAdminUsers]);

	const handleChipClick = (userId: number, email: string) => {
		setActiveRecord({ ...activeRecord, [userId]: !activeRecord[userId] });
		const status: string = !activeRecord[userId] ? 'Активен' : 'Заблокирован';
		const color = !activeRecord[userId] ? 'success' : 'danger';
		snackbarStore.changeAll(
			true,
			color,
			`Статус пользователя ${email} изменен на '${status}'`
		);
	};

	const activeCheck = (userId: number) => {
		console.log(JSON.stringify(activeRecord));

		return activeRecord[userId] || Object.keys(activeRecord).length === 0;
	};

	if (loadingUsers) {
		return <div>Loading...</div>;
	} else {
		return (
			<React.Fragment>
				<Sheet
					className="OrderTableContainer"
					variant="outlined"
					sx={{
						borderRadius: 'sm',
						flexShrink: 1,
						overflow: 'auto',
					}}
				>
					<Table
						aria-labelledby="tableTitle"
						stickyHeader
						hoverRow
						sx={{
							'--TableCell-headBackground':
								'var(--joy-palette-background-level1)',
							'--Table-headerUnderlineThickness': '1px',
							'--TableRow-hoverBackground':
								'var(--joy-palette-background-level1)',
							'--TableCell-paddingY': '4px',
							'--TableCell-paddingX': '16px',
							textAlign: 'left',
						}}
					>
						<thead>
							<tr>
								<th style={{ width: 120, padding: '12px 15px' }}>
									<Link
										underline="none"
										color="primary"
										component="button"
										onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
										fontWeight="lg"
										endDecorator={<ArrowDropDownIcon />}
										sx={{
											'& svg': {
												transition: '0.2s',
												transform:
													order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
											},
										}}
									>
										Почта
									</Link>
								</th>

								<th style={{ width: 140, padding: '12px 15px' }}>Имя</th>
								<th style={{ width: 140, padding: '12px 15px' }}>
									Регистрация
								</th>
								<th style={{ width: 140, padding: '12px 15px' }}>Локация</th>

								<th style={{ width: 140, padding: '12px 15px' }}>Статус</th>
							</tr>
						</thead>
						<tbody>
							{stableSort(users, getComparator(order, 'email')).map(user => (
								<tr key={user.id}>
									<td>
										<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
											{/* <Avatar size="sm">{row.customer.initial}</Avatar> */}
											<div>
												<Typography level="body-xs">{user.email}</Typography>
											</div>
										</Box>
									</td>
									<td>
										<Typography level="body-xs">{user.name}</Typography>
									</td>
									<td>
										<Typography level="body-xs">
											{dateFormatWithTime(user.createdAt)}
										</Typography>
									</td>
									<td>
										<Typography level="body-xs">{user.city}</Typography>
									</td>
									<td>
										<Chip
											variant="soft"
											size="sm"
											startDecorator={
												activeCheck(user.id) ? (
													<TaskAltRoundedIcon />
												) : (
													<NoAccountsRoundedIcon />
												)
											}
											onClick={() => handleChipClick(user.id, user.email)}
											color={activeCheck(user.id) ? 'success' : 'danger'}
										>
											{activeCheck(user.id) ? 'Активен' : 'Заблокирован'}
										</Chip>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Sheet>
			</React.Fragment>
		);
	}
}

export default observer(UsersTable);
