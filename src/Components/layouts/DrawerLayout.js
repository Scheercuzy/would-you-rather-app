import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  createdBy: {
    position: "absolute",
    bottom: "5vh"
  }
});

function DrawerLayout(props) {
  const { classes, authUser, pathname } = props;

  return (
    <div>
      <Hidden smDown>
        <div className={classes.toolbar} />
      </Hidden>
      <MenuList>
        <MenuItem selected={pathname === "/"} component={Link} to="/">
          <Typography>Home</Typography>
        </MenuItem>
        <MenuItem
          selected={pathname === "/leaderboard"}
          component={Link}
          to="/leaderboard"
        >
          <Typography>LeaderBoard</Typography>
        </MenuItem>
        <MenuItem selected={pathname === "/add"} component={Link} to="/add">
          <Typography>Create Poll</Typography>
        </MenuItem>
      </MenuList>
      {authUser && (
        <div>
          <Typography variant="caption" align="center">
            Logged in as {authUser}
          </Typography>
        </div>
      )}
      <br />
      <Typography
        variant="caption"
        align="center"
        className={classes.createdBy}
      >
        Would You Rather ©2018 Created by Maxence Scheercousse
      </Typography>
    </div>
  );
}

export default withStyles(styles)(DrawerLayout);
