import * as React from 'react'
import { connect } from 'react-redux'
import * as classNames from 'classnames'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'

import { WebsiteRootState } from '../../../../Types'
import { SetTempValue } from '../../../../../shared/core/tempValue'
import { ExtractImmutableHOC } from '../../../../../shared/core'

import { headerMenuItems } from '../_shared'
import HamburgerMenu from './Hamburger'

interface StateProps {
    windowWidth?: number
    isOpen?: boolean
}

interface DispatchProps {
    onMenuClick?: (nextToggleValue: boolean) => void
}

function MobileHeaderMenu(props: StateProps & DispatchProps) {
    if (props.windowWidth > 1024)
        return null

    return (
        <div>
            <HamburgerMenu
                isOpen={props.isOpen}
                menuClicked={() => {
                    props.onMenuClick(!props.isOpen)
                }}
                width={30}
                height={20}
                strokeWidth={1}
                rotate={0}
                color='black'
                borderRadius={0}
                animationDuration={0.5}
            />
            <div className={classNames('mobile-header-menu-dropdown', { 'show': props.isOpen })}>
                <Menu className="mobile-header-menu" mode="vertical" >
                    {headerMenuItems.map((o, i) => (
                        <Menu.Item key={i} className="mobile-header-menu-item">
                            <NavLink className="mobile-header-menu-text"
                                exact={i == 0}
                                activeClassName="active"
                                to={o.path}
                                onMouseUp={(e) => {
                                    e.preventDefault()
                                    props.onMenuClick(false)
                                }}
                            >{o.label}</NavLink>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        </div>
    )
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        windowWidth: state.layout.get('WINDOW_WIDTH'),
        isOpen: state.temp.get('MOBILE_HEADER_MENU_IS_OPEN') || false
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        onMenuClick: (nextToggleValue) => {
            dispatch(SetTempValue('MOBILE_HEADER_MENU_IS_OPEN', nextToggleValue))
        }
    }
}

export const ConnectedMobileHeaderMenu = connect(mapStateToProps, mapDispatchToProps)(ExtractImmutableHOC(MobileHeaderMenu))