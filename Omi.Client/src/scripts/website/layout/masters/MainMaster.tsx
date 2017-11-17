import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Row, Col, Menu, Icon } from 'antd'

import { MasterHeader } from './containers/MasterHeader'
import { MasterFooter } from './containers/MasterFooter'

const { Header, Content, Footer } = Layout

export const MainMaster = (props: React.HTMLProps<any>) => {
    const page = props.children

    return (
        <Layout className="brand brand-layout">
            <MasterHeader />
            <Content className="mb-5">
                {page}
            </Content>
            <MasterFooter />
        </Layout>
    )
}