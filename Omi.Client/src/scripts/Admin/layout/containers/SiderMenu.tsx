import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import { MenuInjector, MenuHOCProps, getAllActivePath } from '../../../shared/core'

import { CONSTRUCTION_MENU_SIDER } from '../../keys'

const PureSiderMenu = (props: MenuHOCProps) => {
    const { menu } = props

    return (
        <Menu mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
            selectedKeys={getAllActivePath(menu)}>
            {
                menu.items.map((item) => (
                    <Menu.Item key={item.path} >
                        <NavLink exact={item.exact} to={item.path} activeClassName="active">
                            {
                                item.icon && <Icon type={item.icon} />
                            }
                            <span>{item.label}</span>
                        </NavLink>
                    </Menu.Item>
                ))
            }
        </Menu>
    )
}

export const ConstructionSiderMenu = MenuInjector(CONSTRUCTION_MENU_SIDER)(PureSiderMenu)