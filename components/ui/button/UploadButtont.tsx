import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PublishIcon from '@mui/icons-material/Publish';
import { ChangeEvent, RefObject } from 'react';
import CommonLoading from '../loading/CommonLoading';

interface Props {
  text: string;
  loading: boolean;
  inputRef: RefObject<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: React.FC<Props> = ({ text, loading, inputRef, onChange }) => {
  return (
    <Button
      component="label"
      variant="contained"
      tabIndex={-1}
      startIcon={loading ? <CommonLoading /> : <PublishIcon />}
    >
      {text}
      <VisuallyHiddenInput ref={inputRef} onChange={onChange} type="file" />
    </Button>
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
