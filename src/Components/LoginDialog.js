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
import CircularProgress from '@material-ui/core/CircularProgress'


const styles = theme => ({})


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
    
    handleUserAvatar(user) {
        const { users } = this.props
        return users[user]['avatarURL']
    }
    

    mapUsersList (userslist) {
        const { authUser } = this.props

        if (userslist === undefined || userslist.length === 0) {
            return <div style={{margin: 'auto', position: 'relative', width: '20%'}}><CircularProgress /></div>
        }

        return (
            <Fragment>
            {userslist.map(((user) =>
                <ListItem button onClick={() => this.handleUserSelect({user})} key={user}>
                <ListItemAvatar>
                    <Avatar alt={user} src={this.handleUserAvatar(user)}/>
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
        const { users, authUser } = this.props
        const userslist = Object.keys(users)
        const from = this.props.location.from
        console.log(from)

        if (this.state.close === true) {
            if (from !== undefined && authUser) {
                return <Redirect to={from} />
            }
            return <Redirect to='/' />
          }

        return (
            <Fragment>
                <Dialog open onClose={this.handleDialogClose}>
                    <DialogTitle>{!authUser ? "Please select a User" : "Change User or Logout"}</DialogTitle>
                    <div>
                    <List>
                        {this.mapUsersList(userslist)}
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
        users
    }
  }

export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(LoginDialog)
