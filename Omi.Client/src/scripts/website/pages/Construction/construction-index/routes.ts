import './style.scss'

import { ViewRoute } from '../../../../shared/core'

import { WEBSITE_PAGE_CONSTRUCTION } from '../keys'
import { ROUTE_NAME } from './keys'
import Page from './Page'

export const ConstructionIndexRoute: ViewRoute = {
    name: ROUTE_NAME,
    exact: true,
    component: Page,
    parent: WEBSITE_PAGE_CONSTRUCTION
}