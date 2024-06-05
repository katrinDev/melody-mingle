import { observer } from 'mobx-react-lite';
import OrderTable from './components/UsersTable';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { ABOUT } from '../../router/paths';

function UsersManagementPage() {
	return (
		<Box sx={{ display: 'flex' }}>
			<Box
				sx={{
					px: { xs: 2, md: 10 },
					pt: {
						xs: 'calc(12px + var(--Header-height))',
						sm: 'calc(12px + var(--Header-height))',
						md: 3,
					},
					pb: 3,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Breadcrumbs
						size="sm"
						aria-label="breadcrumbs"
						separator={<ChevronRightRoundedIcon />}
						sx={{ pl: 0 }}
					>
						<Link
							underline="none"
							color="neutral"
							href={ABOUT}
							aria-label="Home"
						>
							<HomeRoundedIcon />
						</Link>
						<Typography color="primary" fontWeight={500} fontSize={12}>
							Пользователи
						</Typography>
					</Breadcrumbs>
				</Box>
				<Typography level="h2" component="h1" sx={{ mb: 3, mt: 1 }}>
					Пользователи
				</Typography>
				<OrderTable />
			</Box>
		</Box>
	);
}

export default observer(UsersManagementPage);
