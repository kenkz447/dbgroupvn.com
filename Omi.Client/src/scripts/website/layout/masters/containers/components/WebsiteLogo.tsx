import * as React from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import { WebsiteRootState } from '../../../../Types'
import { SetTempValue } from '../../../../../shared/core/tempValue'
import { ExtractImmutableHOC } from '../../../../../shared/core'
import { WebsiteSettingFormValue } from '../../../../../Admin/Types'
import { Image } from '../../../../../shared/modules/FileAndMedia'

interface StateProps {
    websiteSetting?: WebsiteSettingFormValue
}

function WebsiteLogo(props: StateProps) {
    if (!props.websiteSetting)
        return null
    
    return (
        <div className="brand-logo">
            <Image classNames="mw-100" fileEntityInfo={props.websiteSetting.companyLogo.value} />
        </div>
    )
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        websiteSetting: state.data.getIn(['WEBSITE_SETTING', 'response', 'result']),
    }
}

export const ConnectedWebsiteLogo = connect(mapStateToProps)(ExtractImmutableHOC(WebsiteLogo))