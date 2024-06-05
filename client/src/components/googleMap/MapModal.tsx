import { Modal, ModalClose, Sheet, Typography } from '@mui/joy';
import { Dispatch, SetStateAction } from 'react';
import MapWindow from './MapWindow';

interface IProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	headline: string;
	address: string;
}

export default function MapModal({
	isOpen,
	setIsOpen,
	headline,
	address,
}: IProps) {
	return (
		<Modal
			aria-labelledby="modal-title"
			open={isOpen}
			onClose={() => setIsOpen(false)}
			sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
			<Sheet
				variant="outlined"
				sx={{
					minWidth: 500,
					borderRadius: 'md',
					p: 3,
					pt: 0,
					boxShadow: 'lg',
					ml: '230px',
				}}
			>
				<ModalClose variant="plain" sx={{ m: 1 }} />
				<Typography
					component="h3"
					id="modal-title"
					level="h4"
					textColor="inherit"
					fontWeight="md"
					m={3}
				>
					{headline}
				</Typography>
				<MapWindow address={address} />
			</Sheet>
		</Modal>
	);
}
