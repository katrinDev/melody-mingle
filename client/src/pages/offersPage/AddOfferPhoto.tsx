import { observer } from 'mobx-react-lite';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Dispatch, SetStateAction, useRef } from 'react';
import { MyOffer } from '../../models/IOffer';
import {
	AspectRatio,
	Button,
	FormHelperText,
	IconButton,
	Stack,
} from '@mui/joy';
import { Control, Controller } from 'react-hook-form';
import { InfoOutlined } from '@mui/icons-material';

type AddOfferPhotoProps = {
	newOffer: MyOffer;
	setNewOffer: Dispatch<SetStateAction<MyOffer>>;
	control: Control<MyOffer, any>;
};

function AddOfferPhoto({ newOffer, setNewOffer, control }: AddOfferPhotoProps) {
	const MAX_SIZE = 3 * 1024 * 1024;

	const handleEditPhotoButtonClick = () => {
		inputAvatarRef.current?.click();
	};

	const inputAvatarRef = useRef<HTMLInputElement>(null);

	const validateFileSize = (file: File | undefined) => {
		if (file) {
			if (file.size > MAX_SIZE) {
				return 'Размер файла превышает лимит (3MB)';
			}
			return true;
		}
		return false;
	};

	return (
		<div>
			{!newOffer?.photo && (
				<Button
					type="button"
					variant="outlined"
					color="success"
					onClick={handleEditPhotoButtonClick}
				>
					Добавить фото
				</Button>
			)}
			<Controller
				name="photo"
				control={control}
				rules={{
					validate: validateFileSize,
				}}
				render={({ field, fieldState }) => (
					<>
						<input
							ref={inputAvatarRef}
							type="file"
							accept="image/jpeg"
							style={{ display: 'none' }}
							onChange={e => {
								setNewOffer({ ...newOffer, photo: e.target.files?.[0] });
								field.onChange(e.target.files?.[0]);
							}}
						/>
						{fieldState.error && (
							<FormHelperText>
								<InfoOutlined />
								{fieldState.error.message}
							</FormHelperText>
						)}
					</>
				)}
			/>
			{newOffer.photo && (
				<Stack direction="column">
					<AspectRatio
						ratio="1/1.4"
						maxHeight={300}
						sx={{ flex: 1, minWidth: 170 }}
					>
						<img
							src={URL.createObjectURL(newOffer.photo)}
							srcSet={`${URL.createObjectURL(newOffer.photo)}&dpr=2 2x`}
							loading="lazy"
							alt=""
						/>
					</AspectRatio>
					<IconButton
						aria-label="upload new picture"
						size="sm"
						variant="outlined"
						color="neutral"
						sx={{
							bgcolor: 'background.body',
							position: 'absolute',
							zIndex: 2,
							borderRadius: '50%',
							left: 175,
							top: 320,
							boxShadow: 'sm',
						}}
						onClick={handleEditPhotoButtonClick}
					>
						<EditRoundedIcon />
					</IconButton>
				</Stack>
			)}
		</div>
	);
}

export default observer(AddOfferPhoto);
