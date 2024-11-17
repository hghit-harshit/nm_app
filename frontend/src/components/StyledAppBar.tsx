import { AppBar, Typography } from "@mui/material";
import { AppBarProps } from "../types";

const StyledAppBar = ({ title }: AppBarProps) => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#388e3c", zIndex: 2 }}>
      <Typography
        variant="h5"
        component="h1"
        align="center"
        color="white"
        sx={{ padding: 2 }}
      >
        {title}
      </Typography>
    </AppBar>
  );
};

export default StyledAppBar;
