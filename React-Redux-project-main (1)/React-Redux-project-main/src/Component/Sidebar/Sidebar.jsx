import React from "react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListData from "../ListData";
import { Button } from "@material-ui/core";
import AddNewT from "../Sidebar/AddNewT";
import { Redirect } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import TableChartIcon from "@material-ui/icons/TableChart";
import TocIcon from "@material-ui/icons/Toc";
import { useHistory } from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  right: {
    float: "right",
  },
  listh: {
    display: "flex",

    fontWeight: "900",
    fontSize: "42px",
    justifyContent: "center",
  },
  btn: {
    display: "flex",
    justifyContent: "right",
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  let history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  // const [change, setChange] = useState({ title: "", body: "" });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openEl = Boolean(anchorEl);
  const [data, setState] = useState();
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    let Data;
    try {
      Data = JSON.parse(localStorage.getItem("Data"));

      setState(Data);
    } catch (error) {
      console.log("error" + error);
    }
    // axios.get(`http://localhost:3000/card`)
    //   .then(res => {
    //     let fullData = res.data;
    //     console.log("fulldata", fullData)
    //     setState(fullData);

    //   }
    //   )
    //   .catch(error => { console.log(error) })
  }, []);

  //   const AddData = () => {
  //     if(change.title!="" && change.body!=""){
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({title:change.title,body:change.body})
  //   };
  //   fetch('http://localhost:3000/card', requestOptions)
  //       .then(response => response.json())
  //       alert("data submited")
  // }

  //   }

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // setAnchorEl(null);
    localStorage.removeItem("token");
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Redirect to="/" push={true} />;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function cvalue(val, index) {
    return <ListData title={val.title} body={val.body} />;
  }

  const TableFun = () => {
    history.push("/home/table");
  };

  const DashboardFun = () => {
    history.push("/home/dashboard");
  };
  const OrderFun = () => {
    history.push("/home/orders");
  };

  const InvoicesFun = () => {
    history.push("/home/invoices");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Home
          </Typography>
          <div className={classes.right}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={openEl}
              onClose={handleClose}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={handleClose}>LogOut</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={DashboardFun}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={TableFun}>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="Tables" />
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={OrderFun}>
            <ListItemIcon>
              <TocIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={InvoicesFun}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Invoices" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.Dashboard ? (
          <>
            <Typography className={classes.listh}>List</Typography>
            <Typography className={classes.btn}>
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  AddNew
                </Button>
                <AddNewT open1={open1} setOpen1={setOpen1} />
              </div>
            </Typography>
            <Typography>{data ? <>{data.map(cvalue)} </> : null}</Typography>
          </>
        ) : null}
        <Typography>{props.TableData}</Typography>
        <Typography>{props.Dashboard}</Typography>
        <Typography>{props.orders}</Typography>
        <Typography>{props.invoices}</Typography>
        <Typography paragraph></Typography>
      </main>
    </div>
  );
}
