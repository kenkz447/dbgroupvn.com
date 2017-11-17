import * as React from 'react'
import { Row, Col } from 'antd'

import { CreatePageWrap } from '../../../../shared/core'
import { WEBSITE_CONSTRUCTION_MASTER } from '../_shared'

import { ROUTE_NAME } from './keys'
import { ConnectedConstructionDetail } from './containers/ConstructionDetail'

@(CreatePageWrap({ pageKey: ROUTE_NAME, layoutType: WEBSITE_CONSTRUCTION_MASTER }))
class Page extends React.Component {
    render() {
        return (
            <div className="page">
                <ConnectedConstructionDetail />
            </div>
        )
    }
}

export default Page