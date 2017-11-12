import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Row, Col, Menu, Icon } from 'antd'

const { Header, Content, Footer } = Layout

export const MainMaster = (props: React.HTMLProps<any>) => {
    const page = props.children

    return (
        <Layout className="brand-layout">
            <Header className="brand-header">
                <Row className="brand-container" type="flex">
                    <Col span={12}>
                        <div className="brand-logo">
                            <img src={`${window.baseUrl}Upload/bb311320-6c27-4653-aa5c-eae8a980b9ec/2017/11/Asset 2.png`} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="clearfix" style={{ height: '50%' }}>
                            <div className="float-right">
                                <div className="header-menu">
                                    <Menu className="border-0" mode="horizontal" >
                                        <Menu.SubMenu title={<span className="header-menu-text">Language <Icon type="caret-down" /></span>}>
                                            <Menu.Item className="border-0" key="setting:1">English</Menu.Item>
                                            <Menu.Item className="border-0" key="setting:2" disabled>Vienamese</Menu.Item>
                                        </Menu.SubMenu>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: '50%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <div className="header-menu">
                                <ul className="header-menu-nav clearfix">
                                    <li className="header-menu-item"><NavLink className="header-menu-text header-menu-link" exact={true} activeClassName="active" to="/">Home</NavLink></li>
                                    <li className="header-menu-item"><NavLink className="header-menu-text header-menu-link" activeClassName="active" to="/construction">Construction</NavLink></li>
                                    <li className="header-menu-item"><NavLink className="header-menu-text header-menu-link" activeClassName="active" to="/contact">Contact</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Header>
            <Content className="mb-5">
                {page}
            </Content>
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
        </Layout>
    )
}