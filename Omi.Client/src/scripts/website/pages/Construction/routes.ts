import { ViewRoute } from '../../../shared/core'

import { ConstructionIndexRoute } from './construction-index'
//import { ConstructionDetail } from './construction-detail'

const Construction: ViewRoute = {
    path: '/construction',
    name: 'WEBSITE@PAGE_CONSTRUCTION',
}

export const ConstructionRoutes = [
    Construction,
    ConstructionIndexRoute,
    //ConstructionDetail
]