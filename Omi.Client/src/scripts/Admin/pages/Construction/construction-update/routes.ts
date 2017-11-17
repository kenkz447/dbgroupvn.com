import { ViewRoute } from '../../../../shared/core'

import { CONSTRUCTION_UPDATE, CONSTRUCTION } from '../../../keys'

import PageComponent from './Page'

export const ConstructionUpdate: ViewRoute = {
    path: '/update',
    name: CONSTRUCTION_UPDATE,
    exact: true,
    parent: CONSTRUCTION,
    component: PageComponent,
}