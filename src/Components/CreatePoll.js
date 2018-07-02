import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

const styles = theme => ({
  container: {},
  title: {
    textAlign: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class CreatePoll extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Card className={classes.container}>
          <CardContent>
            <Typography variant="headline" className={classes.title}>
              Create Poll
            </Typography>
            <TextField
              label="Question 1"
              className={classes.textField}
              margin="normal"
              helperText=""
              fullWidth
            />
            <TextField
              label="Question 2"
              className={classes.textField}
              margin="normal"
              helperText=""
              fullWidth
            />
          </CardContent>

          <CardActions>
            <Button fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </CardActions>
        </Card>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CreatePoll);
