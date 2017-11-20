import * as React from 'react'
import { connect } from 'react-redux'
import { Carousel } from 'antd'

import { WebsiteRootState } from '../../../Types'
import { FileEntityInfo, Image } from '../../../../shared/modules/FileAndMedia'
import { ExtractImmutableHOC } from '../../../../shared/core'

interface StateProps {
    slideImages: Array<FileEntityInfo>
}

const renderImage = (fileEntityInfo: FileEntityInfo) => {
    return (
        <div key={fileEntityInfo.fileId}>
            <Image classNames="mw-100" fileEntityInfo={fileEntityInfo} />
        </div>
    )
}

export function HomeSlider(props: StateProps) {
    if (!props.slideImages)
        return

    return (
        <div>
            <Carousel autoplay>
                {props.slideImages.map(renderImage)}
            </Carousel>
        </div>
    )
}

const mapStateToProps = (state: WebsiteRootState, ownProps): StateProps => {
    return {
        slideImages: state.temp.get('HOME_SLIDE_IMAGES')
    }
}

export const ConnectedHomeSlider = connect(mapStateToProps)(ExtractImmutableHOC(HomeSlider))