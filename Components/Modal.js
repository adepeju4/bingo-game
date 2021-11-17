import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fcb69f",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function GameModal({count, open, setOpen}) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Yay! You won {count} bingo(s)
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              replay game?
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
