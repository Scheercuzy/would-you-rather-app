import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";

import LoginDialog from "./LoginDialog";
import { handleInitialData } from "./store/actions/shared";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import CreatePoll from "./CreatePoll";
import Question from "./Question";
import Error404 from "./404";

import Layout from "./layouts/index";
import PrivateRoute from "./utils/PrivateRoute";

import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: "100%"
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
          <Paper className={classes.root} style={{backgroundColor: '#F2F2F2'}}>
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
                path="/createpoll"
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
