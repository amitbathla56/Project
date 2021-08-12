import React, { useState } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useHistory } from "react-router-dom";

function EditNewT(props) {
  const history = useHistory();
  const [state, setstate] = useState({ title: props.title, body: props.body });
  const [error, setError] = useState();
  const redirecToMain = () => {
    history.push("/home");
  };

  const handle = () => {
    if ((state.title !== "") & (state.body !== "")) {
      let Data = JSON.parse(localStorage.getItem("Data"));

      Data = Data.map((value) => {
        // console.log("finding solution ", value.title);
        if (value.title === props.title && value.body === props.body) {
          return {
            ...value,
            title: state.title,
            body: state.body,
          };
        }

        return value;
      });

      try {
        localStorage.setItem("Data", JSON.stringify(Data));
        redirecToMain();
      } catch (error) {
        console.log("failed" + error);
      }
    } else {
      setError("Please Enter Title  ");
    }
  };

  const handleClose = () => {
    props.setOpen(false);
    history.push("/home");
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContentText style={{ color: "red" }}>{error}</DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="title"
            onChange={(e) => setstate({ ...state, title: e.target.value })}
            value={state.title}
            fullWidth
          />

          <TextField
            onChange={(e) => setstate({ ...state, body: e.target.value })}
            autoFocus
            margin="dense"
            id="body"
            label="body"
            value={state.body}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handle} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditNewT;
