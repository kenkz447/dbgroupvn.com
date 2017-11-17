import { ViewRoute } from '../../types/ViewRoute'
import { Store } from '../../types'

import { LayoutCollection } from '../../layout'

export interface IConfigurationService {
    baseUrl: string
    routes: Array<ViewRoute>
    reducers: any
    layouts: LayoutCollection
    createStore: () => Store
}