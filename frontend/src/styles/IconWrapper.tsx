import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));
