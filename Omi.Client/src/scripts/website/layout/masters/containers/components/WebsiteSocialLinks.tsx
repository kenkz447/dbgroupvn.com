import * as React from 'react'
import { connect } from 'react-redux'
import { WebsiteRootState } from '../../../../Types'
import { WebsiteSettingFormValue } from '../../../../../Admin/Types'
import { ExtractImmutableHOC } from '../../../../../shared/core/index';

interface StateProps {
    websiteSetting?: WebsiteSettingFormValue
}

function WebsiteSocialLinks(props: StateProps) {
    if (!props.websiteSetting)
        return null

    return (
        <div className="mt-2 mt-lg-0" dangerouslySetInnerHTML={{ __html: props.websiteSetting.socialNetworks.value }} />
    )
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        websiteSetting: state.data.getIn(['WEBSITE_SETTING', 'response', 'result'])
    }
}

export const ConnectedWebsiteSocialLinks = connect(mapStateToProps)(ExtractImmutableHOC(WebsiteSocialLinks))