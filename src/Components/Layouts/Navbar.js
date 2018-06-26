import React, { Component } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


const styles = {
    root: {
      flexGrow: 1,
    },
    title: {
        flex: 1,
        textDecoration: "none",
    }
}


class Navbar extends Component {

    render() {
        const { classes, authUser } = this.props
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.title} component={Link} to="/">
                            Would you Rather App
                        </Typography>
                        {authUser 
                            ? <Button color="inherit" component={Link} to="/login">{authUser}</Button>
                            : <Button color="inherit" component={Link} to="/login">Login</Button>}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

function mapStateToProps({ authUser }) {
    return {
        authUser
    }
}


export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(Navbar)