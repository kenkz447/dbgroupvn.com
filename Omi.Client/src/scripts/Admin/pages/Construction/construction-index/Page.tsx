import * as React from 'react'
import { Col } from 'antd'

import { CreatePageWrap } from '../../../../shared/core'

import { CONSTRUCTION_INDEX, CONSTRUCTION_MASTER } from '../../../keys'
import { ConstructionTable } from '../_shared'

const WithPageWrap = CreatePageWrap({
    pageKey: CONSTRUCTION_INDEX,
    layoutType: CONSTRUCTION_MASTER
})

@(WithPageWrap)
class Page extends React.Component {
    render() {
        return (
            <div>
                <ConstructionTable/>
            </div>
        )
    }
}

export default Page