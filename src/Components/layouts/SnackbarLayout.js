import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import InfoIcon from "@material-ui/icons/Info";

const styles = theme => ({
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: "10px"
  }
});

function SnackbarLayout(props) {
  const { classes, progress } = props;
  const { saving } = progress;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={10}
      open={saving}
    >
      <SnackbarContent
        message={
          <span className={classes.message}>
            <InfoIcon className={classes.icon} />
            Saving...
          </span>
        }
      />
    </Snackbar>
  );
}

export default withStyles(styles)(SnackbarLayout);
