import Box, { BoxProps } from '@mui/joy/Box';

function SidePane(props: BoxProps) {
	return (
		<Box
			className="Inbox"
			{...props}
			sx={[
				{
					bgcolor: 'background.surface',
					borderRight: '1px solid',
					borderColor: 'divider',
					display: {
						xs: 'none',
						md: 'initial',
					},
				},
				...(Array.isArray(props.sx) ? props.sx : [props.sx]),
			]}
		/>
	);
}

function Main(props: BoxProps) {
	return (
		<Box
			component="main"
			className="Main"
			{...props}
			sx={[{ p: 2 }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
		/>
	);
}

export default {
	SidePane,
	Main,
};
