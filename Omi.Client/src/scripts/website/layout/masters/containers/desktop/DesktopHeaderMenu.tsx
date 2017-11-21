import * as React from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import { WebsiteRootState } from '../../../../Types'
import { SetTempValue } from '../../../../../shared/core/tempValue'
import { ExtractImmutableHOC } from '../../../../../shared/core'
import { headerMenuItems } from '../_shared'

interface StateProps {
    windowWidth?: number
}

function DesktopHeaderMenu(props: StateProps) {
    if (props.windowWidth <= 1024)
        return null

    return (
        <div className="header-menu">
            <ul className="header-menu-nav clearfix">
                {headerMenuItems.map((o, i) => <li key={i} className="header-menu-item"><NavLink className="header-menu-text header-menu-link" exact={i == 0} activeClassName="active" to={o.path}>{o.label}</NavLink></li>)}
                <li className="header-menu-item">
                    <Menu className="border-0" mode="horizontal" >
                        <Menu.SubMenu className="header-menu-dropdown" title={<span className="header-menu-text">Language <Icon type="caret-down" /></span>}>
                            <Menu.Item className="border-0" key="setting:1">English</Menu.Item>
                            <Menu.Item className="border-0" key="setting:2" disabled>Vienamese</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        windowWidth: state.layout.get('WINDOW_WIDTH'),
    }
}

export const ConnectedDesktopHeaderMenu = connect(mapStateToProps)(ExtractImmutableHOC(DesktopHeaderMenu))