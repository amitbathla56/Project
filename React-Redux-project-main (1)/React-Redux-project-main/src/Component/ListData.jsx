import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import EditNewT from "./Sidebar/EditNewT";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    width: "1100px",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function ListData(props) {
  const [Open, setOpen] = useState(false);

  let history = useHistory();

  const classes = useStyles();

  const Deletebtn = () => {
    let Data;

    try {
      Data = JSON.parse(localStorage.getItem("Data"));
      // console.log(Data);
    } catch (error) {
      console.log("Something went wrong, Error:  " + error);
    }

    if (Data) {
      var NewData = Data.filter((item) => item.title !== props.title);
      // console.log(NewData);

      try {
        localStorage.setItem("Data", JSON.stringify(NewData));
        alert("deleted");
        history.push("/home/dashboard");
      } catch (error) {
        console.log("Failed to save the data, error: " + error);
      }
    }
  };

  //   let Data;
  //  try {
  //    Data = JSON.parse(localStorage.removeItem("Data"))

  //  } catch (error) {

  //  }

  // try {
  //   Data = JSON.parse(localStorage.removeItem("Data"))
  // } catch (error) {
  //   console.log("error"+error)
  // }
  // console.log("deleted")
  // fetch('http://localhost:3000/card/'+id,{
  //   method:'DELETE',
  //   header:{'Content-Type':'application/json','Accept':'application/json'}
  // })

  function Editbtn() {
    return setOpen(true);
  }

  return (
    <div>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}></Typography>
        <div className={classes.demo}>
          <List>
            <ListItem>
              <ListItemText primary={props.title} secondary={props.body} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <EditIcon onClick={Editbtn} />
                  <EditNewT
                    open={Open}
                    setOpen={setOpen}
                    title={props.title}
                    body={props.body}
                  />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon
                    onClick={() => {
                      Deletebtn(props.title);
                    }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
      </Grid>
    </div>
  );
}

export default ListData;
