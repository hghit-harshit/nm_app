import { AppBar, Typography } from "@mui/material";
import { AppBarProps } from "../types";

const StyledAppBar = ({ title }: AppBarProps) => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#388e3c", zIndex: 2 }}>
      <Typography
        variant="h3"
        component="h3"
        align="center"
        color="white"
        sx={{
          padding: 1,
          fontFamily: "Markazi Text",
          fontStyle: "normal",
        }}
      >
        {title}
      </Typography>
    </AppBar>
  );
};

export default StyledAppBar;
