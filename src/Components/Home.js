import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  menuitem: {
    whiteSpace: "normal",
    height: "auto"
  },
  answerdisplay: {
    marginTop: "20px"
  }
});

const TabContainerS = withStyles(styles)(TabContainer);

function TabContainer(props) {
  const { displayquestions, classes } = props;

  const mergeOptions = question =>
    `Would you rather ${question.optionOne.text} or ${
      question.optionTwo.text
    }?`;

  if (displayquestions.length === 0) {
    return (
      <List>
        <ListItem>
          <ListItemText primary="Concrats! You've answered all the questions!" />
        </ListItem>
      </List>
    );
  } else {
    return (
      <MenuList>
        {displayquestions.map(question => (
          <MenuItem
            key={question.id}
            className={classes.menuitem}
            component={Link}
            to={"/question/" + question.id}
          >
            <ListItemText
              primary={mergeOptions(question)}
              secondary={"author " + question.author}
            />
          </MenuItem>
        ))}
      </MenuList>
    );
  }
}

class Home extends Component {
  state = {
    tabValue: 0
  };

  handleTabChange = (event, tabValue) => {
    this.setState(prevState => {
      return Object.assign(prevState, { tabValue });
    });
  };

  render() {
    const { tabValue } = this.state;
    const { unanswered, answered, classes } = this.props;

    return (
      <Fragment>
        <Paper>
          <Tabs
            centered
            fullWidth
            value={tabValue}
            onChange={this.handleTabChange}
            indicatorColor="primary"
          >
            <Tab label="Unanswered" />
            <Tab label="Answered" />
          </Tabs>
        </Paper>
        <Paper className={classes.answerdisplay}>
          {tabValue === 0 && <TabContainerS displayquestions={unanswered} />}
          {tabValue === 1 && <TabContainerS displayquestions={answered} />}
        </Paper>
      </Fragment>
    );
  }
}

function mapStateToProps({ authUser, users, questions }) {
  const answers = Object.keys(users[authUser].answers);
  const answered = answers
    .map(id => questions[id])
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.keys(questions)
    .filter(id => !answers.includes(id))
    .map(id => questions[id])
    .sort((a, b) => b.timestamp - a.timestamp);
  return {
    answered,
    unanswered
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Home);
