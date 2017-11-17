import { ViewRoute } from '../../../shared/core'
import { AdminRoute } from '../routes'

import { CONSTRUCTION } from '../../keys'

import { ConstructionNew } from './construction-new'
import { ConstructionIndex } from './construction-index'
import { ConstructionUpdate } from './construction-update'

export const Construction: ViewRoute = {
    path: '/construction',
    name: CONSTRUCTION,
    parent: AdminRoute.name
}

export const ConstructionRoutes = [
    Construction,
    ConstructionIndex,
    ConstructionNew,
    ConstructionUpdate
]