import * as React from 'react'
import { Layout, Row, Col } from 'antd'
import { NavLink } from 'react-router-dom'
import { ConnectedWebsiteSocialLinks } from './components/WebsiteSocialLinks'

const { Footer } = Layout
export function MasterFooter() {
    return (
        <Footer className="brand-footer">
            <div className="brand-container">
                <Row>
                    <Col span={24} lg={{span:12}} className="text-center text-lg-left">
                        <span className="brand-footer-copyright">&#169; 2017 dbgroup. All rights reserved</span>
                    </Col>
                    <Col span={24} lg={{ span: 12 }} className="text-center text-lg-right">
                        <ConnectedWebsiteSocialLinks />
                    </Col>
                </Row>
            </div>
        </Footer>
    )
}
