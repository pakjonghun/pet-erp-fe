import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PublishIcon from '@mui/icons-material/Publish';
import { ChangeEvent } from 'react';
import CommonLoading from '../loading/CommonLoading';
import { IconButton } from '@mui/material';

interface Props {
  text: string;
  loading: boolean;
  fileKey: Date;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: React.FC<Props> = ({ text, loading, fileKey, onChange }) => {
  return (
    <>
      <Button
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
        component="label"
        variant="contained"
        tabIndex={-1}
        startIcon={loading ? <CommonLoading /> : <PublishIcon />}
      >
        {text}
        <VisuallyHiddenInput key={fileKey.toISOString()} onChange={onChange} type="file" />
      </Button>
      <IconButton
        sx={{
          display: {
            md: 'none',
          },
        }}
        component="label"
        tabIndex={-1}
      >
        {loading ? <CommonLoading /> : <PublishIcon />}
        <VisuallyHiddenInput key={fileKey.toISOString()} onChange={onChange} type="file" />
      </IconButton>
    </>
  );
};

export default UploadButton;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
