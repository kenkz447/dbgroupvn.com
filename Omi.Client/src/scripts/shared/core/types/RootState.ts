import { Reducer } from 'redux'
import { RouterState } from 'react-router-redux'
import { List, Map } from 'immutable'

export interface ReducerRootState {
    router
    routes
    menus
    layout
    page
    data
    temp
}

export interface RootState extends ReducerRootState {
    router: {
        location: any
    }
    routes: Map<string, any>
    menus: List<Map<any, any>>
    layout: Map<string, any>
    page: Map<string, any>
    data: Map<string, any>
    temp: Map<string, any>
}