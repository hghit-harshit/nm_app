import { Modal, Box, Typography } from "@mui/material"
import { MatrixModalProps } from "../types"

const MatrixModal = ({ openModal, setOpenModal, langrangeData, setOpenDialog, handleCodeButtonClick }: MatrixModalProps) => {
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ p: 4, bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, maxWidth: 600, mx: "auto" }}>
          <Typography variant="h6" component="h2" mb={2}>
            Lagrange Matrix
          </Typography>
          {langrangeData && (
            <Box>
              {/* <BlockMath
                math={`A = \\begin{bmatrix} ${lagrangeData.matrix
                  .map((row) => row.join(" & "))
                  .join("\\\\")} \\end{bmatrix}`}
              /> */}
            </Box>
          )}
        </Box>
      </Modal>
  )
}

export default MatrixModal
