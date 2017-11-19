import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Row, Col, Menu, Icon } from 'antd'

import { RequestSend } from '../../../shared/core'

import { MasterHeader } from './containers/MasterHeader'
import { MasterFooter } from './containers/MasterFooter'
import { WebsiteRootState } from '../../Types'

const { Header, Content, Footer } = Layout

interface StateProps {
    websiteSetting?: any
}

interface DispatchProps {
    getWebsiteSetting: () => void
}

class MainMaster extends React.Component<StateProps & DispatchProps> {
    componentWillMount() {
        this.props.getWebsiteSetting()
    }
    render() {
        return (
            <Layout className="brand brand-layout">
                <MasterHeader />
                <Content className="mb-5">
                    {this.props.children}
                </Content>
                <MasterFooter />
            </Layout>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        websiteSetting: state.data.getIn(['WEBSITE_SETTING', 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getWebsiteSetting: () => {
            const action = RequestSend('WEBSITE_SETTING', {
                url: '/websiteSetting/getSetting'
            })
            dispatch(action)
        }
    }
}

export const ConnectedMainMaster = connect(mapStateToProps, mapDispatchToProps)(MainMaster)