import {
	Button,
	Card,
	CardActions,
	Modal,
	ModalClose,
	Typography,
} from '@mui/joy';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction } from 'react';

interface DeleteProfileModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function DeleteProfileModal({ isOpen, setIsOpen }: DeleteProfileModalProps) {
	return (
		<Modal
			aria-labelledby="modal-title"
			open={isOpen}
			onClose={() => setIsOpen(false)}
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				ml: '230px',
			}}
		>
			<Card
				variant="outlined"
				sx={{
					minWidth: '430px',
					minHeight: '170px',
					borderRadius: 'md',
					p: 4,
					pb: 0,
					boxShadow: 'lg',
				}}
			>
				<ModalClose variant="plain" sx={{ m: 1 }} />
				<Typography level="title-md" textAlign="center" sx={{ mt: 2 }}>
					Вы уверены, что хотите удалить профиль?
				</Typography>
				<CardActions sx={{ alignSelf: 'center', mt: 1 }}>
					<Button
						size="sm"
						variant="soft"
						color="success"
						type="button"
						onClick={() => setIsOpen(false)}
					>
						Отменить
					</Button>
					<Button type="submit" size="sm" variant="soft" color="danger">
						Подтвердить
					</Button>
				</CardActions>
			</Card>
		</Modal>
	);
}

export default observer(DeleteProfileModal);
