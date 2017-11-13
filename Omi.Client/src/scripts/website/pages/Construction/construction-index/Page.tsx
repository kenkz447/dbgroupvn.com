import * as React from 'react'
import { Row, Col } from 'antd'

import { CreatePageWrap } from '../../../../shared/core'
import { LAYOUT_COMMON } from '../../../keys'

import { ROUTE_NAME } from './keys'

import { ConstructionList } from './containers/ConstructionList'
import { ConnectedConstructionTypeLists } from './containers/ConstructionTypeLists'

@(CreatePageWrap({ pageKey: ROUTE_NAME, layoutType: LAYOUT_COMMON }))
class Page extends React.Component {
    render() {
        return (
            <div className="page">
                <div className="brand-container">
                    <Row gutter={30}>
                        <Col span={5}>
                            <ConnectedConstructionTypeLists />
                        </Col>
                        <Col span={19}>
                            <ConstructionList />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Page