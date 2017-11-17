import * as React from 'react'
import { FileEntityInfo } from '../Types'

interface ImgProps {
    fileEntityInfo: FileEntityInfo
    classNames?: string
    displayThumb?: boolean
}

export class Image extends React.Component<ImgProps> {
    render() {
        return (
            <img className={this.props.classNames} src={`${window.baseUrl}${this.props.displayThumb ? this.props.fileEntityInfo.srcThumb : this.props.fileEntityInfo.src}`} />
        )
    }
}