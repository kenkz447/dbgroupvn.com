import './style.scss'

import { CRModule } from '../shared/core'

import { MAIN_MASTER } from './keys'
import { supportedLanguage } from './settings'
import {
    HomeRoute,
    ConstructionRoutes,
    ContactRoute,
    WEBSITE_CONSTRUCTION_MASTER,
    ConstructionMaster
} from './pages'

import { MainMaster } from './layout'

export const Module: CRModule = {
    routes: [HomeRoute, ContactRoute, ...ConstructionRoutes],
    masterPages: {
        [MAIN_MASTER]: MainMaster,
        [WEBSITE_CONSTRUCTION_MASTER]: ConstructionMaster
    },
    supportedLanguage
}