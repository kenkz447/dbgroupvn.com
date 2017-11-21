import * as React from 'react'
import { Layout, Row, Col, Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import * as LoadingBar from 'react-redux-loading-bar'

import './mobile/style.scss'
import { ConnectedMobileHeaderMenu } from './mobile/MobileHeaderMenu'

import { ConnectedDesktopHeaderMenu } from './desktop/DesktopHeaderMenu'

import { ConnectedWebsiteLogo } from './components/WebsiteLogo'

const { Header } = Layout
export function MasterHeader() {
    return (
        <Header className="brand-header-wrapper">
            <LoadingBar.default className="brand-loading-bar" />
            <div className="brand-header">
                <Row className="brand-container" type="flex">
                    <Col span={12}>
                        <ConnectedWebsiteLogo />
                    </Col>
                    <Col span={12} style={{position: 'unset'}}>
                        <div className="clearfix" style={{ height: '50%' }}>
                            <div className="float-right">
                                <div className="header-menu">

                                </div>
                            </div>
                        </div>
                        <div style={{ height: '50%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <ConnectedMobileHeaderMenu />
                            <ConnectedDesktopHeaderMenu />
                        </div>
                    </Col>
                </Row>
            </div>
        </Header>
    )
}