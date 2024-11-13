import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import "../katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import { Results } from "../types";
import config from "../config.json";
import { CloudUpload } from "@mui/icons-material";
import CodeDialog from "../components/CodeDialog";
import StyledAppBar from "../components/StyledAppBar";
import ResultCard from "../components/ResultCard";
import { multiDimMatrixToLatex, singleDimMatrixToLatex } from "../utils/latexConversion";

const Assignment1 = () => {
  const [results, setResults] = useState<Results | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<string | null>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFile(file);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          `${config.BACKEND_URL}/assignment1_view/`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();

        const processedResults = {
          matrix: data.matrix,
          b1_matrix: data.b1,
          b2_matrix: data.b2,
          eigenvalues_A: data.eigenvalues_A,
          iterations: data.iterations,
          determinant: data.determinant,
          condition_number: data.condition_number,
          condition_number_hilbert: data.condition_number_hilbert,
          solution_x1: data.solution_x1,
          solution_x2: data.solution_x2,
        };
        setResults(processedResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleCodeButtonClick = (content: string) => {
    setDialogContent(content);
    setOpenDialog(true);
  };

  return (
    <>
      <StyledAppBar title="Assignment 1" />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
            sx={{ mb: 2 }}
          >
            Upload Matrix CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              hidden
            />
          </Button>
          {file && (
            <Typography variant="body1" color="textDisabled">
              File uploaded: {file.name}
            </Typography>
          )}
        </Box>

        {results && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box mt={0}>
                <ResultCard
                  title="Input Matrix A"
                  content={<InlineMath math={multiDimMatrixToLatex(results.matrix)} />}
                  onCodeClick={() => handleCodeButtonClick(config.inputMatrixText)}
                />
              </Box>
              <Grid container spacing={3} mt={3}>
                <Grid item xs={12} md={6}>
                  <ResultCard
                    title="B1 Matrix"
                    content={<InlineMath math={singleDimMatrixToLatex(results.b1_matrix)} />}
                    onCodeClick={() => handleCodeButtonClick(config.b1MatrixText)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ResultCard
                    title="B2 Matrix"
                    content={<InlineMath math={singleDimMatrixToLatex(results.b2_matrix)} />}
                    onCodeClick={() => handleCodeButtonClick(config.b2MatrixText)}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={9}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <ResultCard
                    title="Determinant"
                    content={results.determinant.toString()}
                    onCodeClick={() =>
                      handleCodeButtonClick(config.determinantModalText)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <ResultCard
                    title="Iterations"
                    content={results.iterations.toString()}
                    onCodeClick={() => handleCodeButtonClick(config.iterationsModalText)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <ResultCard
                    title="Condition Number"
                    content={results.condition_number.toString()}
                    onCodeClick={() => handleCodeButtonClick(config.conditionNumberText)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <ResultCard
                    title="Hilbert Condition Number"
                    content={results.condition_number_hilbert.toString()}
                    onCodeClick={() => handleCodeButtonClick(config.hilbertConditionNumberText)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <ResultCard
                    title="Eigenvalues"
                    content={
                      <TableContainer component={Paper} sx={{ maxWidth: 500, boxShadow: 3, borderRadius: 2, mt: 2 }}>
                        <Table>
                          <TableBody>
                            {results.eigenvalues_A.map((val, idx) => (
                              <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                  <BlockMath math={`\\lambda_${idx + 1}`} />
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem', pr: 2 }}>
                                  <BlockMath math={val.toFixed(4).toString()} />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    }
                    onCodeClick={() => handleCodeButtonClick(config.eigenvaluesModalText)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <ResultCard
                    title="Solution X1"
                    content={results.solution_x1.map((val, idx) => (
                      <div key={idx} style={{ marginTop: 15 }}>
                        <InlineMath math={`x_{${idx + 1}} = ${val}`} />
                      </div>
                    ))}
                    onCodeClick={() => handleCodeButtonClick(config.solutionX1Text)}
                    height="50%"
                  />
                  <ResultCard
                    title="Solution X2"
                    content={results.solution_x2.map((val, idx) => (
                      <div key={idx} style={{ marginTop: 15 }}>
                        <InlineMath math={`x_{${idx + 1}} = ${val}`} />
                      </div>
                    ))}
                    onCodeClick={() => handleCodeButtonClick(config.solutionX2Text)}
                    height="47%"
                    mt={2}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>

      <CodeDialog
        dialogContent={dialogContent}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        setDialogContent={setDialogContent}
      />
    </>
  );
};

export default Assignment1;
