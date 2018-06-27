import React from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'

const styles = theme => ({
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 1
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
    },
    title: {
        flex: 1,
        textDecoration: "none",
    }
})


function AppBarLayout(props) {
    const { classes, handleDrawerToggle, authUser } = props

    return (
        <AppBar position="static" className={classes.appBar} >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                className={classes.navIconHide}>
                <MenuIcon />
            </IconButton>
                <Typography variant="title" color="inherit" className={classes.title} component={Link} to="/">
                    Would you Rather App
                </Typography>
                {authUser 
                    ? <Button color="inherit" component={Link} to="/login">{authUser}</Button>
                    : <Button color="inherit" component={Link} to="/login">Login</Button>}
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(AppBarLayout)