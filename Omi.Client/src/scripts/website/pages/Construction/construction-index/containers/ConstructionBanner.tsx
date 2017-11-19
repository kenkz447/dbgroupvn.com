import * as React from 'react'
import { connect } from 'react-redux'

import { Image } from '../../../../../shared/modules/FileAndMedia'
import { WebsiteRootState } from '../../../../Types'
import { WebsiteSettingFormValue } from '../../../../../Admin'
import { ExtractImmutableHOC } from '../../../../../shared/core/index';

function ConstructionBanner(props: { websiteSetting: WebsiteSettingFormValue }) {
    if (!props.websiteSetting || !props.websiteSetting.constructionBannerImage)
        return null
    return (
        <div className="mb-3">
            <Image classNames="d-block mw-100 w-100" fileEntityInfo={props.websiteSetting.constructionBannerImage.value} />
        </div>
    )
}

const mapStateToProps = (state: WebsiteRootState) => {
    return {
        websiteSetting: state.data.getIn(['WEBSITE_SETTING', 'response', 'result'])
    }
}

export const ConnectedConstructionBanner = connect(mapStateToProps)(ExtractImmutableHOC(ConstructionBanner))