import * as React from 'react'

import { CreatePageWrap } from '../../../shared/core'
import { ADMIN_BASE_MASTER } from '../../keys'
import { routeName } from './keys'

import { ConnectedWebsiteSettingForm } from './containers/WebsiteSettingForm'

@(CreatePageWrap({ pageKey: routeName, layoutType: ADMIN_BASE_MASTER }))
class Page extends React.Component {
    render() {
        return (
            <div className="page">
                <ConnectedWebsiteSettingForm/>
            </div>
        )
    }
}

export default Page