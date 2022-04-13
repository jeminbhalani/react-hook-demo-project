import React from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { useUser } from "../components/hook/useUser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const DeleteModal = () => {
  const { handleClose, deleteData } = useUser();

  return (
    <Box sx={style}>
      <Typography>Are you sure you want to delete these user row</Typography>
      <Button onClick={deleteData}>Yes</Button>
      <Button onClick={handleClose}>Cancle</Button>
    </Box>
  );
};

export default DeleteModal;
