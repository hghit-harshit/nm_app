import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { BlockMath } from "react-katex";
import ResultCard from "./ResultCard";
import { NodesWeightsTableProps } from "../types";
import config from "../config.json";

const NodesWeightsTable = ({
  data,
  type,
  setOpenModal,
  handleCodeButtonClick,
  setOpenDialog,
}: NodesWeightsTableProps) => {
  const calculateWeightSum = (weights: number[]) =>
    weights.reduce((sum, weight) => sum + weight, 0);

  return (
    <>
      {/* {type === "l" && (
        <Grid item>
          <ResultCard
            title="Matrix"
            content={
              <Button variant="outlined" onClick={() => setOpenModal(true)}>
                View Matrix
              </Button>
            }
            onCodeClick={() => console.log("Code clicked")}
            height="20%"
          />
        </Grid>
      )} */}
      <Grid item xs={12} md={6}>
        <ResultCard
          title={
            type === "gl"
              ? "Gauss-Legendre Nodes and Weights"
              : "Lagrange Nodes and Weights"
          }
          content={
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {data?.nodes.map((node, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <BlockMath
                          math={`x_{${index + 1}} = ${node.toFixed(16)}`}
                        />
                      </TableCell>
                      <TableCell>
                        <BlockMath
                          math={`w_{${index + 1}} = ${data.weights[
                            index
                          ].toFixed(16)}`}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      <BlockMath
                        math={`\\sum w = ${calculateWeightSum(
                          data?.weights || []
                        ).toFixed(16)}`}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          }
          onCodeClick={() => {
            handleCodeButtonClick(config.nodesWeightsText);
            setOpenDialog(true);
          }}
        />
      </Grid>
    </>
  );
};

export default NodesWeightsTable;
