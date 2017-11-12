import * as React from 'react'
import { FileEntityInfo } from '../Types'

interface ImgProps {
    fileEntityInfo: FileEntityInfo
    classNames?: string
}

export class Image extends React.Component<ImgProps> {
    render() {
        return (
            <img className={this.props.classNames} src={`${window.baseUrl}${this.props.fileEntityInfo.src}`} />
        )
    }
}