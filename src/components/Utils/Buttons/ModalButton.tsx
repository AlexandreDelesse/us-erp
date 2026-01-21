import {
  Box,
  Button,
  IconButton,
  Modal,
  type ButtonProps,
  type ModalProps,
} from "@mui/material";
import { useState, type ReactNode } from "react";
import StarIcon from "@mui/icons-material/Star";

interface ModalButtonProps {
  buttonProps?: ButtonProps;
  buttonLabel?: string;
  modalProps?: ModalProps;
  children: ReactNode;
  icon?: boolean;
}
export default function ModalButton(props: ModalButtonProps) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };

  const button = props.icon ? (
    <IconButton onClick={toggleOpen}>
      {props.buttonProps?.endIcon || props.buttonProps?.startIcon || (
        <StarIcon />
      )}
    </IconButton>
  ) : (
    <Button
      {...props.buttonProps}
      startIcon={<StarIcon />}
      color="inherit"
      onClick={toggleOpen}
    >
      {props.buttonLabel || "No label"}
    </Button>
  );

  return (
    <div>
      {button}

      <Modal {...props.modalProps} open={open} onClose={toggleOpen}>
        <Box sx={style}>{props.children}</Box>
      </Modal>
    </div>
  );
}
