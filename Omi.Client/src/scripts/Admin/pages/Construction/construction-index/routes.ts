import { ViewRoute } from '../../../../shared/core'

import { CONSTRUCTION_INDEX, CONSTRUCTION, CONSTRUCTION_MENU_SIDER, MENU_HEADER } from '../../../keys'

import PageComponent from './Page'

export const ConstructionIndex: ViewRoute = {
    name: CONSTRUCTION_INDEX,
    exact: true,
    parent: CONSTRUCTION,
    component: PageComponent,
    menus: [{
        menuName: MENU_HEADER,
        label: 'Construction',
        exact: false
    }, {
        menuName: CONSTRUCTION_MENU_SIDER,
        label: 'Construction',
    }]
}