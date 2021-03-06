import React, { Component, Fragment } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import DrawerLayout from "./DrawerLayout";
import AppBarLayout from "./AppBarLayout";
import SnackbarLayout from "./SnackbarLayout";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  toolbar: theme.mixins.toolbar,
  content: {
    maxWidth: "100%",
    width: "100vw",
    minHeight: "100vh"
  }
});

class Nav extends Component {
  state = {
    drawerOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ drawerOpen: !state.drawerOpen }));
  };

  handleDrawerClose = () => {
    this.setState(() => ({ drawerOpen: false }));
  };

  componentWillMount() {
    this.unlistenRouterHistory = this.props.history.listen(
      (location, action) => {
        this.handleDrawerClose();
      }
    );
  }

  componentWillUnmount() {
    this.unlistenRouterHistory();
  }

  render() {
    const { classes, authUser, users, progress, children } = this.props;
    const { pathname } = this.props.history.location;

    return (
      <Fragment>
        <div
          className={classes.root}
          style={pathname === "/login" ? { filter: "blur(10px)" } : {}}
        >
          <AppBarLayout
            handleDrawerToggle={this.handleDrawerToggle}
            authUser={authUser}
            users={users}
          />
          <Hidden mdUp>
            <Drawer
              open={this.state.drawerOpen}
              classes={{ paper: classes.drawerPaper }}
              onClose={this.handleDrawerToggle}
            >
              <DrawerLayout authUser={authUser} pathname={pathname} />
            </Drawer>
          </Hidden>
          <Hidden smDown>
            <Drawer
              variant="permanent"
              open
              classes={{ paper: classes.drawerPaper }}
            >
              <DrawerLayout authUser={authUser} pathname={pathname} />
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
          <SnackbarLayout progress={progress} />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ authUser, users, progress }) {
  return {
    authUser,
    users,
    progress
  };
}

export default withRouter(
  compose(
    connect(mapStateToProps),
    withStyles(styles)
  )(Nav)
);
