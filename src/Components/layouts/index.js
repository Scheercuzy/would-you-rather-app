import React, { Component } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import DrawerLayout from './DrawerLayout'
import AppBarLayout from './AppBarLayout'

import Drawer from '@material-ui/core/Drawer'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Hidden from '@material-ui/core/Hidden'


const drawerWidth = 240
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

const styles = theme => ({
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%'
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
          },
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
    }
})


class Nav extends Component {
    state = {
        drawerOpen: false
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ drawerOpen: !state.drawerOpen }));
      }

    render() {
        const { classes, authUser, children } = this.props
        return (
            <div className={classes.root}>
                <AppBarLayout handleDrawerToggle={this.handleDrawerToggle} authUser={authUser} />
                <Hidden mdUp>
                    <SwipeableDrawer 
                    open={this.state.drawerOpen} 
                    classes={{paper: classes.drawerPaper}} 
                    onClose={this.handleDrawerToggle} 
                    onOpen={this.handleDrawerToggle}
                    disableBackdropTransition={!iOS} 
                    disableDiscovery={iOS}>
                        <DrawerLayout classes={classes} />
                    </SwipeableDrawer>
                </Hidden>
                <Hidden smDown>
                    <Drawer variant="permanent" open classes={{paper: classes.drawerPaper}}>
                        <DrawerLayout classes={classes}/>
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
            </div>
        )
    }
}

function mapStateToProps({ authUser }) {
    return {
        authUser
    }
}


export default withRouter(compose(
    connect(mapStateToProps),
    withStyles(styles)
)(Nav))
