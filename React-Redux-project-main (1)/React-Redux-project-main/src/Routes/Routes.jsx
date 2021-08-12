import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "../Screens/SignUp";
import Home from "../Component/Home/Home";
import SignIn from "../Screens/SignIn";
import PrivateRoute from "./PrivateRoute";
import TableData from "../Component/Table/TableData";
import Dashboard from "../Component/Dashboard/Dashboard";
import Orders from "../Component/orders/Orders";
import Invoices from "../Component/Invoices/Invoices";
import FormData from "../Screens/FormData";
import {Provider} from 'react-redux'
import store from "../Component/Redux/Store";

function Routes() {
  return (
    <>
      <BrowserRouter>
      <Provider store={store}>
        {/* <Route path="/home" component={Home} /> */}
        <Route exact path="/" component={SignIn} />
        <Route exact path="/form" component={FormData} />
         <Route path="/Sign-up" component={SignUp} />
        <PrivateRoute path={"/home"} component={Home} exact />
        <PrivateRoute path={"/home/table"} component={TableData} exact />
        <PrivateRoute path={"/home/dashboard"} component={Dashboard} exact />
        <PrivateRoute path={"/home/orders"} component={Orders} exact />
        <PrivateRoute path={"/home/invoices"} component={Invoices} exact />
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default Routes;
