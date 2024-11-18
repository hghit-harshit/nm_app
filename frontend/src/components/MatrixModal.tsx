import { Modal, Box, Typography } from "@mui/material";
import { MatrixModalProps } from "../types";
import { InlineMath } from "react-katex";
import { multiDimMatrixToLatex } from "../utils/latexConversion";

const MatrixModal = ({
  openModal,
  setOpenModal,
  langrangeData,
}: MatrixModalProps) => {
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box
        sx={{
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          mx: 15,
          maxHeight: "90vh",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Companion Matrix
        </Typography>
        {langrangeData && (
          <Box>
            <InlineMath math={multiDimMatrixToLatex(langrangeData.comp_mat)} />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default MatrixModal;
