import * as React from 'react'

import { CreatePageWrap } from '../../../shared/core'
import { ADMIN_BASE_MASTER } from '../../keys'
import { routeName } from './keys'

import { ConnectedHomeSettingForm } from './containers/HomeSettingForm'

@(CreatePageWrap({ pageKey: routeName, layoutType: ADMIN_BASE_MASTER }))
class Page extends React.Component {
    render() {
        return (
            <div className="page">
                <ConnectedHomeSettingForm/>
            </div>
        )
    }
}

export default Page