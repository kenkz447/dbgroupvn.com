import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Row, Col, Menu, Icon } from 'antd'

import { MasterHeader, MasterFooter, ConnectedMasterWrapper } from '../../../layout'
import { ConnectedConstructionTypeLists } from './ConstructionTypeLists'
import { ConnectedConstructionStatusList } from './ConstructionStatusList'

const { Content } = Layout
export const WEBSITE_CONSTRUCTION_MASTER = "WEBSITE@LAYOUT_CONSTRUCTION_MASTER"
export const ConstructionMaster = (props: React.HTMLProps<any>) => {
    return (
        <ConnectedMasterWrapper>
            <Layout className="brand brand-layout">
                <MasterHeader />
                <Content className="mb-5">
                    <div className="brand-container">
                        <Row>
                            <Col span={24} lg={{ span: 5 }}>
                                <ConnectedConstructionTypeLists />
                                <ConnectedConstructionStatusList />
                            </Col>
                            <Col span={24} lg={{ span: 19 }}>
                                {props.children}
                            </Col>
                        </Row>
                    </div>
                </Content>
                <MasterFooter />
            </Layout>
        </ConnectedMasterWrapper>
    )
}