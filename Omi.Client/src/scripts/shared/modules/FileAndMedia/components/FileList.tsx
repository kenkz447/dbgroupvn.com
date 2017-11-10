import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { ExtractImmutableHOC } from '../../../core/index'

import { FileEntityInfo, ModuleRootState } from '../Types'
import { FILES_DATA_KEY } from '../settings'

import { FileItem } from './FileItem'

interface FileListStateProps {
    files: Array<FileEntityInfo>
    rencentUploadFiles: Array<any>
}

const FileListComponent = (props: React.HTMLProps<any> & FileListStateProps) => {

    const { files, rencentUploadFiles } = props

    return (
        <div>
            {
                rencentUploadFiles && (
                    <div className="file-list-recent">
                        <label>Rencent upload</label>
                        <Row className="file-list" gutter={6} >
                            {rencentUploadFiles.map((fileInfo) => (<Col key={fileInfo.fileId} span={4}><FileItem fileInfo={fileInfo} /></Col>))}
                        </Row>
                    </div>
                )
            }
            <Row className="file-list" gutter={6} >
                {files && files.map((fileInfo) => (<Col key={fileInfo.fileId} span={4}><FileItem fileInfo={fileInfo} /></Col>))}
            </Row>
        </div>
    )
}

const mapStateToProps = (state: ModuleRootState): FileListStateProps => {
    return {
        files: state.data.getIn([FILES_DATA_KEY, 'response', 'result']),
        rencentUploadFiles: state.temp.get('recentUploadFiles')
    }
}

const ComponentWithPureData = ExtractImmutableHOC(FileListComponent)
export const FileList = connect(mapStateToProps)(ComponentWithPureData)