import * as React from 'react'
import { Layout, Menu, Breadcrumb, Icon, } from 'antd'
import { NavLink } from 'react-router-dom'

import { ConstructionSiderMenu } from '../containers/SiderMenu'
import { HeaderMenu } from '../containers/HeaderMenu'
import { BaseMaster } from './BaseMaster'
    
const { Header, Content, Sider, Footer } = Layout

export const ConstructionMaster = (props) => (
    <BaseMaster>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
                <ConstructionSiderMenu />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {props.children}
            </Content>
        </Layout>
    </BaseMaster>
)