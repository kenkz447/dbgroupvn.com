import { ViewRoute } from '../../../../shared/core'

import { CONSTRUCTION_NEW, CONSTRUCTION, CONSTRUCTION_MENU_SIDER } from '../../../keys'

import PageComponent from './Page'

export const ConstructionNew: ViewRoute = {
    path: '/new',
    name: CONSTRUCTION_NEW,
    exact: true,
    parent: CONSTRUCTION,
    component: PageComponent,
    menus: [{
        menuName: CONSTRUCTION_MENU_SIDER,
        label: 'Create a new',
    }]
}