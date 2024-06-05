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
	Input,
	Modal,
	ModalClose,
	Stack,
	SvgIcon,
	Typography,
} from '@mui/joy';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Context } from '../../main';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddChunkDto } from '../../models/jointProject/ISongChunk';
import { InfoOutlined } from '@mui/icons-material';
import AbcRoundedIcon from '@mui/icons-material/AbcRounded';
import { Controller } from 'react-hook-form';

type AddSongChunkModal = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	jointProjectId: number;
};

function AddSongChunkModal({
	isOpen,
	setIsOpen,
	jointProjectId,
}: AddSongChunkModal) {
	const { snackbarStore, jointProjectsStore, musicianStore } =
		useContext(Context);
	const [correctFile, setCorrectFile] = useState<File | null>(null);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<AddChunkDto>();

	const resetForm = () => {
		setCorrectFile(null);
		reset();
	};

	const addSongChunkSubmit: SubmitHandler<AddChunkDto> = async (
		data,
		event
	) => {
		event?.preventDefault();
		console.log(data.audio.name);
		if (Object.keys(errors).length === 0) {
			await jointProjectsStore.createSongChunk(
				snackbarStore,
				jointProjectId,
				data,
				musicianStore.musician.id
			);

			resetForm();
		}
	};

	const validateAudio = (file: File) => {
		if (file) {
			console.log(file.type);
			if (file.type === 'audio/mpeg' || file.type === 'audio/mp3') {
				setCorrectFile(file);
				return true;
			} else {
				setCorrectFile(null);

				snackbarStore.changeAll(true, 'danger', 'Некорректный тип файла');
				return false;
			}
		}
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
					minWidth: 400,
					borderRadius: 'md',
					p: 4,
					pb: 0,
					boxShadow: 'lg',
				}}
			>
				<Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
					<Typography level="title-md">Добавление итерации</Typography>
				</Box>

				<ModalClose variant="plain" sx={{ m: 1 }} />
				<Divider />

				<form onSubmit={handleSubmit(addSongChunkSubmit)}>
					<Stack spacing={2} sx={{ pb: 4, pt: 1 }}>
						<FormControl error={!!errors.audio}>
							<FormLabel>Аудио</FormLabel>
							<Button
								component="label"
								tabIndex={-1}
								variant="soft"
								color={correctFile ? 'success' : 'warning'}
								startDecorator={
									<SvgIcon>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
											/>
										</svg>
									</SvgIcon>
								}
							>
								Загрузить файл
								<Controller
									name="audio"
									control={control}
									render={({ field }) => (
										<>
											<input
												type="file"
												accept="audio/mp3 audio/mpeg"
												style={{ display: 'none' }}
												onChange={e => {
													validateAudio(e.target.files![0]);
													field.onChange(e.target.files?.[0]);
												}}
											/>
										</>
									)}
								/>
							</Button>
							{correctFile && (
								<FormHelperText>
									<InfoOutlined />
									{correctFile.name}
								</FormHelperText>
							)}
						</FormControl>

						<FormControl sx={{ flexGrow: 0.5 }} error={!!errors.description}>
							<FormLabel>Название</FormLabel>
							<Input
								size="sm"
								placeholder="Вокал бридж"
								{...register('name', {
									validate: value =>
										(value.length >= 2 && value.length <= 30) ||
										'Некорректная длина поля',
								})}
							/>
							{errors.name?.message && (
								<FormHelperText>
									<InfoOutlined />
									{errors.name.message}
								</FormHelperText>
							)}
						</FormControl>

						<FormControl sx={{ flexGrow: 0.5 }} error={!!errors.description}>
							<FormLabel>Описание</FormLabel>
							<Input
								size="sm"
								startDecorator={<AbcRoundedIcon />}
								placeholder="Изменил мелодию"
								{...register('description', {
									validate: value =>
										(value.length >= 2 && value.length <= 40) ||
										'Некорректная длина поля',
								})}
							/>
							{errors.description?.message && (
								<FormHelperText>
									<InfoOutlined />
									{errors.description.message}
								</FormHelperText>
							)}
						</FormControl>
					</Stack>

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

export default observer(AddSongChunkModal);
