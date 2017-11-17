import * as React from 'react'
import { CreatePageWrap } from '../../../../shared/core'

import { CONSTRUCTION_NEW, CONSTRUCTION_MASTER } from '../../../keys'
import { ConstructionFormNew } from '../_shared'

const WithPageWrap = CreatePageWrap({
    pageKey: CONSTRUCTION_NEW,
    layoutType: CONSTRUCTION_MASTER
})

@(WithPageWrap as any)
class Page extends React.Component<any> {
    render() {
        return (
          <ConstructionFormNew />
        )
    }
}

export default Page