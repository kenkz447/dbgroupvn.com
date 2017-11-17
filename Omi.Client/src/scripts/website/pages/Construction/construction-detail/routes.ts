import './style.scss'
import { ViewRoute } from '../../../../shared/core'

import Page from './Page'

import { WEBSITE_PAGE_CONSTRUCTION } from '../keys'
import { ROUTE_NAME } from './keys'

export const ConstructionDetailRoute: ViewRoute = {
    path: '/:constructionName',
    name: ROUTE_NAME,
    exact: true,
    component: Page,
    parent: WEBSITE_PAGE_CONSTRUCTION
}