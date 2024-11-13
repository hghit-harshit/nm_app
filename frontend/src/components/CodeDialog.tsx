import { Dialog, DialogContent, DialogTitle, Box, Button } from "@mui/material";
import { CodeDialogProps } from "../types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { GitHub } from "@mui/icons-material";

const CodeDialog = ({ openDialog, dialogContent, setOpenDialog, setDialogContent }: CodeDialogProps) => {
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogContent(null);
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
      <DialogTitle>Code</DialogTitle>
      <DialogContent>
        <SyntaxHighlighter language="python">
          {dialogContent || ""}
        </SyntaxHighlighter>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            startIcon={<GitHub />}
            href="https://github.com/hghit-harshit/nm_app"
            target="_blank"
          >
            View Full Code
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CodeDialog;
