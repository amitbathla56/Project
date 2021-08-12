import React from "react";
import { Route, useHistory } from "react-router-dom";
import {connect} from 'react-redux'

function PrivateRoute(props) {
  const history = useHistory();

  //const token = JSON.parse(localStorage.getItem("token"));
  console.log();
  return (
    <>
      {props.token ? (
        <Route
          path={props.path}
          exact={props.exact}
          component={props.component}
        />
      ) : (
        history.push("/")
      )}
    </>
  );
}
const mapStateToProps = (state) =>{
  return {
    token:state.token
  }
}
export default connect(mapStateToProps)(PrivateRoute);
