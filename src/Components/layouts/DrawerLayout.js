import React from 'react'

import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'

const DrawerLayout = ({classes, authUser}) => (
    <div>
        <Hidden smDown>
        <div className={classes.toolbar} />
        </Hidden>
        <MenuList>
            <MenuItem selected={true} ><Typography>Item 1</Typography></MenuItem>
            <MenuItem><Typography>Item 2</Typography></MenuItem>
        </MenuList>
        <Divider />
        <MenuList>
            <MenuItem><Typography>Item 1</Typography></MenuItem>
        </MenuList>
        {authUser && <div><Typography align='center'>Logged in as {authUser}</Typography></div>}
      </div>
)

export default DrawerLayout