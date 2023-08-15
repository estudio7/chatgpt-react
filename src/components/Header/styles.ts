import { styled } from '@mui/material/styles';
import { Button, AppBar, Avatar, Box } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  /*  border: '1px solid #C9C9C9', */
  /* boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)', */
  borderRadius: '52px',
  color: '#190755',
}));

export const StyledAppBar = styled(AppBar)({
  background: '#FFFFFF',
  /* boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', */
});

export const StyledAvatar = styled(Avatar)({
  color: '#190755',
});
export const TopSection = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const SvgButton = styled('svg')({
  fill: 'currentColor',
});

export const StyledProgressIndicator = styled(Box)({
  height: "10px",
  marginTop: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  position: "relative",
})

export const StyledProgressIndicatorIcon = styled(Box)({
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  backgroundColor: "green",
  position: "absolute",
  margin: "auto",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})