import { Box, Button, CardContent, Typography } from "@mui/material";
import { AssignmentCardProps } from "../types";
import { StyledCard } from "../styles/StyledCard";
import { IconWrapper } from "../styles/IconWrapper";
import { PlayArrow } from "@mui/icons-material";

const AssignmentCard = ({
  number,
  description,
  icon,
  handleClick,
}: AssignmentCardProps) => {
  return (
    <StyledCard key={number}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconWrapper>{icon}</IconWrapper>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontFamily: "Mitr",
              fontWeight: 400,
              color: "#333",
              ml: 2,
            }}
          >
            Assignment {number}
          </Typography>
        </Box>
        <Typography
          sx={{
            mb: 3,
            color: "#666",
            fontFamily: "Quattrocento Sans",
          }}
        >
          {description}
        </Typography>
        <Button
          onClick={() => handleClick(`/assignment${number}`)}
          variant="contained"
          color="primary"
          startIcon={<PlayArrow />}
          sx={{
            bgcolor: "#4caf50",
            "&:hover": {
              bgcolor: "#45a049",
            },
            fontFamily: "Mitr",
          }}
        >
          Go to Project
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default AssignmentCard;
