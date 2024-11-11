import { Functions } from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";
import { FullScreenOverlay } from "../styles/FullScreenOverlay";

const FullScreenLoadingOverlay = () => {
  return (
    <FullScreenOverlay>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Functions sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
        <CircularProgress size={50} color="inherit" />
      </Box>
    </FullScreenOverlay>
  );
};

export default FullScreenLoadingOverlay;
