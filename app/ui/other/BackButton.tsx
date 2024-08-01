import * as React from 'react';
import Button from '@mui/material/Button';

interface ButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<ButtonProps> = ({
  onClick,
}) => {
  return (
    <Button
      sx={{ mt: 2, backgroundColor: '#ED9121', color: 'white' }}
      onClick={onClick}
    >
      Back
    </Button>
  );
};

export default BackButton;
