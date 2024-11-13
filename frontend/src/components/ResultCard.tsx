import { Code } from "@mui/icons-material";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import { ResultCardProps } from "../types";

const ResultCard = ({ title, content, onCodeClick, height, mt, startIcon }: ResultCardProps) => (
  <Card
    sx={{
      height: height || "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#f0f0f0",
      color: "black",
      boxShadow: 8,
      mt: mt || 0,
    }}
  >
    <CardContent sx={{ padding: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Box display="flex" alignItems="center">
          {startIcon && (
            <Box sx={{ mr: 1 }}>{startIcon}</Box>
          )}
          <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Box>
        <IconButton onClick={onCodeClick} sx={{ color: "secondary.main", alignSelf: "center", p: 0.5 }} aria-label="code">
          <Code fontSize="medium" />
        </IconButton>
      </Box>

      <Typography variant="body1" sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
        {content}
      </Typography>
    </CardContent>
  </Card>
);

export default ResultCard;
