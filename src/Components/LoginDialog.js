import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'

import { setAuthUser } from './store/actions/authUser'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import PersonIcon from '@material-ui/icons/Person'
import CircularProgress from '@material-ui/core/CircularProgress'


const styles = {}


class LoginDialog extends Component {

    state = {
        close: false
    }

    handleDialogClose = (event) => {
        this.setState((prevState) => {
            return Object.assign(prevState, {close: true})
        })
    }

    handleUserSelect = value => {
        this.props.dispatch(setAuthUser(Object.values(value)[0]))
        this.setState((prevState) => {
            return Object.assign(prevState, {close: true})
        })
      }

    handleUserLogout () {
        this.props.dispatch(setAuthUser(null))
        this.setState((prevState) => {
            return Object.assign(prevState, {close: true})
        })
    }

    

    mapUsers (users) {
        console.log("login props", this.props)
        console.log("from", this.props.location.from)
        const { authUser } = this.props

        if (users === undefined || users.length === 0) {
            return <div style={{margin: 'auto', position: 'relative', width: '20%'}}><CircularProgress /></div>
        }

        return (
            <Fragment>
            {users.map(((user) =>
                <ListItem button onClick={() => this.handleUserSelect({user})} key={user}>
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                    <ListItemText primary={user} />
                </ListItem>
                 ))}
                 {authUser && 
                 <ListItem button onClick={() => this.handleUserLogout()} key='logout'>
                    <ListItemText primary="Logout" style={{textAlign: 'center'}}/>
                 </ListItem>}
            </Fragment>
        )
    }

    render() {
        const { users , authUser } = this.props
        const from = this.props.location.from

        if (this.state.close === true) {
            if (from !== undefined) {
                return <Redirect to={from} />
            }
            return <Redirect to='/' />
          }

        return (
            <Fragment>
                <Dialog open onClose={this.handleDialogClose}>
                    <DialogTitle>{!authUser ? "Please select a user" : "Change user or logout"}</DialogTitle>
                    <div>
                    <List>
                        {this.mapUsers(users)}
                    </List>
                    </div>
                </Dialog>
            </Fragment>
        )
    }
}

function mapStateToProps({ authUser, users }) {
    return {
        authUser,
        users: Object.keys(users)
    }
  }

export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(LoginDialog)
