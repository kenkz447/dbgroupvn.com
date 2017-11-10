import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'

const { Header, Content, Footer } = Layout

export const MainMaster = (props: React.HTMLProps<any>) => {
    const page = props.children

    return (
        <Layout className="brand-layout">
            <Header className="brand-header">
                <Row className="brand-container">
                    <Col span={12}>
                        <div className="clearfix">
                            <div className="float-right">
                                <div className="header-menu">
                                    <div className="clearfix">
                                        <div className="float-right">
                                            <ul className="header-menu-nav clearfix">
                                                <li className="header-menu-item"><NavLink className="header-menu-link" exact={true} activeClassName="active" to="/">Package</NavLink></li>
                                                <li className="header-menu-item"><NavLink className="header-menu-link" activeClassName="active" to="/project">Project</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Header>
            <Content className="mt-5 mb-5">
                <div className="brand-container">
                    {page}
                </div>
            </Content>
            <Footer className="brand-footer">
                <div className="brand-container">
                    <Row>
                        <Col span={6}>
                            <span className="brand-footer-text">&#169; HHOME. ALL RIGHTS RESERVED</span>    
                        </Col>
                        <Col span={6}>
                        </Col>
                    </Row>
                </div>
            </Footer>
        </Layout>
    )
}