import React, { Component, Fragment } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { handleAnswerQuestion } from "./store/actions/questions";
import Error404 from "./404";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const styles = theme => ({
  questionPaper: {
    textAlign: "center",
    paddingTop: "20px",
    paddingBottom: "20px"
  },
  typography: {
    padding: "5px"
  },
  infoPaper: {
    textAlign: "center",
    paddingTop: "20px",
    paddingBottom: "20px",
    marginTop: "20px"
  },
  author: {
    padding: "10px"
  }
});

class Question extends Component {
  state = {
    questionInfo: null,
    showAnswerInfo: false,
    currentUserChoice: null,
    invalidQid: false
  };

  componentWillMount() {
    const Qid = this.props.match.params.q;
    const { questionsArray, authUser } = this.props;
    console.log();

    const questionInfo = questionsArray.filter(({ id }) => id === Qid)[0];
    if (questionInfo) {
      const showAnswerInfo =
        questionInfo.optionOne.votes.includes(authUser) ||
        questionInfo.optionTwo.votes.includes(authUser);
      const currentUserChoice = !showAnswerInfo
        ? null
        : questionInfo.optionOne.votes.includes(authUser)
          ? "optionOne"
          : "optionTwo";

      this.setState(prevState => {
        return Object.assign(prevState, {
          questionInfo,
          showAnswerInfo,
          currentUserChoice
        });
      });
    } else {
      this.setState({ invalidQid: true });
    }
  }

  handleClickedQuestion(option) {
    const { authUser } = this.props;
    const { questionInfo } = this.state;
    this.props.dispatch(handleAnswerQuestion(authUser, questionInfo.id, option));
    this.setState(prevState => {
      return Object.assign(prevState, {
        showAnswerInfo: true,
        currentUserChoice: option
      });
    });
  }

  handleUserAvatar(user) {
    const { users } = this.props;
    return users[user]["avatarURL"];
  }

  percentagePicked() {
    const { questionInfo, currentUserChoice } = this.state;
    const totalVotes =
      questionInfo.optionOne.votes.length + questionInfo.optionTwo.votes.length;
    const percentage =
      (questionInfo[currentUserChoice].votes.length / totalVotes) * 100;
    return percentage % 1 === 0 ? percentage : percentage.toFixed(2);
  }

  render() {
    const { classes } = this.props;
    const {
      questionInfo,
      showAnswerInfo,
      currentUserChoice,
      invalidQid
    } = this.state;

    if (invalidQid) {
      return <Error404 message404="This Question ID doesn't exist" />;
    }

    return (
      <Fragment>
        <Paper>
          <ListItem key={questionInfo.author} className={classes.author}>
            <ListItemAvatar>
              <Avatar
                alt={questionInfo.author}
                src={this.handleUserAvatar(questionInfo.author)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={questionInfo.author}
              secondary="Question author"
            />
          </ListItem>
        </Paper>
        <Paper className={classes.questionPaper}>
          <Typography className={classes.typography}>
            WOULD YOU RATHER
          </Typography>
          <Button
            variant="contained"
            onClick={e => this.handleClickedQuestion("optionOne")}
            color={currentUserChoice === "optionOne" ? "primary" : "default"}
          >
            {questionInfo.optionOne.text}
          </Button>
          <Typography className={classes.typography}>OR</Typography>
          <Button
            variant="contained"
            onClick={e => this.handleClickedQuestion("optionTwo")}
            color={currentUserChoice === "optionTwo" ? "primary" : "default"}
          >
            {questionInfo.optionTwo.text}
          </Button>
        </Paper>
        {showAnswerInfo && (
          <Paper className={classes.infoPaper}>
            <Typography variant="title">Answer</Typography>
            <br />
            <Typography>
              You Picked <strong>{questionInfo[currentUserChoice].text}</strong>
            </Typography>
            <Typography>
              <strong>{this.percentagePicked()}%</strong> of the users picked
              the same answer
            </Typography>
            <Typography>
              <strong>{questionInfo[currentUserChoice].votes.length}</strong>{" "}
              Users picked the same
            </Typography>
          </Paper>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ questions, authUser, users }) {
  return {
    questionsArray: Object.values(questions),
    authUser,
    users
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Question);
