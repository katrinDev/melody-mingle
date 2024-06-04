import { ButtonGroup, IconButton } from '@mui/joy';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

type AudioButtonsProps = {
	audioUrl: string;
};

function AudioButtons({ audioUrl }: AudioButtonsProps) {
	const audioRef = useRef<HTMLAudioElement>(null);

	const handlePlay = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	const handlePause = () => {
		if (audioRef.current) {
			audioRef.current.pause();
		}
	};
	return (
		<>
			<audio ref={audioRef} src={audioUrl} />
			<ButtonGroup variant="soft">
				<IconButton color="primary" size="md" onClick={handlePlay}>
					<PlayCircleFilledRoundedIcon />
				</IconButton>
				<IconButton color="primary" size="md" onClick={handlePause}>
					<PauseCircleFilledRoundedIcon />
				</IconButton>
			</ButtonGroup>
		</>
	);
}

export default observer(AudioButtons);
