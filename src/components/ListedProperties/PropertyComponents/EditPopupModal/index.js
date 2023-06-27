import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { updateSingleProperty } from "../../../reduxState/ListedPropertiesReducer";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import "./EditModal.styles.scss";

// can be used for designing later

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          className="customised-icon-button"
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default function EditPopupModal({
  open,
  handleClose,
  singlePropertyDataUpdation,
  handleSinglePropertyDataUpdation
}) {
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(
      updateSingleProperty({
        id: singlePropertyDataUpdation.id,
        title: singlePropertyDataUpdation.title,
        body: singlePropertyDataUpdation.body,
        userId: singlePropertyDataUpdation.userId
      })
    );
  };
  return (
    <div>
      <Dialog
        className="dialog-container"
        fullWidth="true"
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Edit Your Property - PropertyID: {singlePropertyDataUpdation.id}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="title"
            multiline
            maxRows={2}
            value={singlePropertyDataUpdation.title}
            onChange={handleSinglePropertyDataUpdation}
            label="Property Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="body"
            multiline
            maxRows={4}
            value={singlePropertyDataUpdation.body}
            onChange={handleSinglePropertyDataUpdation}
            label="Property Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
