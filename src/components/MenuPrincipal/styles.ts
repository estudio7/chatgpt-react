// components/styles.ts
import styled from '@emotion/styled';
import { Link } from '@mui/material';

export const StyledLink = styled(Link)({
  margin: '0 8px',
  color: '#190755',
  textDecoration: 'none',
  paddingBottom: '4px',
  '&:hover': {
    borderBottom: '5px solid #190755',
  },
});
