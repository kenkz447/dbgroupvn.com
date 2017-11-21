import './style.scss'

import { ViewRoute } from '../../../shared/core'
import { WEBSITE_PAGE_CONSTRUCTION } from './keys'
import { ConstructionIndexRoute } from './construction-index'
import { ConstructionDetailRoute } from './construction-detail'

const Construction: ViewRoute = {
    path: '/construction',
    name: WEBSITE_PAGE_CONSTRUCTION,
}

export const ConstructionRoutes = [
    Construction,
    ConstructionIndexRoute,
    ConstructionDetailRoute
]