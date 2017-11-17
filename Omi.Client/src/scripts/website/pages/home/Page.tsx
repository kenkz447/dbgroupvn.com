import './style.scss'

import * as React from 'react'

import { CreatePageWrap } from '../../../shared/core'
import { MAIN_MASTER } from '../../keys'
import { ROUTE_NAME } from './keys'
import { ConnectedHomePageContent } from './containers/HomePageContent'

@(CreatePageWrap({ pageKey: ROUTE_NAME, layoutType: MAIN_MASTER }))
class Index extends React.Component {
    render() {
        return (
            <div className="home">
                <ConnectedHomePageContent />
            </div>
        )
    }
}

export default Index 