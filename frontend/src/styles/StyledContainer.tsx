import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  zIndex: 1,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  "&::before": {
    content: '""',
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      'url("https://t3.ftcdn.net/jpg/04/83/90/18/360_F_483901821_46VsNR67uJC3xIKQN4aaxR6GtAZhx9G8.jpg")',
    backgroundSize: "200px 200px",
    backgroundRepeat: "repeat",
    opacity: 0.15,
    zIndex: -1,
  },
}));
