import './style.scss'

import { CRModule } from '../shared/core'

import { LAYOUT_COMMON } from './keys'

import {
    HomeRoute,
    ConstructionRoutes
} from './pages'

import { MainMaster } from './layout'

export const Module: CRModule = {
    routes: [HomeRoute, ...ConstructionRoutes],
    masterPages: {
        [LAYOUT_COMMON]: MainMaster
    }
}