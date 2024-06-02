import {
	Box,
	Button,
	Card,
	CardActions,
	CardOverflow,
	Divider,
	FormControl,
	FormHelperText,
	FormLabel,
	IconButton,
	Input,
	Modal,
	ModalClose,
	Stack,
	Textarea,
	Typography,
} from '@mui/joy';

import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MyOffer } from '../../models/IOffer';
import { Context } from '../../main';
import { InfoOutlined } from '@mui/icons-material';
import AddOfferPhoto from './AddOfferPhoto';
import EditStringArrayListBox from '../../components/profile/editProfile/EditStringArrayListBox';

type OfferFormProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function AddOfferFormModal({ isOpen, setIsOpen }: OfferFormProps) {
	const { snackbarStore, offersStore } = useContext(Context);
	const [newOffer, setNewOffer] = useState<MyOffer>({
		headline: '',
		body: '',
		location: '',
		mainRoles: [],
		genres: [],
		expirationDate: new Date(),
	});

	const [newMainRole, setNewMainRole] = useState<string>('');
	const [newGenre, setNewGenre] = useState<string>('');

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<MyOffer>();

	const addFormSubmit: SubmitHandler<MyOffer> = async (data, event) => {
		event?.preventDefault();
		if (Object.keys(errors).length === 0) {
			if (newOffer.genres.length === 0) {
				snackbarStore.changeAll(true, 'danger', 'Поле жанры обязательно');
			} else if (newOffer.mainRoles.length === 0) {
				snackbarStore.changeAll(true, 'danger', 'Поле роли обязательно');
			} else {
				await offersStore.createOffer(
					{ ...data, genres: newOffer.genres, mainRoles: newOffer.mainRoles },
					snackbarStore
				);

				resetForm();
			}
		}
	};

	const handleAddMainRoleClick = () => {
		if (newMainRole) {
			setNewOffer({
				...newOffer,
				mainRoles: [...newOffer.mainRoles, newMainRole],
			});
			setNewMainRole('');
		}
	};

	const handleAddGenreClick = () => {
		if (newGenre) {
			setNewOffer({ ...newOffer, genres: [...newOffer.genres, newGenre] });
			setNewGenre('');
		}
	};

	const resetForm = () => {
		setNewOffer({
			headline: '',
			body: '',
			location: '',
			mainRoles: [],
			genres: [],
			expirationDate: new Date(),
			photo: undefined,
		});
		reset();
	};

	return (
		<Modal
			aria-labelledby="modal-title"
			open={isOpen}
			onClose={() => setIsOpen(false)}
			sx={{
				display: 'flex',
				minWidth: '500px',
				justifyContent: 'center',
				alignItems: 'center',
				ml: '230px',
			}}
		>
			<Card
				variant="outlined"
				sx={{
					minWidth: 500,
					aspectRatio: '1/1.4',
					borderRadius: 'md',
					p: 3,
					pb: 0,
					boxShadow: 'lg',
				}}
			>
				<Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
					<Typography level="title-md">Создание заявки</Typography>
				</Box>

				<ModalClose variant="plain" sx={{ m: 1 }} />
				<Divider />

				<form onSubmit={handleSubmit(addFormSubmit)}>
					<Stack
						direction="row"
						spacing={4}
						sx={{ display: 'flex', my: 2 }}
						alignItems={'flex-start'}
						justifyContent={'space-between'}
					>
						<AddOfferPhoto
							newOffer={newOffer}
							setNewOffer={setNewOffer}
							control={control}
						/>
						<Stack
							direction="column"
							spacing={2}
							sx={{
								justifyContent: 'space-between',
								flexGrow: '0.85',
							}}
						>
							<FormControl
								sx={{
									display: { sm: 'flex-column', md: 'flex-row' },
								}}
								error={!!errors.headline}
							>
								<FormLabel>Заголовок</FormLabel>
								<Input
									size="sm"
									placeholder="Заголовок"
									{...register('headline', {
										minLength: {
											value: 2,
											message: 'Слишком короткий заголовок',
										},
										maxLength: {
											value: 30,
											message: 'Слишком длинный заголовок',
										},
										required: true,
									})}
								/>
								{errors.headline && (
									<FormHelperText>
										<InfoOutlined />
										{errors.headline.message}
									</FormHelperText>
								)}
							</FormControl>

							<div>
								<FormControl sx={{ display: { sm: 'contents' } }}>
									<FormLabel>Требуемые роли</FormLabel>
									{!!newOffer.mainRoles.length && (
										<EditStringArrayListBox list={newOffer.mainRoles} />
									)}
									<Input
										size="sm"
										placeholder="Барабанщик"
										value={newMainRole}
										onChange={e => setNewMainRole(e.target.value)}
										endDecorator={
											<Stack direction="row">
												<IconButton onClick={handleAddMainRoleClick}>
													<AddRoundedIcon />
												</IconButton>
												<IconButton onClick={() => setNewMainRole('')}>
													<RemoveRoundedIcon />
												</IconButton>
											</Stack>
										}
									/>
								</FormControl>
							</div>

							<div>
								<FormControl sx={{ display: { sm: 'contents' } }}>
									<FormLabel>Жанры</FormLabel>
									{!!newOffer.genres.length && (
										<EditStringArrayListBox list={newOffer.genres} />
									)}
									<Input
										size="sm"
										placeholder="indi"
										value={newGenre}
										onChange={e => setNewGenre(e.target.value)}
										endDecorator={
											<Stack direction="row">
												<IconButton onClick={handleAddGenreClick}>
													<AddRoundedIcon />
												</IconButton>
												<IconButton onClick={() => setNewGenre('')}>
													<RemoveRoundedIcon />
												</IconButton>
											</Stack>
										}
									/>
								</FormControl>
							</div>

							<FormControl sx={{ flexGrow: 0.5 }} error={!!errors.location}>
								<FormLabel>Город</FormLabel>
								<Input
									size="sm"
									startDecorator={<LocationOnRoundedIcon />}
									placeholder="Могилев"
									{...register('location', {
										validate: value =>
											(value.length >= 2 && value.length <= 10) ||
											'Некорректная длина поля',
									})}
								/>
								{errors.location?.message && (
									<FormHelperText>
										<InfoOutlined />
										{errors.location.message}
									</FormHelperText>
								)}
							</FormControl>

							<FormControl error={!!errors.expirationDate}>
								<FormLabel>Дата истечения</FormLabel>
								<Input
									size="sm"
									type="date"
									{...register('expirationDate', {
										valueAsDate: true,
									})}
								/>
								{errors.expirationDate?.message && (
									<FormHelperText>
										<InfoOutlined />
										{errors.expirationDate.message}
									</FormHelperText>
								)}
							</FormControl>
						</Stack>
					</Stack>

					<FormControl error={!!errors.body} sx={{ mb: '30px' }}>
						<FormLabel>Описание предложения</FormLabel>
						<Textarea
							size="sm"
							minRows={4}
							placeholder="Расскажи про вакансию или творческую инициативу"
							{...register('body', {
								required: true,
							})}
						/>
						{errors.expirationDate?.message && (
							<FormHelperText>
								<InfoOutlined />
								{errors.expirationDate.message}
							</FormHelperText>
						)}
					</FormControl>

					<CardOverflow
						sx={{
							borderTop: '1px solid',
							borderColor: 'divider',
						}}
					>
						<CardActions sx={{ alignSelf: 'flex-end' }}>
							<Button
								size="sm"
								variant="outlined"
								color="neutral"
								type="button"
								onClick={resetForm}
							>
								Отменить
							</Button>
							<Button type="submit" size="sm" variant="solid">
								Сохранить
							</Button>
						</CardActions>
					</CardOverflow>
				</form>
			</Card>
		</Modal>
	);
}

export default observer(AddOfferFormModal);
