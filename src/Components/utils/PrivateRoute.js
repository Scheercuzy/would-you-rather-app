import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            from: props.location.pathname
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
