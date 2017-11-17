import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Row, Col, Menu, Icon } from 'antd'

import { MasterHeader, MasterFooter } from '../../../layout'
import { ConnectedConstructionTypeLists } from './ConstructionTypeLists'
import { ConnectedConstructionStatusList } from './ConstructionStatusList'

const { Content } = Layout
export const WEBSITE_CONSTRUCTION_MASTER = "WEBSITE@LAYOUT_CONSTRUCTION_MASTER"
export const ConstructionMaster = (props: React.HTMLProps<any>) => {
    return (
        <Layout className="brand brand-layout">
            <MasterHeader />
            <Content className="mb-5">
                <div className="brand-container">
                    <Row gutter={50}>
                        <Col span={5}>
                            <div className="mb-5">
                                <ConnectedConstructionTypeLists />
                            </div>
                            <ConnectedConstructionStatusList />
                        </Col>
                        <Col span={19}>
                            {props.children}
                        </Col>
                    </Row>
                </div>
            </Content>
            <MasterFooter />
        </Layout>
    )
}