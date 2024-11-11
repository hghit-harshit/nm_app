import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.9)",
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
}));
