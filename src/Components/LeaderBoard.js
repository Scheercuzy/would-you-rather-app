import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const styles = theme => ({
  title: {
    textAlign: "center",
    padding: "20px",
    marginBottom: "20px"
  },
  listPaper: {
    margin: "5px"
  }
});

const LeaderBoard = ({ classes, usersArray }) => {
  return (
    <Fragment>
      <Paper>
        <Typography variant="headline" className={classes.title}>
          LeaderBoard
        </Typography>
      </Paper>

      {usersArray.map(
        ({ username, avatarURL, totalQuestions, totalAnswers }) => {
          const boardInfo = `has answered ${totalQuestions} questions and is the author of ${totalAnswers} questions`;
          return (
            <Paper className={classes.listPaper} key={username}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={username} src={avatarURL} />
                  </ListItemAvatar>
                  <ListItemText primary={username} secondary={boardInfo} />
                </ListItem>
              </List>
            </Paper>
          );
        }
      )}
    </Fragment>
  );
};

function mapStateToProps({ users, questions }) {
  const usersArray = Object.keys(users)
    .map(username => {
      const userObject = users[username];
      return {
        username: userObject.id,
        avatarURL: userObject.avatarURL,
        totalQuestions: Object.keys(userObject.answers).length,
        totalAnswers: Object.keys(userObject.questions).length
      };
    })
    .sort(
      (a, b) =>
        b.totalQuestions + b.totalAnswers - (a.totalQuestions + a.totalAnswers)
    );
  return {
    usersArray
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(LeaderBoard);
