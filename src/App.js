import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";

import LoginDialog from "./Components/LoginDialog";
import { handleInitialData } from "./Components/store/actions/shared";
import Home from "./Components/Home";
import LeaderBoard from "./Components/LeaderBoard";
import CreatePoll from "./Components/CreatePoll";
import Question from "./Components/Question";
import Error404 from "./Components/Error404";

import Layout from "./Components/layouts/index";
import PrivateRoute from "./Components/utils/PrivateRoute";

import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: "100%"
  }
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authUser, classes } = this.props;
    return (
      <BrowserRouter>
        <Layout>
          <CssBaseline />
          <Paper
            className={classes.root}
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <Switch>
              <Route path="/login" component={LoginDialog} />
              <PrivateRoute
                exact
                path="/"
                authUser={authUser}
                component={Home}
              />
              <PrivateRoute
                path="/leaderboard"
                authUser={authUser}
                component={LeaderBoard}
              />
              <PrivateRoute
                path="/add"
                authUser={authUser}
                component={CreatePoll}
              />
              <PrivateRoute
                path="/question/:q"
                authUser={authUser}
                component={Question}
              />
              <Route
                render={() => <Error404 message404="This page doesn't exist" />}
              />
            </Switch>
          </Paper>
        </Layout>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(App);
