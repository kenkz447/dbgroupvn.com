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
                <div className="mb-4">
                    <div className="mb-3">
                        <img className="d-block mw-100 w-100" src="/src/images/construction-banner.png" />
                    </div>
                    <h1 className="text-uppercase">Construction</h1>
                </div>
                <ConstructionList />
            </div>
        )
    }
}

export default Page