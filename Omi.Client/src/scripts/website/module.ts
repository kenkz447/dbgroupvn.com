import './style.scss'

import { CRModule } from '../shared/core'

import { LAYOUT_COMMON } from './keys'

import {
    HomeRoute,
    ConstructionRoutes,

    WEBSITE_CONSTRUCTION_MASTER,
    ConstructionMaster
} from './pages'

import { MainMaster } from './layout'

export const Module: CRModule = {
    routes: [HomeRoute, ...ConstructionRoutes],
    masterPages: {
        [LAYOUT_COMMON]: MainMaster,
        [WEBSITE_CONSTRUCTION_MASTER]: ConstructionMaster
    }
}