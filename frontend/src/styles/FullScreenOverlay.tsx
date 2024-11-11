import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FullScreenOverlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#ffffff",
  zIndex: 1300,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
