import * as React from 'react'

import { Modal, Upload, Icon, message } from 'antd'

import { FileList } from './FileList'

import { FileEntityInfo } from '../Types'
import { uploadURL } from '../settings'
import { FileItem } from './FileItem'
import { autobind } from 'core-decorators';

export interface FileSelectModalDispatchProps {
    handleOk?: (selected: FileEntityInfo | Array<FileEntityInfo>) => void
    handleCancel?: (e: React.MouseEvent<any>) => void
    setRecentUploadFiles?: (files) => void
}

export interface FileSelectModalStateProps {
    visible?: boolean
    allowSelectMulti: boolean
}

const Dragger = Upload.Dragger

const draggerProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    action: uploadURL.href,
    withCredentials: true,
}

export class FileSelectModalComponent extends React.Component<FileSelectModalStateProps & FileSelectModalDispatchProps> {

    render() {
        const { visible, handleOk, handleCancel } = this.props
        return (
            <div>
                <Modal title="Files" cancelText="Cancel" okText="Select" visible={visible} width={1024}
                    onOk={() => { handleOk([]) }} onCancel={handleCancel}>
                    <div style={{ height: 180, marginBottom: 15 }}>
                        <Dragger {...draggerProps} onChange={this.onDraggerChange}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Dragger>
                    </div>
                    <FileList />
                </Modal>
            </div>
        )
    }
    
    @autobind
    onDraggerChange(info) {
        const status = info.file.status
        if (status !== 'uploading') {
            console.log(info.file, info.fileList)
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
            const recentFileList = info.fileList.map((o) => o.response.result[0])
            
            this.props.setRecentUploadFiles(recentFileList)
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    }
}