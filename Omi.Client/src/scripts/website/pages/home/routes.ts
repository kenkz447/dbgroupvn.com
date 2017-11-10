import { ViewRoute } from '../../../shared/core'

import IndexComponent from './MainView'

import { indexRouteName } from './keys'

export const homeRoute: ViewRoute = {
    path: '/',
    name: indexRouteName,
    exact: true,
    component: IndexComponent
}