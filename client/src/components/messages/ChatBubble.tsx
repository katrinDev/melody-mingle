import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import { observer } from 'mobx-react-lite';
import { IMessage } from '../../models/chat/IMessage';
import { Context } from '../../main';
import { IChatUser } from '../../models/chat/IChat';

type ChatBubbleProps = IMessage & {
  chatSender: IChatUser;
  variant: 'sent' | 'received';
};

const dateLookBetter = (date: Date): string => {
    date = new Date(date);
    const HOUR = 3600000;
    const SECOND = 1000;
    const MINUTE = 60000;

    const difference = (Date.now() - +date);
    const diffInHours = Math.floor(difference/HOUR);

    if(Math.floor(difference / SECOND) < 50) {
      return 'Только что';
    } else if(diffInHours < 1) {
      const diffInMinutes = Math.floor(difference/MINUTE);
      return `${diffInMinutes} мин назад`;
    } else if(diffInHours < 23) {
      const hourForm = diffInHours > 4 ? 'часов' : diffInHours === 1 ? 'час' : 'часа';
      return `${diffInHours} ${hourForm} назад`;
    } else {
      const month = date.getMonth() + 1;
      return `${date.getDate()}.${month} ${date.getHours()}:${date.getMinutes()}`
    }
  }

function ChatBubble(props: ChatBubbleProps) {
  const {userStore} = React.useContext(Context);

  const { content, variant, createdAt, attachment = undefined, senderId, chatSender} = props;
  const isSent = variant === 'sent';
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [isCelebrated, setIsCelebrated] = React.useState<boolean>(false);

  const [formattedDate, setFormattedDate] = React.useState(dateLookBetter(createdAt));

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedDate(dateLookBetter(createdAt));
    }, 60000); 

    return () => {
      clearInterval(intervalId);
    };
  }, [createdAt]);

  return (
    <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        <Typography level="body-xs">
          {senderId === userStore.user.id ? 'Вы' : chatSender.name}
        </Typography>
        <Typography level="body-xs">{formattedDate}</Typography>
      </Stack>
      {attachment ? (
        <Sheet
          variant="outlined"
          sx={{
            px: 1.75,
            py: 1.25,
            borderRadius: 'lg',
            borderTopRightRadius: isSent ? 0 : 'lg',
            borderTopLeftRadius: isSent ? 'lg' : 0,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar color="primary" size="lg">
              <InsertDriveFileRoundedIcon />
            </Avatar>
            <div>
              <Typography fontSize="sm">{attachment.fileName}</Typography>
              <Typography level="body-sm">{attachment.size}</Typography>
            </div>
          </Stack>
        </Sheet>
      ) : (
        <Box
          sx={{ position: 'relative' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Sheet
            color={isSent ? 'primary' : 'neutral'}
            variant={isSent ? 'solid' : 'soft'}
            sx={{
              p: 1.25,
              borderRadius: 'lg',
              borderTopRightRadius: isSent ? 0 : 'lg',
              borderTopLeftRadius: isSent ? 'lg' : 0,
              backgroundColor: isSent
                ? 'var(--joy-palette-primary-solidBg)'
                : 'background.body',
            }}
          >
            <Typography
              level="body-sm"
              sx={{
                color: isSent
                  ? 'var(--joy-palette-common-white)'
                  : 'var(--joy-palette-text-primary)',
              }}
            >
              {content}
            </Typography>
          </Sheet>
          {(isHovered || isLiked || isCelebrated) && (
            <Stack
              direction="row"
              justifyContent={isSent ? 'flex-end' : 'flex-start'}
              spacing={0.5}
              sx={{
                position: 'absolute',
                top: '50%',
                p: 1.5,
                ...(isSent
                  ? {
                      left: 0,
                      transform: 'translate(-100%, -50%)',
                    }
                  : {
                      right: 0,
                      transform: 'translate(100%, -50%)',
                    }),
              }}
            >
              <IconButton
                variant={isLiked ? 'soft' : 'plain'}
                color={isLiked ? 'danger' : 'neutral'}
                size="sm"
                onClick={() => setIsLiked((prevState) => !prevState)}
              >
                {isLiked ? '❤️' : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton
                variant={isCelebrated ? 'soft' : 'plain'}
                color={isCelebrated ? 'warning' : 'neutral'}
                size="sm"
                onClick={() => setIsCelebrated((prevState) => !prevState)}
              >
                {isCelebrated ? '🎉' : <CelebrationOutlinedIcon />}
              </IconButton>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}

export default observer(ChatBubble);