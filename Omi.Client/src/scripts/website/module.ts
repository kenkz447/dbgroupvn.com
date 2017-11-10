import './style.scss'

import { CRModule } from '../shared/core'

import { LAYOUT_COMMON } from './keys'

import {
    homeRoute as Home
} from './pages'

import { MainMaster } from './layout'

export const Module: CRModule = {
    routes: [Home],
    layouts: {
        [LAYOUT_COMMON]: MainMaster
    }
}