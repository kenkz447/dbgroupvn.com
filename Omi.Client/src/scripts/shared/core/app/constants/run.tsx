import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { createAppContainer } from '../containers/AppContainer'

const renderAppContainer = (Container) => {
    ReactDOM.render(
        <AppContainer>
            <Container />
        </AppContainer>,
        document.getElementById('root')
    )
}

/**
 * Call to start showing your application
 * @param store Main store
 */
export default function (store, reducers) {
    const AppContainer = createAppContainer(store)
    renderAppContainer(AppContainer)
}