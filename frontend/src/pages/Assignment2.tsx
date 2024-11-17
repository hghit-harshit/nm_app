import { useState, ChangeEvent } from "react";
import {
  Box,
  Grid,
  TextField,
  Switch,
  Button,
  FormControlLabel,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import "../katex.min.css";
import StyledAppBar from "../components/StyledAppBar";
import config from "../config.json";
import { GaussLegendreResults, LangrangeResults } from "../types";
import NodesWeightsTable from "../components/NodesWeightsTable";
import Plot from "../components/Plot";
import MatrixModal from "../components/MatrixModal";
import CodeDialog from "../components/CodeDialog";
import ResultCard from "../components/ResultCard";
import { StyledContainer } from "../styles/StyledContainer";

const Assignment2 = () => {
  const [n, setN] = useState("20");
  const [method, setMethod] = useState<"gl" | "l">("gl");
  const [gaussLegendreData, setGaussLegendreData] =
    useState<GaussLegendreResults | null>(null);
  const [lagrangeData, setLagrangeData] = useState<LangrangeResults | null>(
    null
  );
  const [submitted, setSubmitted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<string | null>(null);

  const handleNChange = (event: ChangeEvent<HTMLInputElement>) =>
    setN(event.target.value);

  const handleSendClick = async () => {
    if (parseInt(n) > 0) {
      try {
        const response = await fetch(`${config.BACKEND_URL}/assignment2_view/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ n }),
        });
        const data = await response.json();

        setGaussLegendreData(data.method1);
        setLagrangeData(data.method2);
        setSubmitted(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else alert("N must be a positive integer");
  };

  const handleMethodChange = (event: ChangeEvent<HTMLInputElement>) =>
    setMethod(event.target.checked ? "l" : "gl");

  return (
    <>
      <StyledAppBar title="Calculating the nodes and weight for Gaussian Quadrature" />

      <StyledContainer maxWidth="xl" sx={{ "::before": { top: "70px" } }}>
        <Box sx={{ textAlign: "center", mb: 4, mt: -5 }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ maxWidth: 800, mx: "auto" }}
          >
            <Grid item xs={6} sm={4}>
              <TextField
                label="N"
                type="number"
                variant="filled"
                value={n}
                onChange={handleNChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={method === "l"}
                    onChange={handleMethodChange}
                    name="method"
                    color="primary"
                  />
                }
                label={`${method === "gl" ? "Jacobi Matrix" : "Companion Matrix"}`}
              />
            </Grid>
            <Grid item xs={3} sm={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendClick}
                startIcon={<Send />}
                fullWidth
              >
                Solve
              </Button>
            </Grid>
          </Grid>
        </Box>

        {submitted && (
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Grid container spacing={3} direction="column">
                <NodesWeightsTable
                  data={method === "l" ? lagrangeData : gaussLegendreData}
                  type={method}
                  handleCodeButtonClick={setDialogContent}
                  setOpenDialog={setOpenDialog}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
              {method === "l" && (
                <Grid item sx={{ mb: "10px" }}>
                  <ResultCard
                    title="Matrix"
                    content={
                      <Button
                        variant="outlined"
                        onClick={() => setOpenModal(true)}
                      >
                        View Matrix
                      </Button>
                    }
                    onCodeClick={() => console.log("Code clicked")}
                    height="20%"
                  />
                </Grid>
              )}
              <Plot
                data={method === "l" ? lagrangeData : gaussLegendreData}
                type={method}
                handleCodeButtonClick={setDialogContent}
                setOpenDialog={setOpenDialog}
              />
            </Grid>
          </Grid>
        )}
      </StyledContainer>

      <MatrixModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        langrangeData={lagrangeData}
      />
      <CodeDialog
        dialogContent={dialogContent}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        setDialogContent={setDialogContent}
      />
    </>
  );
};

export default Assignment2;
