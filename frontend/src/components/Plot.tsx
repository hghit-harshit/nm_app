import { Box } from "@mui/material";
import { PlotProps } from "../types";
import ResultCard from "./ResultCard";
import config from "../config.json";

const Plot = ({
  data,
  type,
  handleCodeButtonClick,
  setOpenDialog,
}: PlotProps) => {
  return (
    <ResultCard
      title=""
      content={
        <Box sx={{ height: 700 }}>
          <img
            src={`data:image/png;base64,${data?.plot_url}`}
            alt={type === "gl" ? "Gauss-Legendre Plot" : "Lagrange Plot"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      }
      height="relative"
      onCodeClick={() => {
        handleCodeButtonClick(config.plotText);
        setOpenDialog(true);
      }}
    />
  );
};

export default Plot;
