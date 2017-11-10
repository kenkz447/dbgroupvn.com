import { connect } from 'react-redux'
import { Map } from 'immutable'

import { ExtractImmutableHOC, SetTempValue } from '../../../core'

import { ModuleRootState, FileEntityInfo } from '../types'
import { FILES_DATA_KEY } from '../settings'

import { FileSelectModalComponent, FileSelectModalStateProps, FileSelectModalDispatchProps } from '../components'

import { closeModal, okModal } from '../state'

const mapStateToProps = (state: ModuleRootState): FileSelectModalStateProps => {
    return {
        visible: state.fileAndMedia.get('visible'),
        allowSelectMulti: state.fileAndMedia.get('allowSelectMulti')
    }
}

const mapDispatchToProps = (dispatch): FileSelectModalDispatchProps => {
    return {
        handleOk: () => {
            const okModalAction = okModal()
            dispatch(okModalAction)
        },
        handleCancel: () => {
            const closeModalAction = closeModal()
            dispatch(closeModalAction)
        },
        setRecentUploadFiles: (files) => {
            const setTempValueAction = SetTempValue('recentUploadFiles', files)
            return dispatch(setTempValueAction)
        }
    }
}

const ComponentWithPureData = ExtractImmutableHOC(FileSelectModalComponent)

export const FileSelectModal = connect(mapStateToProps, mapDispatchToProps)(ComponentWithPureData)