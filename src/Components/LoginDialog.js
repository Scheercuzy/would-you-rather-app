import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'


class LoginDialog extends Component {
    state = {
        close: false
    }

    handleDialogClose = (event) => {
        this.setState({
            close: true
        })
    }

    handleUserSelect = value => {
        console.log(value)
        this.setState({
            close: true
        })
      }

    render() {
        if (this.state.close === true) {
            return <Redirect to='/' />
          }

        return (
            <Fragment>
                <Dialog open onClose={this.handleDialogClose}>
                    <DialogTitle>Please select a user</DialogTitle>
                    <div>
                    <List>
                        <ListItem button onClick={() => this.handleUserSelect("id")} key="id">
                            <ListItemText primary="User1" />
                        </ListItem>
                    </List>
                    </div>
                </Dialog>
            </Fragment>
        )
    }
}

export default LoginDialog;