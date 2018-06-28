import React, { Component, Fragment } from 'react'
import compose from 'recompose/compose'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import { answerQuestions } from './store/actions/questions'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
    questionPaper : {
        textAlign: 'center',
        paddingTop: '20px',
        paddingBottom: '20px'
    },
    typography : {
        padding: '5px'
    }
})

class Question extends Component {
    state = {
        redirect: false
    }

    componentWillMount () {
        const Qid = this.props.match.params.q
        const { questionsArray } = this.props
        const questionInfo = questionsArray.filter(({ id }) => id === Qid)[0]
        this.setState((prevState) => {
            return Object.assign(prevState, {
                questionInfo,
                optionOne: questionInfo.optionOne.text,
                optionTwo: questionInfo.optionTwo.text
            })
        })
    }

    handleClickedQuestion (option) {
        const { authUser } = this.props
        const { questionInfo } = this.state
        this.props.dispatch(answerQuestions(authUser, questionInfo.id, option))
        this.setState((prevState) => {
            return Object.assign(prevState, {redirect: true})
        })

    }

    render() {
        const { classes } = this.props

        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
        
        return (
            <Fragment>
                <Paper className={classes.questionPaper}>
                <Typography className={classes.typography}>WOULD YOU RATHER</Typography>
                <Button variant="contained" onClick={(e) => this.handleClickedQuestion('optionOne')}>
                {this.state.optionOne}
                </Button>
                <Typography className={classes.typography}>OR</Typography>
                <Button variant="contained" onClick={(e) => this.handleClickedQuestion('optionTwo')}>
                {this.state.optionTwo}?
                </Button>
                </Paper>
            </Fragment>   
        )
    }
}


function mapStateToProps({ questions, authUser }) {
    return {
        questionsArray: Object.values(questions),
        authUser
    }
  }

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(Question)