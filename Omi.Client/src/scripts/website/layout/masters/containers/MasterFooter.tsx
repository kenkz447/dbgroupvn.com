import * as React from 'react'
import { Layout, Row, Col } from 'antd'
import { NavLink } from 'react-router-dom'

const { Footer } = Layout
export function MasterFooter() {
    return (
        <Footer className="brand-footer">
            <div className="brand-container">
                <Row>
                    <Col span={12}>
                        <span className="brand-footer-copyright">&#169; 2017 dbgroup. All rights reserved</span>
                    </Col>
                    <Col span={12}>
                    </Col>
                </Row>
            </div>
        </Footer>
    )
}