//src/pages/Colleges.module.ts
import styled from '@emotion/styled';
import { Container, Grid, Card as MuiCard, Typography } from '@mui/material';

export const StyledCard = styled(MuiCard)`
  border: 1px solid #A0A0A0;
  border-radius: 0 0 30px 0;
  margin-bottom: 20px;
  padding: 20px;
`;
export const StyledGrid = styled(Grid)`
  margin-bottom: 20px;
`;
export const StyledContainer = styled(Container)`
  padding: 20px;
  background-color: #f5f5f5;
`;
export const Title = styled(Typography)`
  font-family: 'Merriweather';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 160%;
  color: #190755;
`;

export const Data = styled(Typography) <{ bgcolor?: string }>`
  background: ${props => props.bgcolor || "#EFEFEF"};
  border-radius: 50px;
  color: ${props => props.bgcolor ? '#ffffff' : '#190755'};
  padding: 10px;
  font-family: Open Sans;
  margin: 0.5rem 0; 
`;
export const StyledH1 = styled.h1`
  color: var(--kaplan-deep-purple, #190755);
  font-size: 2rem;
  font-family: 'Open Sans';
  font-weight: 700;
  line-height: 160%;
`;

export const StyledP = styled.p`
  color: var(--kaplan-deep-purple, #190755);
  font-size: 1.25rem;
  font-family: 'Open Sans';
  line-height: 160%;
`;

export const StyledH4 = styled.h4`
  color: var(--kaplan-deep-purple, #190755);
  font-size: 1.25rem;
  font-family: 'Open Sans';
  font-weight: 700;
  line-height: 160%;
`;