import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { reducer as routes } from '../../router'

import { ReducerRootState } from '../../types'
import { reducer as menus } from '../../menu'
import { reducer as layout} from '../../layout'
import { reducer as page} from '../../page'
import { reducer as data} from '../../data'
import { reducer as temp} from '../../tempValue'

const appReducer: ReducerRootState = {
    router: routerReducer,
    routes,
    menus,
    layout,
    page,
    data,
    temp
}

export function createAppReducer(reducers) {
    return combineReducers({
        ...appReducer,
        ...reducers
    })
}