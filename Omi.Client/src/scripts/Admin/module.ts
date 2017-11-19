import './style.scss'

import { CRModule } from '../shared/core'

import { AdminRoute, HomeSettingRoute, ConstructionRoutes } from './pages'

import { BaseMaster, ConstructionMaster } from './layout'

import { ADMIN_BASE_MASTER, CONSTRUCTION_MASTER } from './keys'
export const Module: CRModule = {
    routes: [AdminRoute, HomeSettingRoute, ...ConstructionRoutes],
    masterPages: {
        [ADMIN_BASE_MASTER]: BaseMaster,
        [CONSTRUCTION_MASTER]: ConstructionMaster
    }
}