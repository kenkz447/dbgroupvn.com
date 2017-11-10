import { initRoutes } from '../../router'
import { initMenu, extractMenuFormRoutes } from '../../menu'

import { IConfigurationService } from '../interfaces'

import { initLayout } from '../../layout'
import { completeRouteData } from '../../router/helpers/'

export const AppInit = (configuration: IConfigurationService) => {
    const { createStore, routes, reducers, layouts } = configuration

    initLayout(layouts)

    // Complementary routes data
    completeRouteData(routes)
    
    const store = createStore()

    // Initial routes
    store.dispatch(initRoutes(routes))

    // Initial menu
    const menuCollection = extractMenuFormRoutes(routes)
    store.dispatch(initMenu(menuCollection))

    // Render your app when all done
    require('./run')['default'](store, reducers)
}