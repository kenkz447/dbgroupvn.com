import * as React from 'react'
import * as Img from 'react-image'
const VisibilitySensor = require('react-visibility-sensor')

import { FileEntityInfo } from '../Types'
import { Spin } from 'antd'

interface ImgProps {
    fileEntityInfo: FileEntityInfo
    classNames?: string
    displayThumb?: boolean
}
const onChange = function (isVisible) {
    console.log('Element is now %s', isVisible ? 'visible' : 'hidden')
}

export class Image extends React.Component<ImgProps> {
    render() {
        return (
            <div>
                <VisibilitySensor onChange={onchange}>
                    {({ isVisible }) =>
                        <Img.default loader={<Spin />} className={this.props.classNames} src={`${window.baseUrl}${this.props.displayThumb ? this.props.fileEntityInfo.srcThumb : this.props.fileEntityInfo.src}`} />
                    }
                </VisibilitySensor>
            </div>
        )
    }
}