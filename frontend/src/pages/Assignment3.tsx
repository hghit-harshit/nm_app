import { useState, ChangeEvent } from "react";
import { Grid, TextField, Button, Paper, Typography } from "@mui/material";
import { OpenInNew, Send, Visibility } from "@mui/icons-material";
import StyledAppBar from "../components/StyledAppBar";
import { EquationInput, GraphData } from "../types";
import { StyledContainer } from "../styles/StyledContainer";
import config from "../config.json";
import ResultCard from "../components/ResultCard";
import { InlineMath } from "react-katex";

export default function Assignment3() {
  const [inputs, setInputs] = useState<EquationInput>({
    P: 5,
    u0: 10,
    uEnd: 15,
    step_size: 10,
  });
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendClick = async () => {
    try {
      const response = await fetch(`${config.BACKEND_URL}/assignment3_view/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const data: GraphData = await response.json();
      setGraphData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <StyledAppBar title="Solving the ODEs using different methods" />

      <StyledContainer maxWidth="lg" sx={{ "::before": { top: "70px" } }}>
        <Grid container spacing={2} alignItems="center" sx={{ ml: 15 }}>
          {Object.keys(inputs).map((key, index) => (
            <Grid item xs={12} sm={2} key={key}>
              <TextField
                variant="filled"
                fullWidth
                key={index}
                label={key}
                type="number"
                name={key}
                value={inputs[key as keyof typeof inputs]}
                onChange={handleInputChange}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendClick}
              startIcon={<Send />}
            >
              Send
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" sx={{ ml: 20, mt: 1 }}>
          <Grid item xs={12} sm={3}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => window.location.href = '/assets/1.PDF'}
              startIcon={<Visibility />}
              endIcon={<OpenInNew />}
            >
              Method Summary
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => window.location.href = '/assets/2.pdf'}
              startIcon={<Visibility />}
              endIcon={<OpenInNew />}
            >
              Finite Difference
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => window.location.href = 'assets/3.pdf'}
              startIcon={<Visibility />}
              endIcon={<OpenInNew />}
            >
              Eigenvalue
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={12}>
            <ResultCard
              title="Eigenvalue in this case is"
              content={
                <InlineMath math="-\frac{\sqrt{(1+\frac{P}{2})^2 - 2Pu}}{u}" />
              }
            />
          </Grid>
        </Grid>

        {graphData && (
          <Grid container spacing={4} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Explicit Graph
                </Typography>
                <img
                  src={`data:image/png;base64,${graphData.explicit}`}
                  alt="Explicit Graph"
                  style={{ width: "100%", height: "auto" }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Implicit Graph
                </Typography>
                <img
                  src={`data:image/png;base64,${graphData.implicit}`}
                  alt="Implicit Graph"
                  style={{ width: "100%", height: "auto" }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Finite Difference Graph
                </Typography>
                <img
                  src={`data:image/png;base64,${graphData.finite_difference}`}
                  alt="Finite Difference Graph"
                  style={{ width: "100%", height: "auto" }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Analytical Graph
                </Typography>
                <img
                  src={`data:image/png;base64,${graphData.analytical}`}
                  alt="Analytical Graph"
                  style={{ width: "100%", height: "auto" }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Master Graph
                </Typography>
                <img
                  src={`data:image/png;base64,${graphData.all_graphs}`}
                  alt="Master Graph"
                  style={{ width: "100%", height: "auto" }}
                />
              </Paper>
            </Grid>
          </Grid>
        )}
      </StyledContainer>
    </>
  );
}
