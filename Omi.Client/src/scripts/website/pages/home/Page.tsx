import './style.scss'

import * as React from 'react'

import { CreatePageWrap } from '../../../shared/core'
import { LAYOUT_COMMON } from '../../keys'
import { indexRouteName } from './keys'
import { ConnectedHomePageContent } from './containers/HomePageContent'

@(CreatePageWrap({ pageKey: indexRouteName, layoutType: LAYOUT_COMMON }))
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