import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'


function TabContainer(props) {
    const { displayquestions } = props
    console.log('displayquestions', displayquestions)

    const mergeOptions = (question) => (
            "Would you rather " + 
            question.optionOne.text + 
            " or " + 
            question.optionTwo.text + 
            "?"
        )

    return (
        <MenuList>
            {displayquestions.map((question) => 
                <MenuItem key={question.id}>
                    <ListItemText 
                    primary={mergeOptions(question)} 
                    secondary={"author " + question.author} />
                </MenuItem>
            )}
        </MenuList>
    )
}



class Home extends Component {
    state = { 
        tabValue: 0
    }

    handleTabChange = (event, tabValue) => {
        this.setState((prevState) => {
            return Object.assign(prevState, {tabValue})
        })
    }


    render() {
        const { tabValue } = this.state 
        const { unanswered, answered } = this.props

        return (
            <Fragment>
                <Paper>
                    <Tabs 
                    centered fullWidth
                    value={tabValue} 
                    onChange={this.handleTabChange} 
                    indicatorColor="primary">
                        <Tab label="Unanswered"/>
                        <Tab label="Answered" />
                    </Tabs>
                </Paper>
                <Paper style={{marginTop: '20px' }}>
                {tabValue === 0 && <TabContainer displayquestions={unanswered} />}
                {tabValue === 1 && <TabContainer displayquestions={answered} />}
                </Paper>
            </Fragment>
        )
    }
}

function mapStateToProps({ authUser, users, questions }) {
    const answers = Object.keys(users[authUser].answers)
    const answered = answers.map((id) => questions[id]).sort((a,b) => b.timestamp - a.timestamp)
    const unanswered = Object.keys(questions)
        .filter((id) => !answers.includes(id))
        .map((id) => questions[id])
        .sort((a,b) => b.timestamp - a.timestamp)
    return {
        answered,
        unanswered
    }
  }

export default connect(mapStateToProps)(Home)