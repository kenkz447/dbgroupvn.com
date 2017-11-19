import './style.scss'

import { CRModule } from '../shared/core'

import { MAIN_MASTER } from './keys'

import {
    HomeRoute,
    ConstructionRoutes,
    ContactRoute,
    WEBSITE_CONSTRUCTION_MASTER,
    ConstructionMaster
} from './pages'

import { ConnectedMainMaster } from './layout'

export const Module: CRModule = {
    routes: [HomeRoute, ContactRoute,  ...ConstructionRoutes],
    masterPages: {
        [MAIN_MASTER]: ConnectedMainMaster,
        [WEBSITE_CONSTRUCTION_MASTER]: ConstructionMaster
    }
}