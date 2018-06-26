import { _getUsers } from '../../../_DATA'
import { receiveUsers } from './users'

function getInitialData() {
    return Promise.all([_getUsers()]);
}

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(([ users ]) => {
                dispatch(receiveUsers(users))
            })
    }
}