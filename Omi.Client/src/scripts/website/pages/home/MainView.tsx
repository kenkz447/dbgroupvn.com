import * as React from 'react'
import { Row, Col } from 'antd'

import { CreatePageWrap } from '../../../shared/core'
import { LAYOUT_COMMON } from '../../keys'

import { indexRouteName } from './keys'
@(CreatePageWrap({ pageKey: indexRouteName, layoutType: LAYOUT_COMMON }))
class Index extends React.Component {
    render() {
        return (
            <div className="page">

            </div>
        )
    }
}

export default Index