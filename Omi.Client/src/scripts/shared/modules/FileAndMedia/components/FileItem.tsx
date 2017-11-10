import * as React from 'react'
import { connect } from 'react-redux'
import * as classnames from 'classnames'

import { ExtractImmutableHOC } from '../../../core/index'

import { FileEntityInfo, ModuleRootState } from '../Types'
import { fileItemClick } from '../state'

interface FileItemDispatchProps {
    fileItemClick?: () => void
}

interface FileItemStateProps {
    /** All file was checked by user*/
    checkeds?: Array<FileEntityInfo>
}

interface FileItemProps extends FileItemDispatchProps, FileItemStateProps {
    fileInfo: FileEntityInfo
}

export const FileItemComponent = (props: FileItemProps) => {
    const { checkeds, fileInfo, fileItemClick } = props

    const checked = checkeds.findIndex((o) => o.fileId == fileInfo.fileId) >= 0

    return (
        <div className={classnames("file-list-item", { 'checked': checked })}
            data-property-file-id={fileInfo.fileId}
            onClick={fileItemClick}
        >
            <img className="file-list-item-image" src={`${window.baseUrl}${fileInfo.srcThumb || fileInfo.src}`}/>
        </div>
    )
}

const mapStateToProps = (state: ModuleRootState): FileItemStateProps => {
    return {
        checkeds: state.fileAndMedia.get('checkedFiles')
    }
}

const mapDispatchToProps = (dispatch, ownProps: FileItemProps): FileItemDispatchProps => {
    return {
        fileItemClick: () => {
            const fileItemClickAction = fileItemClick(ownProps.fileInfo)
            dispatch(fileItemClickAction)
        }
    }
}

const ComponentWithPureData = ExtractImmutableHOC(FileItemComponent)

export const FileItem = connect(mapStateToProps, mapDispatchToProps)(ComponentWithPureData)
