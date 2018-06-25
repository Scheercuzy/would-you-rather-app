import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


class Navbar extends Component {
    state = {  }
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit" >
                        Would you Rather App
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar