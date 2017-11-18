import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tabs, Button } from 'antd'
import { ExtractImmutableHOC } from '../../../core/index'

import { FileEntityInfo, ModuleRootState } from '../Types'
import { FILES_DATA_KEY } from '../settings'

import { FileItem } from './FileItem'

interface FileListStateProps {
    files: Array<FileEntityInfo>
    rencentUploadFiles: Array<FileEntityInfo>
    selectedFiles: Array<FileEntityInfo>
}

const FileListComponent = (props: React.HTMLProps<any> & FileListStateProps) => {

    const { files, rencentUploadFiles } = props

    const rencentUploadFileIds = rencentUploadFiles && rencentUploadFiles.map((o) => o.fileId)

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Selected" key="1">
                    {
                        rencentUploadFiles && (
                            <div className="file-list-recent">
                                <label className="d-block mb-2">Rencent upload</label>
                                <Row className="file-list" gutter={6} >
                                    {rencentUploadFiles.map((fileInfo) => (<Col key={fileInfo.fileId} span={4}><FileItem fileInfo={fileInfo} /></Col>))}
                                </Row>
                            </div>
                        )
                    }
                    {
                        props.selectedFiles && (
                            <div className="">
                                <label className="d-block mb-2">Selected</label>
                                <Row className="file-list" gutter={6} >
                                    {props.selectedFiles.filter((o) => {
                                        // don't display item if item is recent upload file here
                                        if (rencentUploadFileIds)
                                            return rencentUploadFileIds.indexOf(o.fileId) < 0

                                        return true
                                    }).map((fileInfo) => (<Col key={fileInfo.fileId} span={4}><FileItem fileInfo={fileInfo} /></Col>))}
                                </Row>
                            </div>
                        )
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Liblary" key="2">
                    <Row className="file-list" gutter={6} >
                        {files && files.map((fileInfo) => (<Col key={fileInfo.fileId} span={4}><FileItem fileInfo={fileInfo} /></Col>))}
                    </Row>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

const mapStateToProps = (state: ModuleRootState, ownProps): FileListStateProps => {
    return {
        files: state.data.getIn([FILES_DATA_KEY, 'response', 'result']),
        rencentUploadFiles: state.fileAndMedia.get('RECENT_UPLOAD_FILES'),
        selectedFiles: state.fileAndMedia.get('CHECKED_FILES')
    }
}

const ComponentWithPureData = ExtractImmutableHOC(FileListComponent)
export const FileList = connect(mapStateToProps)(ComponentWithPureData)