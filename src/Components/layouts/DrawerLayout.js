import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'

const styles = theme => ({
    toolbar: theme.mixins.toolbar
})

const DrawerLayout = ({classes, authUser }) => (
    <div>
        <Hidden smDown>
        <div className={classes.toolbar} />
        </Hidden>
        <MenuList>
            <MenuItem selected={true} component={Link} to='/'>
                <Typography>Home</Typography>
            </MenuItem>
            <MenuItem component={Link} to='/leaderboard'>
                <Typography>LeaderBoard</Typography>
            </MenuItem>
            <MenuItem component={Link} to='/createpoll'>
                <Typography>Create Poll</Typography>
            </MenuItem>
        </MenuList>
        {authUser && <div><Typography align='center'>Logged in as {authUser}</Typography></div>}
      </div>
)

export default withStyles(styles)(DrawerLayout)