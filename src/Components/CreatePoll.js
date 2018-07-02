import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";

import { handleAddQuestion } from "./store/actions/questions";

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
  state = {
    optionOne: null,
    optionTwo: null,
    submitted: false
  };

  handleChange(option, e) {
    this.setState({
      [option]: e.target.value
    });
  }

  handleSubmitPoll = () => {
    const { optionOne, optionTwo } = this.state;
    const { authUser } = this.props;
    this.props.dispatch(
      handleAddQuestion({
        author: authUser,
        optionOneText: optionOne,
        optionTwoText: optionTwo
      })
    );
    this.setState({ submitted: true });
  };

  render() {
    const { classes } = this.props;
    const { submitted } = this.state;

    if (submitted) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <Card className={classes.container}>
          <CardContent>
            <Typography variant="headline" className={classes.title}>
              Create Poll
            </Typography>
            <br />
            <Typography variant="title" className={classes.title}>
              Would You Rather
            </Typography>
            <TextField
              label="Question 1"
              className={classes.textField}
              margin="normal"
              helperText=""
              fullWidth
              onChange={e => {
                this.handleChange("optionOne", e);
              }}
            />
            <TextField
              label="Question 2"
              className={classes.textField}
              margin="normal"
              helperText=""
              fullWidth
              onChange={e => {
                this.handleChange("optionTwo", e);
              }}
            />
          </CardContent>

          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleSubmitPoll}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </Fragment>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(CreatePoll);
