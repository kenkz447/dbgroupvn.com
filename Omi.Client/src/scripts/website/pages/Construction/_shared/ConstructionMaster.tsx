import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Row, Col, Menu, Icon } from 'antd'

import { MasterHeader, MasterFooter } from '../../../layout'
import { ConnectedConstructionTypeLists } from './ConstructionTypeLists'

const { Content } = Layout
export const WEBSITE_CONSTRUCTION_MASTER = "WEBSITE@LAYOUT_CONSTRUCTION_MASTER"
export const ConstructionMaster = (props: React.HTMLProps<any>) => {
    return (
        <Layout className="brand-layout">
            <MasterHeader />
            <Content className="mb-5">
                <div className="brand-container">
                    <Row gutter={50}>
                        <Col span={5}>
                            <ConnectedConstructionTypeLists />
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