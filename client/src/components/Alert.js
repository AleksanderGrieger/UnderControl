import React from 'react';
import { StyledAlert } from './styles/Alert.styled';
import useAPIError from './useAPIError';

const Alert = () => {
  const { error, removeError } = useAPIError();

  if (error) {
    setTimeout(() => {
      removeError();
    }, 3000);
    return <StyledAlert error={error.status}>{error.message}</StyledAlert>;
  } else {
    return null;
  }
};

export default Alert;
