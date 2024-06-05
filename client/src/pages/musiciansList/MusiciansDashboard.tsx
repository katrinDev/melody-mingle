import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import musTogether from '../../assets/mus_together.jpg';

import HeaderSection from '../../components/offersList/HeaderSection';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import MusicianCard from '../../components/musiciansList/MusicianCard';
import { Typography } from '@mui/joy';
import Search from '../../components/tools/Search';
import Pagination from '../../components/tools/Pagination';

const ITEMS_PER_PAGE = 4;

function MusiciansDashboard() {
	const { musicianStore, snackbarStore, userStore } = useContext(Context);
	const musicians = musicianStore.allMusicians;

	const [searchTerm, setSearchTerm] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPagesCount, setTotalPagesCount] = useState(currentPage);

	const fetchData = () => {
		musicianStore.fetchAllMusicians(snackbarStore, userStore.isAdmin);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setTotalPagesCount(
			musicians ? Math.ceil(musicians.length / ITEMS_PER_PAGE) : currentPage
		);
	}, [currentPage, musicians]);

	const getCurrentItems = () => {
		const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
		const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
		const currentItems = musicians.slice(indexOfFirstItem, indexOfLastItem);

		return currentItems;
	};

	const handleSearch = (searchTerm: string) => {
		musicianStore.searchMusicians(searchTerm);
	};

	const resetSearch = () => {
		fetchData();
		setSearchTerm('');
	};

	return (
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<Box
				component="main"
				sx={{
					height: '100vh',
					display: 'grid',
					gridTemplateColumns: { xs: 'auto', md: '60% 40%' },
					gridTemplateRows: 'auto 1fr auto',
				}}
			>
				<Stack
					sx={{
						backgroundColor: 'background.surface',
						px: { xs: 2, md: 4 },
						py: 2,
						borderBottom: '1px solid',
						borderColor: 'divider',
					}}
				>
					<HeaderSection
						title="Музыканты"
						subTitle="Расширь свои творческие возможности"
						my={false}
					/>

					<Search
						handleSearch={handleSearch}
						resetSearch={resetSearch}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
				</Stack>
				<Box
					sx={{
						gridRow: 'span 3',
						display: { xs: 'none', md: 'flex' },
						backgroundColor: 'background.level1',
						backgroundSize: 'cover',
						backgroundImage: `url(${musTogether})`,
					}}
				/>
				<Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
					{musicians ? (
						<Stack spacing={2} sx={{ overflow: 'auto' }}>
							{getCurrentItems().map(musician => (
								<MusicianCard key={musician.id} {...musician} />
							))}
						</Stack>
					) : (
						<Typography>
							На текущий момент другие музыканты не зарегистрированы
						</Typography>
					)}
				</Stack>
				{musicians.length > 0 && totalPagesCount !== 1 ? (
					<Pagination
						key={1}
						setCurrentPage={setCurrentPage}
						totalPagesCount={totalPagesCount}
						currentPage={currentPage}
					/>
				) : null}
			</Box>
		</CssVarsProvider>
	);
}

export default observer(MusiciansDashboard);
