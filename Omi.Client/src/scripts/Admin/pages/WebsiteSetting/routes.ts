import { ViewRoute } from '../../../shared/core'
import { ADMIN_ROUTE_NAME, MENU_HEADER } from '../../keys'
import Page from './Page'

export const WebsiteSettingRoute: ViewRoute = {
    path: '/website-setting',
    name: 'ADMIN@ROUTE_WEBSITE_SETTING',
    exact: true,
    component: Page,
    parent: ADMIN_ROUTE_NAME,
    menus: [
        {
            menuName: MENU_HEADER,
            label: "Website setting"
        }
    ]
}