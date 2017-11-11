import { autobind } from 'core-decorators'

import concat = require('lodash/concat')
import merge = require('lodash/merge')
import map = require('lodash/map')

import { ViewRoute, CRModule } from '../../types'

import { createAppReducer, createAppStore } from '../state'
import { IConfigurationService } from '../interfaces'

import { AppInit } from '../constants'

export class ConfigurationService implements IConfigurationService {
    routes: Array<ViewRoute> = []
    sagaMiddleWares = []
    reducers = {}
    layouts = {}
    baseUrl = ''
    constructor() {

    }

    @autobind
    useModule(module: CRModule) {
        if(module.routes)
            this.routes = concat(this.routes, module.routes)
        
        if (module.middlewares)
            this.sagaMiddleWares = concat(this.sagaMiddleWares, module.middlewares.sagas)
        
        this.reducers = merge(this.reducers, module.reducers)
        this.layouts = merge(this.layouts, module.masterPages)
    }

    @autobind
    useModules(modules: Array<CRModule>) {
        map(modules, (module) => { this.useModule(module) })
    }

    @autobind
    createStore() {
        const reducer = createAppReducer(this.reducers)
        const store = createAppStore(this.sagaMiddleWares, reducer)
        return store
    }
    
    @autobind
    appInit() {
        AppInit(this)
    }
}