import React, { Fragment } from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


const Error404 = (props) => (
    <Fragment>
        {console.log(props)}
        <Paper>
            <Typography variant='title' style={{padding: '20px', textAlign: 'center'}}>404</Typography>
            <Typography style={{padding: '20px', textAlign: 'center'}}>{props.message404}</Typography>
        </Paper>
    </Fragment>
)

export default Error404