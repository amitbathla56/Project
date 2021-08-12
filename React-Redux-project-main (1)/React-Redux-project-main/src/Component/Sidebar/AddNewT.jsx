import React from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DialogContentText from "@material-ui/core/DialogContentText";

function AddNewT(props) {
  let history = useHistory();
  const [change, setChange] = useState({ title: "", body: "" });
  const [error, setError] = useState();

  // const handleClickOpen = () => {
  //     setOpen1(true);
  //   };
  const handleClose = () => {
    // setAnchorEl(null);
    // props.setOpen1(false);
    history.push("/home/dashboard");
  };

  const redirecToMain = () => {
    // props.setOpen1(false);
    history.push("/home/dashboard");
  };

  const AddData = () => {
    if (change.title !== "" && change.body !== "") {
      let Data;
      try {
        Data = JSON.parse(localStorage.getItem("Data"));
      } catch (error) {
        console.log("no data" + error);
      }

      if (Data) {
        Data.push({ ...change });
      } else {
        Data = [];
        Data.push({ ...change });
      }

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

  return (
    <div>
      <div>
        <Dialog
          open={props.open1}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">AddNew Title </DialogTitle>
          <DialogContentText style={{ color: "red" }}>
            {error}
          </DialogContentText>

          <DialogContent>
            <TextField
              required
              onChange={(e) => setChange({ ...change, title: e.target.value })}
              autoFocus
              margin="dense"
              id="title"
              label="title"
              fullWidth
            />

            <TextField
              onChange={(e) => setChange({ ...change, body: e.target.value })}
              autoFocus
              margin="dense"
              id="body"
              label="body"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={AddData} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AddNewT;
