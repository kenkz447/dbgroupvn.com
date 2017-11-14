import * as React from 'react'
import { Row, Col } from 'antd'

import { CreatePageWrap } from '../../../../shared/core'

import { WEBSITE_CONSTRUCTION_MASTER } from '../_shared'

import { ROUTE_NAME } from './keys'
import { ConstructionList } from './containers/ConstructionList'

@(CreatePageWrap({ pageKey: ROUTE_NAME, layoutType: WEBSITE_CONSTRUCTION_MASTER }))
class Page extends React.Component {
    render() {
        return (
            <div className="page">
                <ConstructionList />
            </div>
        )
    }
}

export default Page