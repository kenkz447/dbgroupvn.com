import * as React from 'react'
import { Layout, Menu, Breadcrumb, Icon, } from 'antd'
import { NavLink } from 'react-router-dom'

import { FileSelectModal } from '../../../FileAndMedia/index'

import { HeaderMenu } from '../containers/HeaderMenu'

const { Header, Content, Sider, Footer } = Layout

export const BaseMaster = (props) => (
    <Layout className="layout">
        <Header className="header">
            <HeaderMenu />
        </Header>
        <Content style={{ padding: '30px 30px 0 30px' }}>
            {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            Omi ©2017 Created by Kenkz447
        </Footer>
        <FileSelectModal />
    </Layout>
)